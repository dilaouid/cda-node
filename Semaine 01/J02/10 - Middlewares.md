# Middleware dans Express

## Introduction aux Middlewares

Les middlewares sont des fonctions qui ont accès aux objets de requête (`req`), de réponse (`res`), et à la fonction `next` dans le cycle de requête-réponse de l'application Express. Ils peuvent exécuter n'importe quel code, effectuer des modifications sur les objets de requête et de réponse, terminer le cycle de requête-réponse, ou appeler la fonction `next` pour passer le contrôle au middleware suivant.

### Utilisation de Middleware

Les middlewares sont au cœur d'Express, offrant une méthode flexible pour effectuer diverses tâches, telles que :

- **Analyser les corps de requête** (body parsing)
- **Logger des informations** sur les requêtes
- **Authentifier des utilisateurs**
- **Gérer les CORS** (Cross-Origin Resource Sharing)

Ils sont exécutés dans l'ordre où ils sont ajoutés à l'application. Par exemple:

```ts
router.get('/users', middleware1, middleware2, (req, res) => {
  // Gestion de la route
});
```

Ici, `middleware1` sera exécuté en premier, suivi de `middleware2`, puis de la gestion de la route elle-même.

Une autre utilisation possible, est d'ajouter un middleware à toutes les routes de l'application :

```ts
app.use(middleware);
```

Cela appliquera le middleware à **toutes les requêtes entrantes**, avant qu'elles n'atteignent les routes spécifiques.

### Création de Middleware personnalisé

La création d'un middleware personnalisé offre la possibilité d'ajouter des fonctionnalités spécifiques à vos besoins. Par exemple, un middleware simple pour logger le chemin et la méthode de chaque requête :

```ts
import { Request, Response, NextFunction } from 'express';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next(); // Passe au middleware/route suivant
};
```

Pour l'utiliser dans votre application :

```ts
import express from 'express';
import { requestLogger } from './middlewares/requestLogger';

const app = express();
app.use(requestLogger); // Applique le middleware à toutes les requêtes
```

### Middleware pour la Gestion des Erreurs

Les middlewares d'erreur sont définis de la même manière que les autres middlewares, à l'exception qu'ils prennent quatre arguments au lieu de trois. Le premier argument est l'erreur :

```ts
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};
```

Pour l'utiliser, ajoutez-le **à la fin de tous les middlewares et routes**, ce middleware capturera toutes les erreurs non gérées dans votre application :

```ts
app.use(errorHandler); // Capturer toutes les erreurs
```

Comment ca marche ? Lorsqu'un middleware appelle `next` avec un argument (par exemple, `next(err)`), Express saute tous les middlewares normaux et passe directement aux middlewares d'erreur. Cela permet de capturer et de gérer les erreurs de manière centralisée.

Exemple de cas où `errorHandler` est appelé :

```ts
app.get('/error', (req, res, next) => {
  const err = new Error('Erreur déclenchée !');
  next(err); // Passe l'erreur à l'errorHandler
});
```

### Utilisation de Middleware Tiers

Express possède un écosystème riche de middlewares tiers pour étendre ses fonctionnalités. Par exemple, `body-parser` était un middleware tiers populaire pour analyser les corps de requête, bien qu'il soit maintenant intégré nativement à Express (du coup, plus besoin de l'installer séparément, oubliez les vieux tutos youtube qui en parlent).

Pour utiliser un middleware tiers, vous devez d'abord l'installer via npm, puis l'ajouter à votre application. Par exemple, pour utiliser `helmet` pour sécuriser vos en-têtes HTTP :

```bash
npm install helmet
```

Puis, dans votre application :

```ts
import helmet from 'helmet';

app.use(helmet()); // Ajoute divers en-têtes de sécurité
```

### Conclusion

Les middlewares offrent une puissante méthode pour ajouter des fonctionnalités à votre application Express. En les utilisant judicieusement, vous pouvez non seulement enrichir votre application avec des fonctionnalités essentielles telles que l'analyse des corps de requête, la journalisation, et l'authentification mais aussi améliorer la sécurité et la gestion des erreurs de votre application. Les middlewares tiers étendent encore ces possibilités, vous permettant de construire des applications robustes et sécurisées avec moins d'effort.
