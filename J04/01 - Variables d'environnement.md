# Introduction aux variables d'Environnement

Les variables d'environnement sont des valeurs dynamiques, hors du code source de votre application, qui peuvent influencer le comportement de vos programmes. Elles sont particulièrement utiles pour stocker des configurations qui peuvent varier entre les différents environnements d'exécution, comme les URLs de base de données, les clés API, et les ports d'écoute du serveur.

## Avantages clés

- **Sécurité**: Les variables d'environnement permettent de séparer les données sensibles du code source.
- **Flexibilité**: Facilite la configuration de votre application pour différents environnements sans nécessiter de modifications du code.
- **Maintenabilité**: Centralise la gestion des configurations, rendant le code plus propre et facile à gérer.

## Mise en place avec Node.js et TypeScript

Node.js permet d'accéder aux variables d'environnement via `process.env`. Cependant, pour une application robuste et maintenable, il est recommandé de centraliser la gestion de ces variables, surtout en utilisant TypeScript pour ajouter une couche de sécurité typée.

Pour pouvoir charger les variables d'environnement dans votre application Node.js, vous pouvez utiliser le package `dotenv` pour charger les variables d'environnement à partir d'un fichier `.env`. Voici comment vous pouvez procéder :

1. **Installation de `dotenv`**:

   ```bash
   npm install dotenv
   ```

2. **Création d'un fichier `.env`**:

   Créez un fichier `.env` à la racine de votre projet et ajoutez les variables d'environnement nécessaires :

   ```env
    PORT=3000
    JWT_SECRET=MonSecret
    NODE_ENV=development
    ```

3. **Chargement des variables d'environnement**:

   Dans votre fichier d'entrée (par exemple, `src/app.ts`), chargez les variables d'environnement à l'aide de `dotenv` :

   ```ts
    // src/app.ts
    import express from 'express';
    import dotenv from 'dotenv';

    dotenv.config();
    ```

## Structuration des configurations

1. **Interface de configuration**: Définissez une interface TypeScript qui spécifie le type et la structure de votre configuration.

   ```ts
   // src/types/envConfig.ts
   export interface EnvConfig {
       PORT: number;
       JWT_SECRET: string;
       NODE_ENV: 'development' | 'production' | 'test';
   }
   ```

2. **Chargement des configurations**: Créez une fonction qui charge et valide les variables d'environnement selon l'interface définie.

   ```ts
   // src/config/env.ts
   import { EnvConfig } from "../types/envConfig";

   const env: EnvConfig = {
        PORT: parseInt(process.env.PORT || "3000"),
        JWT_SECRET: process.env.JWT_SECRET || "MonSecretTropBienGardé123!",
        NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
   }
   ```

## Intégration dans votre application

Utilisez cette configuration dans votre application principale, en s'assurant que les valeurs soient correctement chargées et typées :

```ts
// src/app.ts
import express from 'express';
import env from './config/env';

const env = loadEnvConfig();

const app = express();
const { PORT } = env;

/// ... Autres configurations de l'application

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

**⚠️ ATTENTION !!**

Bien que les variables d'environnement soient un excellent moyen de gérer les configurations, il est important de ne pas stocker de données sensibles directement dans le code source. Assurez-vous de les stocker de manière sécurisée et de ne pas les exposer publiquement. A savoir, mettre les variables d'environnement dans un fichier `.env` **ignoré par Git.**

Si vous avez besoin de mettre un template de fichier `.env`, vous pouvez utiliser le fichier `.env.example` pour donner un exemple des variables d'environnement nécessaires.

Sinon, vous pouvez utiliser des services tiers comme [Vault](https://www.vaultproject.io/) pour gérer vos secrets de manière sécurisée.

### Conclusion

La gestion des variables d'environnement dans Node.js avec TypeScript offre un cadre robuste pour sécuriser et configurer votre application. En suivant les meilleures pratiques présentées dans ce cours, vous pouvez améliorer significativement la sécurité, la flexibilité et la maintenabilité de vos projets Node.js.
