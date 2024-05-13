# Introduction à l'Architecture Hexagonale dans un Projet Express avec TypeScript

**L'architecture hexagonale**, également connue sous le nom d'[architecture en ports et adaptateurs](https://blog.sciam.fr/2023/10/27/architecture-hexagonale-par-la-pratique-partie1.html), est une méthode de conception logicielle qui vise à rendre les applications fortement maintenables et évolutives en séparant clairement la logique métier des détails techniques comme l'interface utilisateur, les bases de données.

On se concentre sur la séparation de la logique métier (le cœur de l'application) des aspects techniques comme l'interface utilisateur, la base de données, les notifications, etc. Cette séparation est réalisée en définissant des "ports" pour les fonctionnalités extérieures qui interagissent avec l'application et en utilisant des "adaptateurs" pour implémenter ces ports.

Cette architecture est particulièrement pertinente dans le développement d'applications web modernes, où la [séparation des préoccupations](https://www.bisoftlab.com/non-classe/separation-concerns-plus-loin-que-le-mvc-utilisation-de-managers-dentite/) est cruciale pour la gestion de la complexité.

## Contextualisation de l'Architecture Hexagonale

### Pourquoi l'Architecture Hexagonale?

L'architecture hexagonale répond à plusieurs défis critiques dans le développement logiciel :

- **Couplage et cohésion :** Réduire le couplage entre la logique métier et l'infrastructure tout en maintenant une forte cohésion au sein de la logique métier elle-même.
- **Maintenabilité :** Simplifier les mises à jour et les modifications de la logique métier ou des technologies d'infrastructure sans affecter l'autre partie.
- **Testabilité :** Faciliter le test de la logique métier de manière isolée, sans dépendance sur des éléments externes comme les bases de données.

### Résolution de problèmes

L'architecture hexagonale aborde directement la problématique de l'intégration et de l'évolution des systèmes informatiques. En séparant clairement la logique métier des préoccupations extérieures, elle permet aux développeurs d'implémenter, de tester et de modifier l'une sans perturber l'autre, facilitant ainsi l'évolution continue et l'intégration de nouvelles technologies ou fonctionnalités.

## La Logique métier

La logique métier représente les règles, les calculs, et les algorithmes spécifiques à un domaine ou à une entreprise. C'est le cœur d'une application, distinct des aspects techniques comme la présentation à l'utilisateur ou le stockage des données.

### Exemples concrets

Prenons l'exemple d'un blog simple, où la logique métier pourrait inclure des règles pour la création de posts, la récupération des posts par ID, ou la gestion des commentaires. Ces règles sont spécifiques au domaine du blog et restent constantes, quel que soit le moyen utilisé par le client pour accéder aux services (web, mobile, API) ou la manière dont les données sont stockées.

## Ports et Adaptateurs

### Fonctionnement

Dans l'architecture hexagonale, les **ports** servent d'interfaces entre la logique métier et le monde extérieur. Les **adaptateurs** sont des implémentations spécifiques de ces ports, permettant la communication avec des éléments externes comme des bases de données, des services web, ou des interfaces utilisateur.

### Exemples de code

Imaginons un port pour accéder aux données des utilisateurs. Le port définit une interface `UserRepository` avec des méthodes comme `findUserById` ou `saveUser`. Les adaptateurs pourraient inclure une implémentation `SQLUserRepository` pour une base de données SQL et une autre `InMemoryUserRepository` pour des tests ou des démonstrations.

```typescript
interface UserRepository {
  findUserById(id: string): User;
  saveUser(user: User): void;
}

class SQLUserRepository implements UserRepository {
  // Implémentation spécifique à SQL
}

class InMemoryUserRepository implements UserRepository {
  // Implémentation utilisant une collection en mémoire
}
```

Dans cette section, nous allons explorer comment structurer un projet Express avec TypeScript en utilisant l'architecture hexagonale. Nous détaillerons l'intérêt de chaque dossier et fichier dans le contexte de cette architecture, en commençant par une vue d'ensemble des principaux composants.

## Structure de projet proposée

La structure de projet que vous voyez est soigneusement conçue pour adhérer aux principes de l'architecture hexagonale. Chaque dossier et fichier a un rôle spécifique, contribuant à la séparation des préoccupations et à la facilité de maintenance.

### `src/config/`

Ce dossier joue un rôle crucial en regroupant toutes les configurations nécessaires à votre application. Ces configurations peuvent varier en fonction de l'environnement d'exécution (développement, test, production) et inclure des informations comme les chaînes de connexion à la base de données, les clés API, ou encore les configurations de port.

- `env.ts`: Centralise la gestion des variables d'environnement, facilitant leur accès à travers l'application.

### `src/infrastructure/`

Le dossier `infrastructure` regroupe tous les détails techniques qui supportent votre logique métier, comme la persistance des données, la communication réseau, etc.

- `web/routes/`: Les routes agissent comme des adaptateurs entrants, en dirigeant les requêtes HTTP vers les actions appropriées dans la couche domaine. Elles définissent l'interface par laquelle les utilisateurs ou les systèmes externes interagissent avec votre application. Vous aurez un fichier par ressource ou entité, par exemple `postsRoutes.ts`, `usersRoutes.ts`, etc. Ces routes utilisent les contrôleurs pour traiter les requêtes.

Par exemple, une route pour les posts pourrait ressembler à ceci :

```ts
// src/infrastructure/web/routes/postsRoutes.ts
import express from 'express';
import { PostsController } from '../controllers/PostsController';

const router = express.Router();
const postsController = new PostsController();

router.get('/', postsController.getAllPosts);
router.post('/', postsController.createPost);
router.get('/:id', postsController.getPostById);

export default router;
```

Et, en utilisant le _Barrel Pattern_, on exporte toutes les routes dans un fichier `index.ts` :

```ts
// src/infrastructure/web/routes/index.ts
import express from 'express';
import postsRoutes from './postsRoutes';

const router = express.Router();

router.use('/posts', postsRoutes);

export default router;
```

- `web/controllers/`: Les contrôleurs prennent en charge la logique de traitement des requêtes HTTP. Ils valident les données entrantes, appellent les services du domaine pour exécuter la logique métier, et préparent les réponses HTTP. Les controllers feront souvent appel aux services du domaine pour effectuer des opérations métier. Voici un exemple de contrôleur pour les posts :

```ts
// src/infrastructure/web/controllers/PostsController.ts
import { Request, Response } from 'express';
import { PostsService } from '../../domain/services/PostsService';

class PostsController {
  constructor(private postsService: PostsService) {}

  async getAllPosts(req: Request, res: Response) {
    // Appeler le service pour récupérer tous les posts
  }

  async createPost(req: Request, res: Response) {
    // Valider les données du post
    // Appeler le service pour créer un post
  }

  async getPostById(req: Request, res: Response) {
    // Récupérer l'ID du post depuis la requête
    // Appeler le service pour récupérer le post par ID
  }
}
```

- `data/`: Ce répertoire peut contenir des données statiques ou des fichiers de configuration pour les sources de données de l'application. Durant cette semaine, nous allons utiliser des fichiers JSON pour stocker des données mock. Dans un projet réel, ces données pourraient provenir d'une base de données ou d'un service externe, et les adaptateurs correspondants seraient implémentés ici.

- `repositories/`: Implémente des interfaces définies dans le domaine pour la manipulation des données (CRUD), en utilisant des détails techniques spécifiques comme une base de données ou un stockage externe. Les repositories implémentent l'accès aux données pour les entités de votre domaine, en utilisant les mécanismes de stockage sous-jacents comme les bases de données ou les systèmes de fichiers dans notre cas, car nous utilisons des fichiers JSON pour stocker les données.

Par exemple, un repository pour les posts pourrait ressembler à ceci :

```ts
// src/infrastructure/repositories/PostsRepository.ts
import { IPostEntity } from '../../domain/entities/IPostEntity';

export class PostsRepository {
  async savePost(postData: IPostEntity) {
    // Sauvegarder le post dans la source de données
  }

  async getPostById(id: string) {
    // Récupérer le post par ID depuis la source de données
  }
}
```

Dans cet exemple, le repository `PostsRepository` implémente l'interface `IPostsRepository` définie dans le domaine, en fournissant des méthodes pour sauvegarder et récupérer des posts. Les détails de stockage, comme l'utilisation d'une base de données ou d'un fichier, sont encapsulés dans ce repository.

Nous avons une méthode `savePost` pour sauvegarder un post, qui pourrait implémenter la logique de stockage des données dans une base de données ou un fichier. De même, la méthode `getPostById` récupère un post en utilisant le repository.

### `src/domain/`

Le cœur de l'architecture hexagonale. Ce dossier contient la logique métier de votre application, qui doit rester indépendante des frameworks et des détails techniques de mise en œuvre. Les entités et les services de domaine sont les principaux composants de ce dossier.

- `entities/`: Les entités représentent les concepts ou les objets de votre domaine d'application. Elles encapsulent la logique métier et les données associées. Par exemple, une entité Post pour un blog contiendrait des propriétés comme le titre, le contenu, l'auteur, et des méthodes pour manipuler ces données. Pour le moment, imaginons une entité `Post` simple comme une interface TypeScript :

```ts
// src/domain/entities/IPostEntity.ts
export interface IPostEntity {
  id: string;
  title: string;
  content: string;
  ...
}
```

- `services/`: Définit les services ou cas d'utilisation qui opèrent sur vos entités, encapsulant la logique métier (ex. `PostsService.ts`, `UsersService.ts`). Ces services sont les points d'entrée pour les fonctionnalités de votre application, c'est ici que la logique métier est implémentée en utilisant les entités et autres dépendances. Idéalement, les services ne devraient pas dépendre des détails techniques de l'infrastructure, et peuvent être testés de manière isolée. Un exemple de service de post pourrait ressembler à ceci :

```ts
// src/domain/services/PostsService.ts
import { PostsRepository } from '../repositories/PostsRepository';

class PostsService {
  constructor(private repo: PostsRepository) {}

  async createPost(postData) {
    // Valider les données du post
    // Appeler le repository pour sauvegarder le post
  }

  async getPostById(id: string) {
    // Appeler le repository pour récupérer le post
  }
}
```

Ici, le service `PostsService` utilise un repository pour accéder aux données des posts, en encapsulant la logique métier associée à la création et à la récupération des posts. On peut voir que le service ne se soucie pas de la manière dont les données sont stockées, il délègue cette responsabilité au repository.

On a une méthode `createPost` pour créer un post, qui pourrait valider les données et appeler le repository pour sauvegarder le post. De même, la méthode `getPostById` récupère un post en utilisant le repository.

### `src/middlewares/`

Contient les middlewares Express qui sont utilisés pour traiter les requêtes avant qu'elles n'atteignent vos routes ou après qu'elles en soient sorties, comme l'authentification, la journalisation, etc.
Les middlewares dans Express sont des fonctions qui ont accès à l'objet de requête, à l'objet de réponse, et à la fonction de middleware suivante dans le cycle de requête-réponse. Ils peuvent exécuter du code, effectuer des changements aux requêtes et aux réponses, et terminer le cycle de requête-réponse.

En gros, les middlewares sont des fonctions qui s'exécutent avant ou après le traitement des routes. Elles peuvent être utilisées pour effectuer des tâches communes à plusieurs routes, comme l'authentification, la journalisation, la validation des données, etc.

- `authMiddleware.ts`: Un middleware d'authentification peut vérifier les jetons d'accès, autoriser les utilisateurs, et protéger les routes nécessitant une authentification.

## Utilisation des Middlewares

Les middlewares dans l'architecture hexagonale peuvent être vus comme des adaptateurs entrants ou sortants, selon qu'ils traitent les requêtes entrantes ou préparent les réponses sortantes.

### Rôle des Middlewares

Un middleware d'authentification vérifie, par exemple, les jetons JWT des requêtes entrantes, agissant comme un adaptateur entrant. Un autre middleware pourrait formater les réponses sortantes en JSON, fonctionnant ainsi comme un adaptateur sortant.

### En Lien avec Ports et Adaptateurs

Les middlewares, tout en étant une caractéristique clé d'Express, s'intègrent parfaitement dans l'architecture hexagonale, offrant une manière standardisée de traiter les interactions entrantes et sortantes à travers des ports définis.

En résumé, l'architecture hexagonale est une puissante méthode de conception qui favorise la modularité, la flexibilité, et la testabilité d'une application. En comprenant et en appliquant ses principes, les développeurs peuvent construire des systèmes robustes capables de s'adapter et d'évoluer avec les besoins de l'entreprise.

### `src/types/`

Ce dossier peut contenir des définitions de types TypeScript personnalisés pour améliorer le typage dans votre projet.

- `customRequest.ts`: Définit des types personnalisés pour les requêtes Express, par exemple, en étendant l'objet de requête pour inclure des données d'authentification.
- `envConfig.ts`: Types pour les configurations chargées depuis `src/config/`.

### `src/utils/`

Ce dossier contient des fonctions utilitaires qui peuvent être utilisées dans plusieurs parties de l'application, réduisant ainsi la duplication de code. Grossièrement, les utilitaires sont des fonctions qui effectuent des tâches spécifiques et réutilisables, comme la validation des données, le formatage des dates, etc.

Bien entendu, évitez d'ajouter des fonctions utilitaires qui ne sont pas réellement réutilisées, car cela peut entraîner une surcharge inutile de votre code, ce n'est pas un dossier fourre-tout pour les fonctions non liées !

- `helper.ts`: Fonctions helpers réutilisables pour différentes tâches dans votre application.

### `src/tests/`

Organise les tests de votre application, séparant les tests d'intégration et les tests unitaires pour une couverture de test complète.

Les tests sont essentiels pour garantir la qualité et la fiabilité de votre application. Ce dossier est structuré pour séparer les tests d'intégration, qui testent les composants de l'application en interaction, des tests unitaires, qui testent les composants de manière isolée.

- `integration/` et `unit/`: Contiennent respectivement les tests d'intégration et les tests unitaires pour vos routes, services et autres composants de l'application.
- `mocks/`: Fournit des données mock et des implémentations pour les tests, aidant à isoler les tests des dépendances externes.

### `src/app.ts`

Le fichier principal de votre application Express qui configure le serveur, intègre tous les composants et lance l'application.

## Conclusion

Adopter l'architecture hexagonale dans un projet Express avec TypeScript offre une structure claire, favorisant la séparation des préoccupations et la maintenabilité. Cette approche permet à la logique métier de rester isolée des détails techniques, rendant l'application plus flexible et plus facile à tester. En suivant cette structure et en comprenant le rôle de chaque composant, vous serez bien équipé pour construire des applications web robustes et évolutives.
