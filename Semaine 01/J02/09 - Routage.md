# Configuration du routage dans Express avec TypeScript

Le routage est un aspect fondamental dans le développement d'applications web, permettant de définir comment une application répond à une demande client à un endpoint particulier, qui est une URI (ou chemin) et une méthode de requête HTTP spécifique (GET, POST, etc.).

Express rend cette tâche non seulement simple mais aussi très intuitive, particulièrement lorsque combiné avec la puissance de TypeScript et la modularité des ES Modules. Dans cette section, nous allons explorer comment configurer le routage pour des opérations _CRUD_ basiques dans une application Express, en utilisant TypeScript.

## Création de Routes pour les opérations CRUD

CRUD est un acronyme pour _Create, Read, Update, Delete_, qui sont les quatre opérations de base pour la manipulation des données. Nous allons illustrer comment implémenter ces opérations à travers le routage Express.

### Comprendre le Routage avec Express et TypeScript

Avant de plonger dans la création des routes CRUD pour votre application Express utilisant TypeScript, il est essentiel de comprendre les bases du routage avec Express, un aspect fondamental dans le développement d'applications web.

#### Qu'est-ce que le Routage?

Le routage dans Express sert à déterminer comment une application répond à une demande client vers un endpoint spécifique, identifié par une URI (Uniform Resource Identifier) et une méthode de requête HTTP (comme GET, POST, PUT, DELETE, etc.). Chaque route peut avoir une ou plusieurs fonctions de traitement, qui sont exécutées lorsque la route est appariée.

#### Les Méthodes du Router

Le `Router` d'Express est un objet qui permet de définir des routes. Voici les méthodes de base correspondant aux opérations CRUD:

- **GET** : Utilisée pour récupérer des données. Par exemple, `router.get('/')` définirait une route pour récupérer tous les éléments d'une collection.
- **POST** : Utilisée pour créer une nouvelle entrée dans la base de données. Par exemple, `router.post('/')` définirait une route pour créer un nouvel élément.
- **PUT** : Utilisée pour mettre à jour une entrée existante. `router.put('/:id')` permettrait de mettre à jour l'élément correspondant à l'ID spécifié.
- **DELETE** : Utilisée pour supprimer une entrée existante. `router.delete('/:id')` supprimerait l'élément avec l'ID spécifié.

#### Les Paramètres dans les Routes

Les routes peuvent inclure des paramètres nommés dans le chemin de la route. Par exemple, dans la route `router.get('/:id')`, `:id` est un paramètre qui peut être utilisé pour capturer une partie de l'URL. Les valeurs des paramètres sont accessibles dans le contrôleur via `req.params`.

#### Traitement des Requêtes et Réponses

Chaque fonction de traitement de route prend deux objets principaux en paramètres : `req` (la requête) et `res` (la réponse), ainsi qu'un troisième optionnel, `next`, utilisé pour passer au middleware suivant.

- **req (Requête)** : Contient toutes les informations sur la requête HTTP, y compris les paramètres de route, les query strings, les en-têtes, et le corps de la requête.
- **res (Réponse)** : Permet de contrôler ce qui est envoyé au client en réponse à la requête. Vous pouvez envoyer du texte, du JSON, du HTML, etc.

### Détail sur la fonction de traitement des routes

Lorsque vous définissez une route avec Express, vous spécifiez non seulement le chemin et la méthode HTTP, mais aussi une ou plusieurs fonctions de traitement (handlers) qui déterminent l'action à effectuer lorsque cette route est appelée. Ces fonctions jouent un rôle central dans le contrôle de la logique d'application en réponse aux requêtes HTTP.

#### La Fonction de Callback

La fonction de callback dans une définition de route est appelée avec deux (parfois trois) arguments principaux : `req`, `res`, et optionnellement `next`. Voici une explication plus détaillée :

- `req` (Request) : Contient toutes les informations sur la requête HTTP, telles que les paramètres de l'URL, le corps de la requête (pour les méthodes POST et PUT), les headers, et plus encore.
- `res` (Response) : Fournit les méthodes pour envoyer une réponse au client. Cela peut inclure l'envoi de données (sous forme de texte, JSON, etc.), la définition de headers HTTP, et le statut de la réponse.
- `next` : Une fonction qui, lorsqu'elle est appelée, passe le contrôle au prochain middleware dans la pile. Son utilisation est plus fréquente dans les middlewares que dans les fonctions de route elles-mêmes.

#### Cumulation des fonctions de callback

Express vous permet de spécifier plusieurs fonctions de callback qui peuvent être exécutées séquentiellement lorsqu'une route est appelée. Cela est utile pour la séparation des préoccupations, par exemple, où une fonction peut s'occuper de la validation, une autre de la logique métier, et une autre encore de l'envoi de la réponse.

Voici comment cela pourrait se présenter :

```ts
router.get('/', (req, res, next) => {
  // Première fonction de callback : Validation (middleware)
  if (!req.query.id) {
    return res.status(400).send('ID is required');
  }
  next(); // Passe au prochain handler si la validation est réussie
}, (req, res) => {
  // Deuxième fonction de callback : Logique métier et envoi de la réponse
  res.send(`Fetching data with ID: ${req.query.id}`);
});
```

Dans cet exemple, le premier handler valide la présence d'un `id` dans la chaîne de requête. S'il est absent, il envoie une réponse d'erreur. Sinon, il appelle `next()` pour passer au prochain handler, qui traite la logique métier et envoie la réponse finale.

#### Bonnes Pratiques

