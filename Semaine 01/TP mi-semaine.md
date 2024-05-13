# Sujet du TP: Créer une application en architecture hexagonale

## Objectif

Développer une API simple sur le thème de votre choix, en utilisant l'architecture hexagonale. L'API permettre d'afficher la donnée de votre choix (par exemple, une liste de tâches). Du coup, vous ne passerez **exclusivement** sur des méthodes HTTP GET.

## Étapes

1. **Initialisation du projet**
   - Créer un dossier pour le projet et initialiser un dépôt Git.
   - Initialiser un projet Node.js, vous pouvez vous servir du `package.json` et du `tsconfig.json` fournis dans le cours (dans la branche `main`), n'oubliez pas d'installer les dépendances (`npm install` ou `yarn`).
   - J'ai fais une coquille hier, n'oubliez pas d'installer `ts-node-dev` en tant que dépendance globale sur votre machine (`npm install -g ts-node-dev` ou `yarn global add ts-node-dev`) ou en tant que dépendance de développement (`npm install --save-dev ts-node-dev` ou `yarn add --dev ts-node-dev`).

2. **Création de l'architecture du projet**
   - Suivre l'architecture proposée pour créer les dossiers et fichiers nécessaires.

3. **Création de l'entité**
   - Dans `src/domain/entities/`, créer un fichier typescript qui définit la structure de votre donnée

4. **Création du mock JSON**
   - Dans `src/infrastructure/data/`, créer un fichier JSON qui contient des données mockées, vous pouvez vous servir d'un outil de génération de données (faker, chatgpt)

5. **Création du repository**
   - Dans `src/infrastructure/repositories/`, gérez les différentes opérations CRUD sur les données

6. **Création du service**
   - Dans `src/domain/services/`, implémentez la logique métier, par exemple l'on peut implémenter une méthode pour récupérer toutes vos données, ou une méthode pour récupérer une donnée par son identifiant ou autre.

7. **Création du controller**
   - Dans `src/infrastructure/web/controllers/`, créer votre controller pour gérer les requêtes HTTP. Vous pouvez utiliser les méthodes du service pour récupérer les données.

8. **Création des routes**
   - Dans `src/infrastructure/web/routes/`, créer un fichier pour définir les routes de votre API. Utilisez le controller pour gérer les requêtes.

9. **Ajout de middleware**
    - Créer un middleware simple dans `src/middlewares/` pour logger les requêtes, par exemple. En utilisant la méthode `app.use()` d'Express, ajoutez ce middleware à votre application. Mais idéalement, essayez de créer un middleware spécifique pour une route en particulier.

10. **Utilisation des variables d'environnement pour le PORT**
    - Utiliser `process.env.PORT` pour définir le port du serveur dans `src/app.ts`. Utilisez la même méthode que celle utilisée en cours (avec le package `dotenv`, et typage des variables d'environnement).

11. **Finalisation et test de l'API**
    - Démarrer l'application (`npm run dev` ou `yarn start`) et tester les endpoints via un client HTTP (Postman, Insomnia) ou directement depuis votre navigateur.

## Livrable

Un lien vers le dépôt GitHub contenant le code du projet.
