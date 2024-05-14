# Test unitaire

Pour rappel, on test un controller/service à la fois. On ne test pas un controller et un service dans le même test. L'essentiel c'est de bien découper ses tests pour isoler les erreurs.

Pour notre premier exemple, nous allons faire un test unitaire, c'est à dire, un test sur un service. Nous allons tester le service `PostService` et quelques unes de ces méthodes.

Nous allons donc tester notre service `PostService`. Pour cela, nous allons créer un fichier `PostService.test.ts` dans le dossier `src/tests/unit`.

## Concepts de base

### Structure d'un test avec Jest

- **describe** : Une fonction pour regrouper des tests liés.
- **it** : Décrit un test individuel.
- **expect** : Une fonction pour vérifier si une valeur correspond à ce qui est attendu.

## Mise en place du fichier de test

### Préparation du contexte

Pour commencer, nous allons créer un fichier `PostService.test.ts` dans le dossier `src/tests/unit`.

Voici comment structurer votre fichier de test :

```ts
// les imports de @jest/globals pour les fonctions de test et d'assertion 
import { describe, beforeAll, afterAll, afterEach, it, expect } from '@jest/globals';

// Nous auront besoins de notre service et de notre repository pour tester
import { PostService } from '../../domain/services/PostService';
import { PostsRepository } from '../../infrastructure/repositories/PostRepository';
import { NewPost } from '../../domain/entities/Post';

// Rappelez vous, nous avons créé un utilisateur pour nos tests dans le fichier jest.setup.ts
import { createdUser } from '../jest.setup';
```

### Explication des imports

- **@jest/globals** :
  - `describe` : Regroupe des tests logiquement liés.
  - `beforeAll` : Fonction exécutée une fois avant tous les tests.
  - `afterAll` : Fonction exécutée une fois après tous les tests.
  - `afterEach` : Fonction exécutée après chaque test.
  - `it` : Décrit un cas de test individuel.
  - `expect` : Vérifie si une valeur satisfait une condition.

- **Services et repositories** :
  - `PostService` : Service que nous testons.
  - `PostsRepository` : Repository utilisé par le service.

- **Entities** :
  - `NewPost` : Types pour nos données.

- **Setup** :
  - `createdUser` : Utilisateur créé pour les tests dans `jest.setup.ts` (voir le chapitre précédent).

### Déclaration des variables et initialisation

```ts

describe('PostService', () => {
  let postService: PostService;
  let postRepository: PostsRepository;
  let now = new Date(); // Nous allons utiliser la date actuelle pour le champ date, pour éviter les erreurs de comparaison de nos tests
  let newPost: NewPost = { title: 'New Post', content: 'Post content', author: createdUser.id, date: now }; // Un nouveau post qu'on va créer pour nos tests
  let createdPostID: string | undefined; // L'ID du post créé
```

### Explication

- **Variables** :
  - `postService` : Instance de `PostService`.
  - `postRepository` : Instance de `PostsRepository`.
  - `now` : Date actuelle pour le champ `date`.
  - `newPost` : Objet représentant un nouveau post.
  - `createdPostID` : ID du post créé.

#### Initialisation avant les tests

```ts
  beforeAll(async () => {    
    postRepository = new PostsRepository();
    postService = new PostService();
    newPost.author = createdUser.id;
  });
```

- **`beforeAll`** : Prépare l'environnement avant d'exécuter les tests. Initialisation des instances de `postRepository` et `postService`. Mise à jour de l'auteur du `newPost` avec l'ID de l'utilisateur créé dans le fichier `jest.setup.ts`.

### Écriture des tests

#### Test de création d'un post

```ts
  it('should add a new post', async () => {
    try {
        createdPostID = await postService.addPost(newPost);
        expect(createdPostID).toBeTruthy();
    } catch (error) {
        console.error('Error during addPost:', error);
    }
  });
```

### Explication

- **`it`** :
  - Définit un test individuel avec une description `'should add a new post'`. En gros, dans le terminal, vous verrez `PostService should add a new post`, et affichera si le test a réussi ou échoué. C'est vraiment pour isoler les tests. N'oubliez pas de bien nommer vos tests, et de faire en sorte qu'ils soient indépendants les uns des autres et également pertinents !!!
  - **Vérification** : Utilisation de `expect` pour vérifier que l'ID du post créé est défini. `expect` c'est comme son nom l'indiue, on s'attend à ce que quelque chose soit égal à quelque chose d'autre. Ici, on s'attend à ce que l'ID du post créé soit défini (truthy, donc non null ou undefined). Si ce n'est pas le cas, le test échouera et vous verrez un message d'erreur dans le terminal.

#### Test de récupération d'un post par ID

```ts
  it('should get a post by id', async () => {
    const post = await postService.getPostById(createdPostID || '');
    expect(post[0]).toEqual( // post[0] (car post est un tableau) doit être égal à l'objet suivant:
        expect.objectContaining({ // objectContaining permet de vérifier que l'objet contient les propriétés spécifiées
            id: createdPostID, // par exemple, que l'ID du post est égal à l'ID du post créé
            title: newPost.title,
            content: newPost.content,
            author: expect.objectContaining({
                id: createdUser.id,
                username: createdUser.username
            }),
            comments: null, // Les commentaires sont null car on n'a pas encore ajouté de commentaires, le post vient d'être créé
            date: now
        })
      );
    });
```

### Explication

- **`it`** :
  - Définit un test pour vérifier la récupération d'un post par son ID.
  - **Vérification** : Utilisation de `expect` pour vérifier que les propriétés du post récupéré correspondent à celles du `newPost`.

#### Test de técupération de tous les posts

```ts
  it('should get all posts', async () => {
    const posts = await postRepository.getAllPosts();
    expect(posts).toEqual( // on va être moins précis ici, on va juste vérifier que la liste des posts contient des objets avec les propriétés suivantes
      expect.arrayContaining([ // arrayContaining permet de vérifier que le tableau contient au moins un élément correspondant
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          content: expect.any(String),
          author: expect.objectContaining({
            id: expect.any(String),
            username: expect.any(String)
          }),
          date: expect.any(Date),
          comments: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              content: expect.any(String),
              date: expect.any(Date)
            })
          ])
        })
      ])
    );
  });
});
```

### Explication

- **`it`** :
  - Définit un test pour vérifier la récupération de tous les posts.
  - **Vérification** : Utilisation de `expect` pour vérifier que la liste des posts contient des objets avec les propriétés spécifiées. Les commentaires peuvent être `null` ou un tableau d'objets.

### Explications des assertions

- **`expect.any(Type)`** : Vérifie que la valeur est du type spécifié.
- **`expect.anything()`** : Vérifie que la valeur est définie (non `null` ou `undefined`).
- **`expect.objectContaining({...})`** : Vérifie que l'objet contient les propriétés spécifiées.
- **`expect.arrayContaining([...])`** : Vérifie que le tableau contient au moins un élément correspondant.
