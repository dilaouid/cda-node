# Rappel sur l'Authentification et JWT avec les Cookies

## Brève Révision de JWT

### Qu'est-ce que JWT?

Le [JWT (JSON Web Token)](https://jwt.io/) est un standard ([RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)) permettant d'échanger des informations de manière sécurisée entre deux parties via un objet JSON. Ces informations peuvent être authentifiées et vérifiées grâce à une signature numérique. JWT est souvent utilisé pour l'authentification et l'échange d'informations entre un client et un serveur.

### Pourquoi Utiliser JWT?

- **Simplicité et flexibilité** : Permet l'échange sécurisé d'informations sous forme compacte.
- **Sécurité** : La signature assure l'intégrité des données échangées.
- **Sans état** : Idéal pour les architectures distribuées ou microservices, où chaque requête doit être auto-suffisante.

### Quand Utiliser JWT?

- **Authentification** : Après la connexion, le serveur génère un JWT renvoyé au client, qui l'utilisera pour les requêtes suivantes.
- **Autorisation** : Le JWT permet de vérifier si l'utilisateur a le droit d'accéder à certaines ressources.
- **Échange d'informations** : Idéal pour transmettre des données entre clients et serveurs de manière sécurisée.

## Flux d'authentification JWT avec les cookies

### Configuration de base

Pour commencer, assurez-vous d'avoir configuré `cookie-parser` dans votre application Express pour gérer facilement les cookies.

```bash
npm install cookie-parser
```

Ajoutez `cookie-parser` à votre application :

```ts
// src/app.ts
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
```

### Login et génération du JWT

Lors de l'authentification, au lieu de renvoyer le JWT dans le corps de la réponse, insérez-le dans un cookie HttpOnly. Cela augmente la sécurité en empêchant l'accès au token via JavaScript côté client.

```ts
// src/infrastucture/web/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { loadEnvConfig } from '../../config/env';

const { JWT_SECRET, NODE_ENV } = loadEnvConfig();

export const login = async (req: Request, res: Response) => {

  // ... ici, insérez votre logique d'authentification pour vérifier les informations d'identification, user sera l'utilisateur authentifié

  // Génération du JWT, ici nous utilisons l'ID de l'utilisateur comme payload, et un secret pour la signature du token. Le token expire après 1 heure.
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  // Ici on stocke le JWT dans un cookie HttpOnly
  // le premier argument est le nom du cookie
  // le deuxième argument est la valeur du cookie
  // le troisième argument est la configuration du cookie
  // ici, secure: true signifie que le cookie ne sera envoyé que sur HTTPS
  // sameSite: 'strict' protège contre les attaques CSRF
  // httpOnly: true empêche l'accès au cookie via JavaScript
  // secure et sameSite sont recommandés en production , mais peuvent être désactivés pour le développement
  res.cookie('token', token, { secure: NODE_ENV === 'production', sameSite: 'strict', httpOnly: true });
  res.status(200).send('Successfully logged in.');
};
```

### Validation du JWT depuis le cookie

Pour chaque requête nécessitant une authentification, lisez le JWT depuis le cookie plutôt que de l'en-tête Authorization.

```ts
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).send('Token missing.');
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Invalid token.');
  }
};
```

### Sécurisation des cookies

En production, assurez-vous que vos cookies sont configurés avec `secure: true` pour n'envoyer le cookie que sur HTTPS, et utilisez `sameSite: 'strict'` pour une protection accrue contre les attaques CSRF.

## Avantages de l'utilisation des cookies pour JWT

Utiliser des cookies HttpOnly pour stocker le JWT offre une couche supplémentaire de sécurité en protégeant le token contre les attaques XSS. Cette approche combine la sécurité robuste de JWT avec les avantages de protection des cookies, offrant une méthode d'authentification efficace et sécurisée pour les applications web modernes.

## Conclusion

L'intégration de JWT dans les cookies pour la gestion de l'authentification renforce la sécurité de votre application Express. Cette méthode permet une gestion sûre et efficace des sessions utilisateur, tout en tirant parti de la simplicité et de la flexibilité des JWT pour l'authentification et l'autorisation. En suivant les meilleures pratiques pour la sécurisation des cookies, vous pouvez créer une application robuste et sécurisée.
