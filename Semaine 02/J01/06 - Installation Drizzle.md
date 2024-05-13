# Installation de Drizzle

## Table des matières

- [Introduction](#introduction)
- [Installation](#installation)
- [package.json](#packagejson)
- [drizzle.config.ts](#drizzleconfigts)
- [Création des schémas de tables](#création-des-sch%C3%A9mas-de-tables)
  - [users.ts](#usersts)
  - [posts.ts](#poststs)
  - [comments.ts](#commentsts)
  - [Barrel Export](#barrel-export)
- [Entities](#entities)
    - [User](#user)
    - [Post](#post)
    - [Comment](#comment)
- [Migrations](#migrations)
- [Execution des scripts](#execution-des-scripts)
- [Conclusion](#conclusion)

## Introduction

Avant de commencer ce cours, il faut savoir que nul ne peut avoir la prétention de donner une meilleur cours que la documentation officielle de Drizzle. C'est pourquoi je vous invite à lire la [documentation officielle de Drizzle](https://orm.drizzle.team/docs/overview) en parallèle de ce cours.

Dans ce cours, qui sera très, très, très long (peut être le plus long de la semaine), nous allons installer Drizzle, le configurer, et l'utiliser pour faire des requêtes SQL. Le tout en remplacant les mauvaises utilisations faites dans la semaine précédente, à savoir, lire dans des mocks, et écrire dans des mocks.

J'espère que vous avez bien tous installé pgsql et pgAdmin, nous pourrons donc commencer.

## Installation

Nous allons installer toutes les dépendances nécessaires. Je ne vous explique pas encore à quoi elles servent, mais vous verrez plus tard.

```bash
npm install drizzle-orm pg postgres
```

Et enfin, les dépendances de développement.

```bash
npm install --save-dev drizzle-kit @types/pg tsx
```

## package.json

Nous allons ajouter trois nouveaux scripts dans notre `package.json`.

```json
{
    "scripts": {
        "generate": "drizzle-kit generate pg --config=src/config/drizzle.config.ts",
        "migrate": "tsx -r dotenv/config src/infrastructure/data/migrate.ts",
        "studio": "drizzle-kit studio --config=src/config/drizzle.config.ts",
    }
}
```

Voici l'intérêt de ces scripts :
1. **generate**: On utilisera `drizzle-kit` pour générer le code TS correspondant au schéma de la DB, toujours en suivant la configuration de `drizzle.config.ts`, duquel nous spécifions le chemin avec le flag `--config`. Du coup, on placera notre configuration dans `src/config/drizzle.config.ts`.

2. **migrate**: On utilisera `tsx` pour exécuter le script `migrate.ts` qui se trouve dans `src/infrastructure/data/`. Ce script permet d'utiliser la fonction `migrate()` de Drizzle pour migrer la DB, c'est à dire, appliquer les migrations de schémas vers la DB, et donc garder une trace des changements apportés au schéma de DB au fil du temps.

3. **studio**: On utilisera `drizzle-kit` pour lancer le studio de Drizzle, qui permet de visualiser le schéma de la DB, et de faire des requêtes SQL. Une alternative à pgAdmin.

Mais bien, nous parlons de ce fichier de config, mais qu'est ce que c'est exactement ?

## drizzle.config.ts

Ce fichier est le "moteur" de notre configuration Drizzle. C'est ici que nous allons définir les paramètres de connexion à la DB, et les chemins vers les fichiers de migrations et de seeds. De la même façon que notre `app.ts` est le point d'entrée de notre application, `drizzle.config.ts` est le point d'entrée de notre configuration Drizzle.

Du coup, comme je l'ai spécifié, il va falloir établir la connexion, et qui dit connexion, dit informations de connexion. Et donc, modification de notre fichier `.env`, et les fichiers annexes, à savoir `config/env.ts` et `types/env.ts`:

L'url pour la connexion à la DB est construite de la façon suivante : `postgresql://<user>:<password>@<host>:<port>/<database>`
Modifiez donc votre fichier `.env` pour qu'il ressemble à ceci :

```env
DATABASE_URL=postgresql://postgres:admin@localhost:5432/blog
```

Ensuite, il va falloir ajouter un nouvelle propriété à notre interface `Env` dans `types/env.ts` :

```ts
// src/types/env.ts
export interface Env {
    ...
    DATABASE_URL: string;
}
```

Et enfin, modifiez `config/env.ts` pour qu'il ressemble à ceci :

```ts
// src/config/env.ts
export const env = {
    ...
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:admin@localhost:5432/blog"
};
```

Désormais, nous allons pouvoir établir la connexion à la DB dans notre `drizzle.config.ts`. 
    
```ts
// src/config/drizzle.config.ts

// On importe notre configuration de l'environnement; le package dotenv/config nous permettra de lire les variables d'environnement dans notre fichier .env
import 'dotenv/config'

// Le type Config du package drizzle-kit définit la structure de notre configuration Drizzle
import { defineConfig } from 'drizzle-kit';

// On importe notre configuration de l'environnement, vous connaissez à force
import env from './env';
const { DATABASE_URL } = env;

export default defineConfig({
    // schema indique à drizzle où se trouve le fichier où sont exportés tout nos schémas de tables
    schema: 'src/infrastructure/data/schema/index.ts', // (on le créera plus tard)
    // out indique où Drizzle va générer les fichiers de migration, le journal et les métadonnées
    out: 'src/infrastructure/data/drizzle',
    // Ici, on indique à Drizzle quel driver utiliser pour se connecter à la DB, à savoir pg (pgsql)
    dialect: 'postgresql',
    // On indique les informations de connexion à la DB ...
    dbCredentials: {
        // ... et du coup, notre URL de connexion
        url: DATABASE_URL
    },
    // verbose nous permettra d'avoir encore + de logs dans la console (idéal pour le debug)
    verbose: true,
    // On veut du strict, pas de laxisme dans la configuration, on est dans de la typesafety ou pas?
    strict: true
}); // on verifie que notre configuration est bien conforme à l'interface Config.
```

## Création des schémas de tables

Parfait, nous avons établi la connexion à la DB. Mais il nous manque encore un élément essentiel pour que Drizzle puisse fonctionner : le schéma de la DB. Vous l'avez vu, dans la propriété `schema` de notre configuration, on indique le chemin vers le fichier où sont exportés nos schémas de tables. Il va donc falloir créer ce fichier.

Nous passerons par du **Barrel Export** pour exporter nos schémas de tables. C'est à dire que nous allons créer un fichier `index.ts` dans le dossier `src/infrastructure/data/schema/` qui va exporter tous nos schémas de tables, qui seront eux même dans des fichiers séparés.

Pour rappel, dans le dossier `data`, autrefois, nous avions des jsons, nos mocks. Nous allons, plutôt que d'avoir des jsons, avoir des fichiers ts. Un fichier ts par schéma, c'est à dire : `users.ts`, `posts.ts` et `comments.ts`. Et enfin, notre fichier `index.ts` qui va les exporter.

### users.ts

Commencons donc par créer notre fichier `users.ts` :

```ts
// src/infrastructure/data/schema/users.ts
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

// ici, users est un schéma de la table users, qui a quatre colonnes : id, username, password et refreshToken. Exactement comme dans notre fichier json.
export const users = pgTable('users', { // On utilise pgTable de drizzle-orm/pg-core pour créer une table, le premier argument est le nom de la table, le deuxième est un objet qui contient les colonnes de la table
    id: uuid('id').defaultRandom().primaryKey(), // On précise la colonne id, qui sera un uuid avec une valeur par défaut aléatoire, et qui sera la clé primaire de la table
    username: varchar('username', { length: 255 }).notNull(), // On précise la colonne username, qui sera un varchar de longueur 255, et qui ne peut pas être nulle
    password: varchar('password', { length: 255 }).notNull(), // On précise la colonne password, qui sera un varchar de longueur 255, et qui ne peut pas être nulle
    refreshToken: varchar('refresh_token', { length: 255 }), // On précise la colonne refreshToken, qui sera un varchar de longueur 255
});
```

### posts.ts

Ainsi, nous avons créé notre schéma de table `users`. Faites de même pour les schémas `posts` et `comments`.

```ts
// src/infrastructure/data/schema/posts.ts
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// Cette fois ci, on importe le schéma users, car on va faire une relation entre les deux tables
import { users } from "./users";

// La construction est la même que pour users ...
export const posts = pgTable('posts', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    // ... sauf pour la colonne author, qui est une relation avec la table users, du coup on chaine la méthode references avec le schéma users, notre FK (foreign key) est donc author qui fait référence à l'id de la table users
    author: uuid('author').references(() => users.id).notNull(),
    // ici, on a une colonne de date, qui est une timestamp, et qui a une valeur par défaut de la date actuelle, du coup pas nécessaire de la préciser lors de l'insertion
    date: timestamp('date').defaultNow().notNull()
});
```

### comments.ts

Et maintenant, une table un peu similaire: à savoir, `comments`.

```ts
// src/infrastructure/data/schema/comments.ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
// Les commentaires sont en relation avec les posts ET les users, car un commentaire est fait par un utilisateur sur un post
import { users } from "./users";
import { posts } from "./posts";

export const comments = pgTable('comments', {
    id: uuid('id').defaultRandom().primaryKey(),
    // on applique la relation avec les tables users et posts, comme précédemment
    postId: uuid('postId').references(() => posts.id).notNull(),
    author: uuid('author').references(() => users.id).notNull(),
    content: text('content').notNull(),
    date: timestamp('date').defaultNow().notNull()
});
```

### Barrel Export

Et on parlait justement de notre **Barrel Export**, c'est à dire un fichier `index.ts` qui va exporter tous nos schémas de tables. Voici donc ce fichier :

```ts
// src/infrastructure/data/schema/index.ts
import { comments } from "./comments";
import { posts } from "./posts";
import { users } from "./users";

export {
    comments,
    posts,
    users
}
```

Ainsi, notre fichier `drizzle.config.ts` peut maintenant pointer vers ce fichier `index.ts` pour récupérer tous nos schémas de tables. Rappelez vous, il s'agissait de cette propriété:
    
```ts
schema: 'src/infrastructure/data/schema/index.ts'
```

## Entities

Auparavant, nos `Entities` étaient des interfaces qui définissaient la structure de nos données. Maintenant, avec Drizzle, nos `Entities` sont des classes qui vont nous permettre d'interagir avec la DB. Ces classes vont nous permettre de faire des requêtes SQL, et de manipuler les données de la DB.

Du coup, on retourne dans notre dossier `src/domain/entities/`, et on va créer nos `Entities` pour nos tables `users`, `posts` et `comments`. On supprime intégralement les autres fichiers, car nous n'en avons plus besoin.

### User

```ts
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { users } from "../../infrastructure/data/schema/users";

// Ce type représente le modèle d'un utilisateur au moment de sa sélection dans la DB. InferSelectModel<typeof users> indique que le type User aura les même propriétés que la table users dans la DB
export type User = InferSelectModel<typeof users>;

// De même pour NewUser, il représente le modèle d'un utilisateur au moment de son insertion dans la DB. InferInsertModel<typeof users> indique que le type NewUser aura les même propriétés que la table users dans la DB, sans les propriétés générées automatiquement, comme l'id par exemple
export type NewUser = InferInsertModel<typeof users>;
```

### Post

```ts
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { posts } from "../../infrastructure/data/schema/posts";

export type Post = InferSelectModel<typeof posts>;
export type NewPost = InferInsertModel<typeof posts>;
```

### Comment

```ts
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { comments } from "../../infrastructure/data/schema/comments";

export type Comment = InferSelectModel<typeof comments>;
export type NewComment = InferInsertModel<typeof comments>;
```

## Migrations

Une migration, quant on parle de DB, c'est le fait de mettre à jour le schéma de la DB. C'est à dire, ajouter des tables, des colonnes, des contraintes, etc. Drizzle nous permet de gérer ces migrations de façon très simple. Il suffit de créer un fichier de migration, et de l'exécuter. Mais où créer ce fichier ?

Rappelez vous, dans notre fichier `package.json`, nous avons ajouté un script `migrate` qui pointe vers un fichier `migrate.ts` dans le dossier `src/infrastructure/data/`. C'est donc ici que nous allons créer notre fichier de migration.

Voici comment créer ce fichier de migration :

```ts
// src/infrastructure/data/migrate.ts

import { Pool } from "pg"; // Pool nous permet de créer un pool de connexion à notre DB pgsql
import { migrate } from "drizzle-orm/node-postgres/migrator"; // migrate est une fonction de Drizzle qui permet de migrer la DB
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres"; // NodePgDatabase est une interface de Drizzle qui définit les méthodes pour interagir avec la DB

import env from "../../config/env";
const { DATABASE_URL } = env;

async function main() {
    // Nous créons un pool de connexion à la DB avec notre URL de connexion de notre fichier .env
    const pool = new Pool({ connectionString: DATABASE_URL })

    // Nous initialisons la connexion à la DB avec drizzle(pool), ce qui nous donne une instance de NodePgDatabase
    const db: NodePgDatabase = drizzle(pool);

    // On affiche un message pour indiquer que la migration commence
    console.info("Migrating database...");

    // On appelle la fonction migrate de Drizzle, qui va migrer la DB en appliquant les migrations de schémas dans le dossier spécifié dans la propriété out migrationsFolder
    await migrate(db, { migrationsFolder: 'src/infrastructure/data/drizzle' });

    // On affiche un message pour indiquer que la migration est terminée
    console.info("Database migrated successfully!");

    // On ferme le pool de connexion à la DB
    await pool.end();
}

// On est obligé d'appeler main() pour que le script soit exécuté
main();
```

## Execution des scripts

Vous vous rappelez de quand on avait bidouillé notre fichier `package.json` pour ajouter des scripts ? Et bien, il est temps de les exécuter. On va commencer par générer notre schéma de DB, puis migrer la DB, et enfin lancer le studio de Drizzle.

```shell
npm run generate
```
On regarde, oh, la console affiche un succès (idéalement), et on a un nouveau dossier `drizzle` dans notre dossier `data`. C'est bon signe.

```shell
npm run migrate
```
Avec ca, on a pu exécuter notre migration, et donc, mettre à jour notre DB avec les schémas de tables que nous avons créé.

```shell
npm run studio
```
Et enfin, on lance le studio de Drizzle, qui nous permet de visualiser notre schéma de DB, et de faire des requêtes SQL. On peut le faire sous pgAdmin, mais c'est plus fun de le faire avec Drizzle.

## Conclusion

Et voilà, nous avons installé Drizzle, configuré notre connexion à la DB, créé nos schémas de tables, nos `Entities`, et migré notre DB. Nous sommes prêts à faire des requêtes SQL avec Drizzle. Nous verrons cela dans le prochain cours.

Ce fut long, mais ce sont des étapes auquel on ne reviendra pas, et généralement, les configurations sont les mêmes pour tous les projets.