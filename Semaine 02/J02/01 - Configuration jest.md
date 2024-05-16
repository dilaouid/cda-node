# Configuration de jest

## Introduction

En fin de première semaine, pendant les évaluations de TP, vous avez été nombreux à me demander d'approfondir les tests. C'est ce que nous allons faire aujourd'hui. Sauf que cette fois-ci, le contexte est différent.
Auparavant, nous utilisions exclusivements des mocks pour nos données, sauf qu'aujourd'hui, nous avons une jolie base de donnée avec un très bel ORM (Drizzle).

Du coup, nous allons pouvoir tester des Services avec cette pratique là.

## A savoir

Je ne vais pas, dans ce support, revenir sur ce qu'est un test, et à quoi ça sert. Pour cela, je vous invite à vous rediriger sur le support de la semaine dernière. Je vais simplement approfondir la pratique.

Cependant, nous allons avoir besoin d'un changement de configuration. Pour commencer, nous n'allons pas utiliser notre base de donnée de production, mais une base de donnée de test. Pour cela, nous allons devoir modifier nos fichiers de variables d'environnement.

## Configuration

Pour commencer, on installe bien entendu toutes nos dépendances pour réaliser nos tests. Ce sont toutes des dépendances de développement, donc on les installe avec l'option `--save-dev`.

```bash
npm install --save-dev jest ts-jest @types/jest
```

Et en parallèle, on modifie notre fichier `package.json` pour ajouter une commande de test.

```json
// package.json
{
    "scripts": {
        "test": "jest --config jest.config.js --runInBand", // Le flag --runInBand permet de lancer les tests de manière séquentielle, et non en parallèle
        "clear_jest": "jest --clearCache", // Cette commande permet de vider le cache de jest, si jamais vous avez des problèmes de cache
    }
}
```

On modifie notre architecture, pour ajouter les dossiers suivants à notre `src`:
- `tests`: qui contiendra nos tests
    - `unit`: qui contiendra nos tests unitaires (services, repositories, utils, etc...)
    - `integration`: qui contiendra nos tests d'intégration (routes, controllers, etc...)
    - `mocks`: qui contiendra nos mocks

Nous allons également configurer jest avec nos deux fichiers de configuration, à savoir `jest.config.js` à la racine de notre dossier `server` et `jest.setup.ts` dans notre dossier `src/tests/` .

Le fichier `jest.config.js` va nous permettre de configurer jest pour qu'il puisse utiliser TypeScript, et de lui dire de lancer le fichier `jest.setup.ts` avant et après chaque test.

```js
// jest.config.js
module.exports = {
    preset: 'ts-jest', // On dit à jest de préparer les tests pour TypeScript
    testEnvironment: 'node', // On dit à jest de simuler un environnement node
  
    setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.ts'], // <rootDir> est le chemin absolu vers la racine du projet, donc le dossier server
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1' // On dit à jest de transformer les imports de la forme "@/..." en "src/..."
      },
      transform: {
        '^.+\\.ts?$': 'ts-jest' // On dit à jest de transformer les fichiers .ts en .js pour les exécuter
      },
      testMatch: [
        '**/?(*.)+(spec|test).[tj]s?(x)' // On dit à jest de chercher les fichiers de test qui se terminent par .spec.ts ou .test.ts
      ]    
};
```

Le fichier `src/tests/jest.setup.ts` va nous permettre de faire des actions avant et après chaque test. Dans notre cas, nous allons initier un schéma du nom de `test` dans notre DB, et le supprimer après que tout les tests aient été exécutés.

```ts
// src/tests/jest.setup.ts
import { beforeAll, afterAll } from '@jest/globals';
import { db, pool } from '../infrastructure/data';
import bcrypt from 'bcrypt';

import { sql } from 'drizzle-orm';

import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { users } from '../infrastructure/data/schema';

// On exporte un utilisateur que l'on va créer pour nos tests, et qui sera utilisé dans ces derniers
// Bien entendu, il sera supprimé à la fin de tout les tests
export let createdUser: {id: string, username: string, password: string} = { id: '', username: '', password: '' }

// AVANT TOUT, beforeAll
// Ca veut dire que c'est une fonction qui sera exécutée avant tout les tests, et on va en profiter pour setup notre environnement (db)
beforeAll(async () => {
    try {
        console.log('Setting up test environment...');
        // On va créer notre schéma de test dans notre DB, imaginez un schéma pgsql comme une base de donnée dans une base de donnée, c'est un espace de nommage
        // pour éviter de devoir créer une base de données annexe pour nos tests
        await db.execute(sql`CREATE SCHEMA IF NOT EXISTS test`);

        // On dit à notre DB de travailler dans le schéma test
        await db.execute(sql`SET search_path TO test`);
    
        // On va appliquer nos migrations dans le schéma test, c'est à dire insérer nos tables à l'intérieur
        await migrate(db, { migrationsFolder: 'src/infrastructure/data/drizzle', migrationsSchema: 'test' });
        console.log('Migrations applied.');
    
        // On va créer notre utilisateur de test, qui s'occupera d'écrire des articles, commenter, etc...
        const hashedPassword = await bcrypt.hash('password123', 10);
        const result = await db.insert(users)
          .values({ username: 'testuser', password: hashedPassword })
          .returning()
          .execute();
    
        // createdUser, qui est exporté dans ce fichier. Nous le mettons à jour avec l'utilisateur que nous venons de créer
        createdUser = { id: result[0].id, username: 'testuser', password: hashedPassword };
        console.log('Test user created:', createdUser);
    } catch (error) {
        console.error('Error during beforeAll:', error);
    }
});

// APRES TOUT, afterAll
// Ca veut dire que c'est une fonction qui sera exécutée après tout les tests, et on va en profiter pour nettoyer notre environnement (db)
afterAll(async () => {
    try {
        await db.execute(sql`DROP SCHEMA IF EXISTS test CASCADE`);
        await pool.end();
    } catch (error) {
        console.error('Error during afterAll:', error);
    }
});
```

Et ainsi, nous avons notre environnement de test configuré. Nous allons pouvoir commencer à écrire nos tests.
