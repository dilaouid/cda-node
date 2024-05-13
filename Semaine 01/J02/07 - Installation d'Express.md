# Configuration d'Express avec TypeScript et ES Modules

L'utilisation conjointe d'Express, TypeScript et ES Modules représente une approche moderne et efficace pour le développement d'applications web. Cette configuration non seulement profite du typage statique de TypeScript, mais elle adopte aussi le système de modules standard d'ECMAScript, rendant votre code plus propre, plus modulaire et plus facile à maintenir. Voici comment configurer votre projet pour utiliser cette puissante combinaison.

## Initialisation du projet

Créez et configurez un nouveau projet Node.js avec support TypeScript et ES Modules.

### 1. Création du répertoire de projet

Ouvrez un terminal, créez un répertoire pour votre projet, et naviguez dedans :

```bash
mkdir mon-projet-express-ts
cd mon-projet-express-ts
```

### 2. Initialisation de npm

Générez un `package.json` en exécutant :

```bash
npm init -y
```

### 3. Installation de TypeScript

Installez TypeScript dans votre projet comme une dépendance de développement :

```bash
npm install --save-dev typescript
```

### 4. Configuration de TypeScript pour ES Modules

Créez un `tsconfig.json` pour configurer TypeScript. Utilisez la commande suivante ou créez le fichier manuellement :

```bash
tsc --init
```

Modifiez votre `tsconfig.json` pour activer le support des ES Modules :

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "outDir": "./dist",
    "baseUrl": "./src"
  },
  "include": ["src/**/*"]
}
```

Ici, `esnext` veut simplement dire "la dernière version d'ECMAScript", ce qui inclut les ES Modules.
Le paramètre `moduleResolution` est important pour résoudre les dépendances ES Modules dans Node.js. Le répertoire de sortie `dist` est utilisé pour stocker les fichiers JavaScript compilés.

Dans votre `package.json`, assurez-vous de spécifier que votre projet utilise les ES Modules :

```json
"type": "module",
```

## Installation et configuration d'Express avec TypeScript

### 1. Ajout d'Express et des types associés

Installez Express et les types TypeScript pour Express :

```bash
npm install express
npm install --save-dev @types/express
```

### 2. Mise en place de l'application Express

Créez un dossier `src` pour votre code source TypeScript. À l'intérieur, créez un fichier `app.ts` pour votre serveur Express :

```ts
// src/app.ts
import express, { Request, Response } from 'express';

// Créez une instance de l'application Express
const app = express();

// Définissez le port sur lequel votre serveur va écouter
const PORT = 3000;

// Définissez une route pour la racine, ici, nous renvoyons un simple message lorsqu'on accède à la racine de l'application avec la méthode GET
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World pas piqué des hannetons !');
});

// Faites écouter votre application sur le port spécifié et affichez un message dans la console pour indiquer que le serveur est en cours d'exécution
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
```

En gros, votre architecture de fichiers ressemblera à ceci :

```plaintext
mon-projet-express-ts/
├── node_modules/
├── src/
│   └── app.ts
├── package.json
├── tsconfig.json
```

Cette configuration définit un serveur Express simple qui répond à la racine avec "Hello World pas piqué des hannetons !".

## Compilation et exécution

### Compilation de TypeScript en JavaScript

Avec la configuration de `tsconfig.json`, compilez votre projet TypeScript :

```bash
tsc
```

### Exécution du serveur Express

Pour exécuter votre serveur, vous aurez besoin d'un outil capable de gérer les ES Modules en Node.js. Utilisez `node` directement si votre version supporte les ES Modules, ou utilisez un outil comme `esm` :

```bash
node dist/app.js
```

## Automatisation avec scripts npm

Facilitez le processus de développement en ajoutant des scripts à votre `package.json` :

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/app.js",
  "dev": "nodemon --exec ts-node src/app.ts"
}
```

Pour ces scripts :

- `build` compile votre projet.
- `start` lance votre serveur Express compilé.
- `dev` facilite le développement en redémarrant automatiquement le serveur sur les changements de fichiers. Ce sera sans aucun doute, le script que vous utiliserez le plus souvent. Pour ce script, assurez-vous d'avoir `nodemon` et `ts-node` installés :

```bash
npm install --save-dev nodemon ts-node
```

## Conclusion

Vous avez maintenant configuré un environnement de développement utilisant Express avec TypeScript et ES Modules. Cette configuration offre un équilibre parfait entre la modernité des ES Modules et la robustesse de TypeScript, fournissant une base solide pour construire des applications web expressives et bien structurées.
