# 0 - Lancer TypeScript

TypeScript est un langage de programmation open source développé par Microsoft. Il s'agit d'un sur-ensemble de JavaScript, ce qui signifie que tout code JavaScript est également un code TypeScript valide. TypeScript étend JavaScript en ajoutant des types statiques et des fonctionnalités qui ne sont pas encore disponibles dans la version actuelle de JavaScript. Cela permet aux développeurs de détecter des erreurs à un stade précoce et de fournir un outil puissant pour construire des applications de grande envergure.

## Installation de TypeScript

Avant de commencer à utiliser TypeScript, vous devez l'installer sur votre système. La manière la plus courante de le faire est via npm, le gestionnaire de paquets pour Node.js. Assurez-vous d'avoir Node.js et npm installés avant de procéder.

Ouvrez un terminal et tapez la commande suivante pour installer TypeScript globalement :

```bash
npm i -g typescript
```

Cela permet d'utiliser le compilateur TypeScript (`tsc`) dans n'importe quel projet sur votre machine.

## Compilation d'un fichier TypeScript

Une fois TypeScript installé, vous pouvez commencer à écrire du code TypeScript avec l'extension `.ts`. Par exemple, créez un fichier `hello.ts` avec le contenu suivant :

```ts
function greet(person: string): string {
    return "Hello, " + person;
}

const user = "World";
console.log(greet(user));
```

Pour compiler ce fichier TypeScript en JavaScript, utilisez la commande `tsc` dans le terminal :

```bash
tsc hello.ts
```

Cela générera un fichier `hello.js` qui est le résultat de la compilation et qui peut être exécuté dans n'importe quel environnement JavaScript.

## Configuration avec `tsconfig.json`

Pour les projets plus importants, vous voudrez probablement avoir un fichier de configuration `tsconfig.json`. Ce fichier détermine comment le compilateur doit générer le JavaScript à partir de vos fichiers TypeScript.

Pour générer un `tsconfig.json` par défaut, tapez :

```bash
tsc --init
```

Vous pouvez ensuite ouvrir `tsconfig.json` et configurer diverses options, comme la cible de compilation ECMAScript (`"target"`), le dossier de sortie pour vos fichiers JavaScript compilés (`"outDir"`), et bien d'autres.

## Exécution du Code TypeScript

TypeScript est transcompilé en JavaScript, ce qui signifie que vous n'exécutez pas directement le code TypeScript. Après la transcompilation, vous exécutez le code JavaScript généré dans votre environnement de choix (navigateur, Node.js, etc.).

Pour exécuter le fichier JavaScript résultant avec Node.js, tapez :

```bash
node hello.js
```

Vous devriez voir le résultat de votre fonction `greet` s'afficher dans le terminal.