- **Gestion des Erreurs :** Utilisez `try...catch` autour de vos logiques métier pour attraper les erreurs et utilisez `next(error)` pour les passer au gestionnaire d'erreurs d'Express.
- **Clarté et Maintenance :** Gardez vos fonctions de callback aussi simples et concentrées que possible. Pour les logiques plus complexes, envisagez de les extraire dans des fonctions séparées ou des services.

L'utilisation judicieuse des fonctions de callback dans vos routes Express permet une grande flexibilité et une séparation claire des différentes étapes de traitement d'une requête, facilitant ainsi la maintenance et l'évolution de votre application.

⚠️ **A SAVOIR:**

- Ne **jamais** faire confiance aux données envoyées par le client. Toujours valider et échapper les données avant de les utiliser.
- Les routes doivent être définies de manière à être claires, expressives et faciles à comprendre. Par exemple, une route `router.delete('/delete/:id')` est répétitive, alors que `router.delete('/:id')` est plus concis et intuitif.
- Une route doit **toujours** fournir une réponse. Que ce soit un succès, une erreur, ou une redirection, une réponse doit être envoyée au client.
- Dans le cas des middlewares, si vous avez terminé le traitement de la requête, n'oubliez pas d'appeler `next()` pour passer au middleware suivant.

#### Exemple d'Utilisation des Méthodes du Router

Pour mieux comprendre, voici comment vous pourriez structurer une route POST simple pour ajouter un nouveau post :

```ts
router.post('/', (req, res) => {
  const newPost = req.body; // Assumant que le corps de la requête contient les données du nouveau post

  // Ici, vous traiteriez la logique pour ajouter le nouveau post à votre base de données par exemple

  res.status(201).send(newPost); // Envoyer une réponse avec le statut 201 (Créé) et les données du nouveau post
});
```

Dans cet exemple, `req.body` contient les données envoyées par le client, et `res.status(201).send(newPost)` envoie une réponse indiquant que la ressource a été créée avec succès, incluant les données du nouveau post.

### Étape 1 : Structure de projet

Assurons-nous que notre projet est structuré de manière à séparer nos préoccupations. Créez un dossier `src/infrastructure/web/routes` dans votre dossier `src` pour stocker vos fichiers de routage.

```plaintext
mon-projet-express-ts/
├── src/
│   ├── infrastructure/
│       ├── web/
│           ├── routes/
│               ├── postsRoutes.ts
                ├── index.ts
│   ├── app.ts
├── package.json
├── tsconfig.json
```

### Étape 2 : Définition des routes CRUD

Dans `src/infrastructure/web/routes/postsRoutes.ts`, nous allons définir les routes pour manipuler une ressource hypothétique `posts`. Chaque route traitera une opération CRUD spécifique.

```ts
// src/infrastructure/web/routes/postsRoutes.ts
import { Router } from 'express';

const router = Router();

// GET tous les posts
router.get('/', (req, res) => {
  res.send('Récupérer tous les posts');
});

// GET un post par ID
router.get('/:id', (req, res) => {
  res.send(`Récupérer le post avec l'ID ${req.params.id}`);
});

// POST un nouveau post
router.post('/', (req, res) => {
  res.send('Créer un nouveau post');
});

// PUT à jour un post
router.put('/:id', (req, res) => {
  res.send(`Mettre à jour le post avec l'ID ${req.params.id}`);
});

// DELETE un post
router.delete('/:id', (req, res) => {
  res.send(`Supprimer le post avec l'ID ${req.params.id}`);
});

export default router;
```

Notez comment chaque opération CRUD correspond à une méthode HTTP spécifique et comment nous utilisons `Router` d'Express pour définir ces routes de manière modulaire.

Gardez en tête que les handlers sont amenés à être rapidement modifier dans le cadre de notre architecture hexagonale. Ici, on ne fait que renvoyer des messages pour illustrer le concept ! Pas d'impatience ! :D

### Etape 3 : Utilisation du Barrel Export pour les Routes

Dans `src/infrastructure/web/routes/index.ts`, nous allons regrouper et exporter toutes les routes définies dans un seul endroit, facilitant leur importation dans d'autres parties de l'application.

```ts
// src/infrastructure/web/routes/index.ts
import { Router } from 'express';
import postsRoutes from './postsRoutes';

const router = Router();

router.use('/posts', postsRoutes);

export default router;
```

Le concept de _barrel export_ consiste à regrouper et exporter des modules à partir d'un seul fichier, facilitant l'importation de plusieurs modules à partir d'un seul chemin. Dans cet exemple, nous exportons toutes les routes définies pour les `posts` à partir d'un seul fichier. Ainsi, dans d'autres parties de l'application, nous pouvons importer toutes les routes pour les `posts` en utilisant un seul import.

### Étape 4 : Intégrer les routes dans l'Application

Dans `src/app.ts`, importez le routeur que vous venez de définir et utilisez-le dans votre application Express.

```typescript
// src/app.ts
import express from 'express';
import routes from './infrastructure/web/routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
```

Dans cet exemple, toutes les routes définies pour les `posts` seront accessibles à partir de l'URL `/posts`. Par exemple, pour récupérer tous les posts, vous pouvez envoyer une requête GET à `http://localhost:3000/posts`.

## Conclusion

Vous avez maintenant une base solide pour le routage dans une application Express en utilisant TypeScript et ES Modules. Cette configuration vous permet de structurer clairement votre code, de profiter du typage fort de TypeScript et de la modularité offerte par les ES Modules. Les routes sont définies de manière expressive et maintenable, facilitant la gestion des différentes opérations CRUD pour votre application. En séparant vos routes dans différents fichiers et en les regroupant par ressources ou fonctionnalités, vous rendez votre application plus organisée et facile à étendre.
