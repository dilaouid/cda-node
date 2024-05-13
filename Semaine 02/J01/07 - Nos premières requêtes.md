# Requêtes avec Drizzle

## Table des matières

- [Introduction](#introduction)
- [Modification des Repositories](#modification-des-repositories)
  - [UserRepository](#userrepository)
  - [PostRepository](#postrepository)
    - [CommentRepository - Exercices](#commentrepository---exercices)



## Introduction

Voilà, Drizzle est bien configuré et prêt à l'emploi. Vous pouvez maintenant commencer à exécuter des requêtes SQL sur votre base de données. Pour cela, on va remplacer ces trucs de mocks pas beau vers quelque chose de plus propre.

Rappelez-vous que nous sommes dans une architecture hexagonale, donc, on sait **exactement** où aller pour changer les choses. Fermez les yeux pour réflechir à la réponse, et vous souvenir des notions vues dans la première semaine ... Oui ... Il s'agissait bien du dossier `src/infrastructure/repositories`.

## Modification des Repositories

### UserRepository

Celui-ci est le plus simple et le plus léger. Nous allons commencer ici pour nous habituer lentement mais sûrement à ce nouvel ORM. Rappelez-vous, par exemple, pour récupérer tout les commentaires, nous utilisions `fs` et `path`. Comme ceci:

```ts
// src/infrastructure/repositories/UserRepository.ts

getAllUsers(): User[] {
    // On récupére en texte brut le contenu du fichier users.json
    const data = fs.readFileSync(this.filePath, 'utf-8');

    // On retourne tout les utilisateurs, formatés cette fois ci en JSON
    return JSON.parse(data);
}
```

Clairement, **ignoble**.
Et si on utilisait Drizzle pour récupérer tout les utilisateurs, ça donnerait quoi ?

Tout d'abord, il faudrait importer notre instance de base de données, à savoir `db` qui est dans notre dossier `src/infrastucture/data`, dans le plus haut scope de notre fichier `UserRepository.ts`:

```ts
import { db } from "../data";
```

Nous allons ensuite importer tout les types, ainsi que le schéma nécessaire pour notre entité `User`:

```ts
// src/infrastructure/repositories/UserRepository.ts

import { db } from "../data";
import { users } from "../data/schema";
import { User, NewUser } from "../../domain/entities/User";
```

Très bien, nous avons tout ce qui nous faut, nous pouvons donc faire notre requête. Transformer la lecture du fichier complet puis de son parse en JSON en une vériatble requête SQL est très simple. Voici comment on pourrait faire:

```ts
// src/infrastructure/repositories/UserRepository.ts

export class UserRepository {
    getAllUsers(): Promise< Partial<User>[] > {
        try {
            return db.query.users.findMany({
                // On sélectionne les colonnes que l'on veut récupérer
                columns: {
                    id: true,
                    username: true
                    // On ne récupère ni le mot de passe, ni le refreshToken (pour des raisons de sécurité)
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer les utilisateurs");
        }
    }
}
```

Il existe une autre manière de faire, que nous utiliserons aussi pour d'autres repositories. C'est la manière de faire des requêtes plus complexes, avec des conditions, des jointures, des tris, etc. Pour le moment, restons sur ça pour récupérer les autres utilisateurs. A savoir, cette fois-ci, on veut récupérer un utilisateur en fonction de son `id`. Auparavant, nous avions quelque chose du genre:

```ts
// src/infrastructure/repositories/UserRepository.ts

getUserById(id: string) {
    // On commence par récupérer tout les utilisateurs
    const users = this.getAllUsers();  

    // On va appliquer un HOF (find) pour trouver seulement l'utilisateur qui nous intéresse, en retirant le mot de passe
    const user = users.find(user => user.id === id);
    if (!user) return undefined;
    return user;
}
```
Toujours pas aussi beau que ce que l'on pourrait faire avec Drizzle. Voici comment on pourrait faire:

```ts
// src/infrastructure/repositories/UserRepository.ts

import { eq } from "drizzle-orm";
// ...
export class UserRepository {
    // ...
    getUserById(id: string): Promise<Partial<User | undefined>> {
        try {
            return db.query.users.findFirst({
                where: eq(users.id, id),
                columns: {
                    id: true,
                    username: true
                }
            })
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    }
}
```

Cette fois-ci, nous avons besoin d'importer `eq` de `drizzle-orm` pour pouvoir faire notre requête. C'est une fonction qui permet de faire une égalité entre deux valeurs. Ici, on veut que l'id de l'utilisateur soit égal à l'id passé en paramètre. On ne récupère que l'id et le nom d'utilisateur, pour des raisons de sécurité.

Souvenez vous, pour vérifiez une égalité, on passe par `eq`, pour une inégalité, on passe par `neq`, pour une supériorité, on passe par `gt`, etc. Vous pouvez retrouver toutes les fonctions de comparaison dans la [documentation de Drizzle](https://orm.drizzle.team/docs/operators). Donc pas de signe `===`, `!==`, `>`, `<`, `>=`, `<=`, etc. OK ?

Pour donner un ordre idée, cette requête Drizzle, convertit en SQL nous aurait donné :

```sql
SELECT id, username FROM users WHERE id = '1';
```

**Exercice**

Vous avez à peu près compris la sélection, vous allez donc mettre à neuf la méthode `getUserByUsername()` en utilisant Drizzle. Vous pouvez vous aider de la méthode `getUserById()` pour vous aider à comprendre comment faire. Bon courage !

---

Bien, continuons avec notre `UserRepository`. Nous allons maintenant nous attaquer à la méthode `createUser()`.
Nous utiliserons donc une syntaxe différente. L'intérêt pédagogique est surtout de vous montrer les différentes méthodes existantes, pour que vous soyez plus polyvalent. Voici comment procéder pour l'insertion d'un utilisateur dans la base de données:

```ts
// src/infrastructure/repositories/UserRepository.ts

createUser(user: NewUser) {
    try {
        return db.insert(users).values(user).execute();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de créer l'utilisateur");
    }
}
```

Vous êtes d'accord pour dire que c'est **CLAIREMENT** plus lisible que la méthode précédente ?
A savoir devoir déjà récupérer tout les utilisateurs, push, puis réécrire tout le fichier. C'est un peu comme si vous vouliez ajouter un élément à un tableau, et que vous deviez réécrire tout le tableau à chaque fois. C'est pas très efficace, n'est-ce pas ?

Ici, simplement, du chaining method, on insère dans la table `users` les valeurs de l'utilisateur passé en paramètre. C'est tout. C'est simple, c'est efficace, c'est lisible.

Et c'est tout aussi simple pour l'update. Donc, passons voir comment on pourrait faire pour mettre à jour un utilisateur:

```ts
// src/infrastructure/repositories/UserRepository.ts

updateUser(user: User) {
    try {
        return db.update(users).set(user).where(eq(users.id, user.id)).execute();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de mettre à jour l'utilisateur");
    }
}
```

**Oui mais Laouid si on avait su ça la première semaine, on aurait pu faire ça directement non ? Et le TP final on aurait pu prendre plus de temps etc...**
Oui.

Ici, c'est presque comme l'insert, sauf qu'on chain notre requête avec un `where` pour dire que l'on veut mettre à jour l'utilisateur dont l'id est égal à l'id de l'utilisateur passé en paramètre. C'est tout.

En SQL natif, ca donnerait:

```sql
UPDATE users SET username = 'nouveauNom', refreshToken = 'nouveauRefreshToken' WHERE id = 'aebc-1234-5678-90ab';
```

Retropédalons légérement, maintenant que nous avons vu différentes méthodes de requêtes. Jetons à oeil à la méthode `getUserById()`. Parfois, dans certains service, j'ai besoin de récupérer la colonne `refreshToken` de l'utilisateur, parfois la colonne `password`. Comment faire pour ne pas avoir à écrire deux méthodes différentes ? C'est simple !

On va commencer par retourner dans notre entité, à savoir `src/domain/entities/User.ts`. Nous allons ajouter un nouveau type à exporter, qui sera `UserColumns`:

```ts
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
// On ajoute le type UserColumns, qui sera un objet avec des clés optionnelles qui correspondent aux colonnes de notre table
export type UserColumns = { [K in keyof User]?: boolean; };
```

Profitez en pour appliquer la même chose pour les autres entités, à savoir `Comment` et `Post`.

Maintenant, on va pouvoir utiliser ce type dans notre méthode `getUserById()`:

```ts
// src/infrastructure/repositories/UserRepository.ts

export class UserRepository {
    // ...
    getUserById(id: string, columns: UserColumns): Promise<Partial<User | undefined>> {
        try {
            return db.query.users.findFirst({
                where: eq(users.id, id),
                columns
            })
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    }
}
```

Et on fait la même chose pour toutes les autres méthodes qui pourraient avoir besoin de récupérer des colonnes spécifiques. C'est simple, c'est efficace, c'est lisible, oui, je me répète.

**Exercice**

Mettre à jour les fichiers `UserController.ts` et `AuthService.ts` pour utiliser les nouvelles méthodes de `UserRepository.ts`. N'oubliez pas, nos méthodes de `UserRepository.ts` retournent des Promises, donc, il faudra utiliser `await` pour attendre le résultat de la requête. Bon courage !

Vous verrez que grâce à l'architecture hexagonale, vous n'avez pas besoin de changer grand chose dans vos services. C'est ça la magie de l'architecture hexagonale. Vous pouvez changer tout ce que vous voulez dans votre infrastructure, tant que vous respectez les contrats, tout fonctionnera comme avant.

**A NOTER**
Commentez, dans votre fichier `src/web/routes.ts`, les routes qui utilisent les anciennes méthodes de Repositories, pour pas que ça plante.

---

**Solution**

Vous avez admiré la magie de l'hexagonale ?
Allons donc dans notre fichier `UserController.ts` pour mettre à jour la méthode, nous regardonc, par exemple, pour la méthode `login()`, cette ligne:

```ts
const user = this.userRepository.getUserByUsername(username);
```

qui devient, cette ligne:
    
```ts
const user = await this.userRepository.getUserByUsername(username, { id: true, username: true, password: true });
```

Et voilà, c'est tout. Vous faites la même chose pour les autres méthodes. Vous pouvez aussi faire la même chose pour les autres services, comme `AuthService.ts`. Vous avez vu, c'est simple, c'est efficace, c'est lisible.

### PostRepository

Nous allons maintenant nous attaquer au `PostRepository`. C'est exactement la même chose que pour le `UserRepository`, avec, forcément, quelques nuances près. A savoir que cette fois-ci, nous devrons travailler avec du relationnel, puisque les posts sont liés aux utilisateurs et parfois aux commentaires. Nous allons donc devoir faire des jointures. Mais ne vous inquiétez pas, Drizzle est là pour vous aider, comme d'habitude.

Commencons par quelque chose de simple, l'insertion, à savoir, la méthode `savePost()`.
Dans la méthode initial, nous renvoyons à la fin le post que nous venons d'ajouter. C'est ce que nous allons faire avec Drizzle, mais de manière plus propre. Voici comment on pourrait faire:

```ts
// src/infrastructure/repositories/PostRepository.ts
async savePosts(post: NewPost) {
    try {
        return db.insert(posts).values(post).returning({id: posts.id}).execute();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de sauvegarder le post");
    }
}
```

Ici, vous remarquez la présence d'une nouvelle méthode dans le chaining de méthodes, à savoir `returning()`. C'est une méthode qui permet de retourner le post que l'on vient d'ajouter. C'est très pratique, et très utile. On peut également spécifier les colonnes que l'on veut récupérer, comme par exemple:

```ts
return db.insert(posts).values(post).returning({ id: true, title: true }).execute();
```

Mais bien entendu, dans notre cas, **nous voulons tout retourner**. C'est pour cela que nous avons utilisé `returning()` sans paramètre.
On peut également jouer avec la méthode `getPostIdByTitle()`. Où nous allons procéder exactement comme avec notre méthode `getUserById()`. A savoir, nous allons ajouter un paramètre `columns` pour spécifier les colonnes que l'on veut récupérer. Voici comment on pourrait faire:

```ts
// src/infrastructure/repositories/PostRepository.ts

getPostIdByTitle(title: string) {
    try {
        return db.query.posts.findFirst({
            where: eq(posts.title, title),
            columns: {
                id: true
            }
        }).execute();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer l'id du post");
    }
}
```

Le nom de la méthode est assez explicite, on veut récupérer l'id du post en fonction de son titre. On ne récupère que l'id. Et on passe par la méthode `findFirst()` pour récupérer le premier post qui correspond à notre condition, car il n'y a qu'un seul post qu'on recherche.

**Forcément, ce n'est clairement pas une méthode à utiliser DU TOUT. Car les title ne sont pas uniques. Mais c'est pour l'exemple.**

Maintenant, passons à la méthode `getPostById()`. Cette fois-ci, nous allons travailler sur le relationnel. Nous allons devoir récupérer le post, l'utilisateur qui l'a posté, et les commentaires associés à ce post. Nous devrons donc prendre la solution d'un chaînage de méthode.

Nous ne sommes pas en cours de data, donc je vous expliquerais pas les jointures dans ce module. Tout ce que je peux vous dire, c'est que nous effectuons un LEFT JOIN entre la table `posts` et la table `users`, et un autre LEFT JOIN entre la table `posts` et la table `comments`. Voici comment on pourrait faire:

```ts
// src/infrastructure/repositories/PostRepository.ts

export class PostsRepository {
    // ...
    getPostById(id: string): Promise< any > {
        try {
            return db.select({
                id: posts.id,
                title: posts.title,
                content: posts.content,
                author: { // On récupère l'auteur du post, et on décide de comment on veut le formater
                    id: users.id, // On récupère l'id de l'auteur, et son nom d'utilisateur
                    username: users.username
                },
                date: posts.date,
                comments: { // de même pour les commentaires, on décide de comment cette propriété sera formattée en objet
                    id: comments.id,
                    content: comments.content,
                    date: comments.date
                }
            }).from(posts)
            .leftJoin( // Nous voulons faire un LEFT JOIN entre la table posts et la table comments
                comments, eq(posts.id, comments.postId) // Lorsque l'id du post est égal à l'id du post dans les commentaires
            ).leftJoin( // Nous voulons faire un LEFT JOIN entre la table posts et la table users
                users, eq(posts.author, users.id) // Lorsque l'id de l'auteur du post est égal à l'id de l'utilisateur
            ).where( // Nous cherchons le post en fonction de son id
                eq(posts.id, id)
            ).execute();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer le post");
        }
    }
}
```

Encore une fois, je me repète, mais pas de signe `===`, `!==`, `>`, `<`, `>=`, `<=`, etc. On passe par les fonctions de comparaison de Drizzle. Ici, on veut que l'id du post soit égal à l'id passé en paramètre. On récupère l'id, le titre, le contenu, la date, l'auteur, et les commentaires associés à ce post. Donc on utilise la fonction `eq()` pour faire une égalité entre deux valeurs.

En SQL, ça donnerait:

```sql
SELECT posts.id, posts.title, posts.content, posts.date, users.id, users.username, comments.id, comments.content, comments.date FROM posts LEFT JOIN comments ON posts.id = comments.postId LEFT JOIN users ON posts.author = users.id WHERE posts.id = 'aebc-1234-5678-90ab';
```

A vous de voir, laquelle des méthodes est la plus lisible, la plus maintenable, la plus efficace. C'est à vous de choisir.

**Exercice**

Vous allez donc maintenant refaire la méthode `getAllPosts()` en utilisant Drizzle. Vous pouvez vous aider de la méthode `getPostById()` pour vous aider à comprendre comment faire. La seule différence, c'est qu'on veut récupérer non pas un post en fonction de son id, mais tout les posts.
Le format de retour est le même que pour la méthode `getPostById()`. Bon courage !

---

**Solution**

Vous avez donc refait la méthode `getAllPosts()` en utilisant Drizzle. Vous avez donc dû faire quelque chose du genre:

```ts
getAllPosts() {
    try {
        return db.select({
            id: posts.id,
            title: posts.title,
            content: posts.content,
            author: {
                id: users.id,
                username: users.username,
            },
            date: posts.date,
            comments: {
                id: comments.id,
                content: comments.content,
                date: comments.date
            }
        }).from(posts)
        .leftJoin(
            comments, eq(posts.id, comments.postId)
        ).leftJoin(
            users, eq(posts.author, users.id)
        ).execute();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les posts");
    }
}
```

A savoir, la même chose que pour la méthode `getPostById()`, sauf que cette fois-ci, on ne veut pas récupérer un post en fonction de son id, mais tout les posts. Donc on ne passe pas par la méthode `where()`. C'est tout.

----

Nous avons donc vu pour la création, l'update, et la lecture.
Il reste donc simplement la suppression. Pour la suppression, c'est très simple, on utilise la méthode `delete()` de Drizzle. Voici comment on pourrait faire:

```ts
// src/infrastructure/repositories/PostRepository.ts

deletePost(id: string) {
    try {
        return db.delete(posts).where(eq(posts.id, id)).execute();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de supprimer le post");
    }
}
```

Encore une fois c'est très simple. En SQL, ça donnerait:

```sql
DELETE FROM posts WHERE id = 'aebc-1234-5678-90ab';
```

Vous avez maintenant vu toutes les méthodes de base pour un repository. Vous pouvez maintenant vous amuser à les utiliser dans des exercices !

### CommentRepository - Exercices

Vous allez maintenant faire la même chose pour le `CommentRepository`. Vous allez traduire les ancienne méthodes en utilisant Drizzle. Vous pouvez vous aider des méthodes des autres repositories pour vous aider à comprendre comment faire. Et pour de l'originalité, ajoutez les méthodes suivantes :
- `getCommentById()`: Récupérer un commentaire en fonction de son id
- `deleteCommentById()`: Supprimer un commentaire en fonction de son id, cependant, seulement si l'utilisateur est l'auteur du commentaire
- `createComment()`: Créer un commentaire, en fonction de l'id de l'utilisateur, et de l'id du post

Il faut que pour **tout** les "`get`", vous utilisiez le relationnel avec la colonne user, en gros, récupérer l'id et le nom de l'auteur du commentaire. Pour les "`delete`", vous devez vérifier que l'utilisateur est bien l'auteur du commentaire. Pour les "`create`", vous devez spécifier l'id de l'utilisateur et l'id du post.

**A SAVOIR**
Pour les '`AND`' avec Drizzle, vous pouvez utiliser la méthode `and()` de Drizzle. Par exemple, pour vérifier que l'id de l'utilisateur est égal à l'id passé en paramètre, et que l'id du post est égal à l'id passé en paramètre, vous pouvez faire:

```ts
and(
    eq(comments.userId, userId), eq(comments.postId, postId)
)
```

Ce qui équivaut à:

```sql
WHERE comments.userId = 'aebc-1234-5678-90ab' AND comments.postId = 'aebc-1234-5678-90ab';
```

En plus de ça, profitez-en pour corriger également les Services / Controllers qui utilisent les anciennes méthodes, de la même façon que l'on a vu pour `UserController.ts` et `AuthService.ts`.

Bon courage !

---