# Configuration CORS

Dans ce module, nous allons aborder la configuration du *Cross-Origin Resource Sharing* (CORS) sur un serveur Express. Le CORS est une politique de sécurité qui permet ou restreint les ressources web demandées sur un domaine web depuis un autre domaine. Avant de plonger dans la configuration technique, comprenons d'abord ce qu'est le CORS et pourquoi il est essentiel pour les applications web modernes, surtout quand le frontend et le backend sont hébergés séparément.

## Table des matières

- [Qu'est-ce que le CORS ?](#qu'est-ce-que-le-cors-)
- [Pourquoi ?](#pourquoi)
- [Installation et Configuration de CORS](#installation-et-configuration-de-cors)
  - [Étape 1: Installation de CORS](#étape-1-installation-de-cors)
  - [Étape 2: Importer](#étape-2-importer)
- [Conseils](#conseils)

## Qu'est-ce que le CORS ?

Le CORS (*Cross-Origin Resource Sharing*) est un mécanisme qui utilise des en-têtes HTTP supplémentaires pour dire à un navigateur de permettre à une application web d'accéder à des ressources provenant d'un serveur situé sur une origine (domaine) différente de celle du site courant. Sans CORS, les politiques de même origine (*Same-Origin Policy*) du navigateur restreignent les scripts sur une page pour ne demander des données qu'à la même origine qui a servi la page web, pour des raisons de sécurité.

Alors, ce n'est pas un totem de sécurité, mais une couche de sécurité supplémentaire. Il est, bien entendu, possible de bypasser le CORS si l'on sort du cadre du navigateur, en modifiant les en-têtes HTTP, mais c'est une autre histoire.

### Pourquoi ?

Dans le développement moderne d'applications, il est courant que votre API backend (Node.js/Express) et votre frontend (React, Angular, etc.) soient hébergés sous des domaines ou des ports différents. Par exemple, votre API peut être accessible via `http://localhost:8000` tandis que votre frontend peut être servi via `http://localhost:5173`. Sans une politique CORS appropriée, toutes les requêtes initiées par votre frontend vers votre backend seront bloquées par le navigateur, avec un vilain message d'erreur CORS dans la console.

## Installation et Configuration de CORS

Suivons les étapes pour configurer correctement CORS dans votre application Express pour permettre une communication sécurisée entre votre frontend et votre backend.

### Étape 1: Installation de CORS

Avant tout, nous devons installer le package `cors` qui est un middleware Express pour activer les configurations CORS nécessaires.

Ouvrez votre terminal dans le dossier de votre projet et exécutez :

```bash
npm install cors
```

Et bien entendu, on est sur un projet TypeScript, donc on installe les types pour TypeScript :

```bash
npm install @types/cors --save-dev
```

### Étape 2: Importer

Après avoir installé le package, vous devez l'intégrer dans votre application Express. Ouvrez votre fichier principal du serveur Express (`app.ts`) et ajoutez le middleware CORS.

Ajoutez l'importation en haut du fichier :

```ts
import cors from 'cors';
```

Puis, configurez le middleware CORS avant vos routes pour appliquer la politique CORS à toutes les requêtes entrantes :

```ts
// app.ts
import cors from 'cors';

// Configuration CORS pour permettre les requêtes de toutes les origines
app.use(cors({
    origin: 'http://localhost:5173', // Autoriser uniquement cette adresse à requêter sur le serveur
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Méthodes HTTP autorisées, les plus courantes, les autres seront bloquées
    credentials: true // Autoriser les cookies
}));
```

Mmmmmh... C'est moyen !
On avait pourtant utilisé un `dotenv` pour gérer les variables d'environnement, et là, on met en dur l'origine autorisée. C'est pas très propre, ça !

Alors, on reprends la main, et on ajoute donc dans notre fichier `.env` :

```env
FRONTEND_URL=http://localhost:5173
```

Oui, mais on veut un truc typesafe, nous !
On se rappelle donc de notre fichier `src/types/env.ts` :

```ts
// src/types/env.ts
export interface EnvConfig {
    PORT: number;
    JWT_SECRET: string;
    REFRESH_SECRET: string;
    NODE_ENV: 'development' | 'production' | 'test';
    FRONTEND_URL: string; // On ajoute notre variable d'environnement pour l'URL du frontend
}
```

Ce n'est qu'une interface utilisée nul part !
On l'utilisait où, déjà ? ...

...

Ah oui, dans notre fichier `src/config/env.ts` :

```ts
// src/config/env.ts
import { EnvConfig } from "../types/env";

const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "3000"),
    JWT_SECRET: process.env.JWT_SECRET || "MonS3cr3tTropBienGardé123:!",
    REFRESH_SECRET: process.env.REFRESH_SECRET || "MonS3cr3tTropBienGardé123IlEstR3fr3sh§:!",
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test' || 'development',
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173" // On ajoute notre variable d'environnement pour l'URL du frontend, avec une valeur par défaut
};

export default env;
```

Voilà, c'est mieux, non ? On a donc notre URL du frontend qui est maintenant gérée par une variable d'environnement, et qui est donc plus facilement modifiable.
Il ne reste plus qu'à l'utiliser dans notre middleware CORS :

```ts
// app.ts
import cors from 'cors';
const { PORT, FRONTEND_URL } = env;

app.use(cors({
    origin: FRONTEND_URL, // Autoriser uniquement cette adresse à requêter sur le serveur
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Méthodes HTTP autorisées, les plus courantes, les autres seront bloquées
    credentials: true // Autoriser les cookies
}));
```

Et voilà, désormais, notre serveur Express est configuré pour autoriser les requêtes provenant de notre frontend React hébergé sur `http://localhost:5173`. Vous pouvez bien sûr modifier cette URL pour correspondre à votre environnement de développement pour un jour, peut-être, un déploiement en production.

### Conseils

- **Environnements de production** : Dans un environnement de production, il est recommandé de spécifier explicitement les origines autorisées au lieu de permettre à toutes les origines (`*`) pour des raisons de sécurité. Vraiment, évitez le `*` en production ! Pour absolument tout, d'ailleurs.
- **Débogage de CORS** : Si vous rencontrez des erreurs CORS, assurez-vous de vérifier les en-têtes de requête et de réponse pour s'assurer que les en-têtes CORS appropriés sont présents.
