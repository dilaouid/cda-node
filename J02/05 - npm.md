# Gestion des paquets avec npm en utilisant TypeScript

Dans cette partie du cours, nous allons plonger dans la gestion des paquets avec npm et mettre en avant l'importance du mode "watch" pour améliorer votre flux de travail lors du développement d'applications Express en TypeScript (on n'a pas passé notre première journée pour des prunes !). Nous couvrirons également la création d'un `package.json` pour gérer les dépendances et les scripts, en mettant l'accent sur les bonnes pratiques pour un projet TypeScript.

## Qu'est-ce que npm ?

**npm**, ou Node Package Manager, est un outil essentiel pour les développeurs Node.js, permettant de partager et de gérer les dépendances (librairies et outils) dans leurs projets. C'est le cœur battant de l'écosystème Node.js, facilitant l'installation, la mise à jour et la gestion des paquets.

## Initialisation de votre projet Node.js avec TypeScript

### Création d'un `package.json`

Avant tout, initialisons notre projet Node.js pour utiliser TypeScript. Ouvrez un terminal à la racine de votre projet et commencez par créer un fichier `package.json` :

```bash
npm init -y
```

Cette commande génère un `package.json` avec des valeurs par défaut, prêt à être personnalisé pour votre projet, comme nous l'avons déjà vu précédemment.

### Installation de TypeScript et des dépendances nécessaires

Pour utiliser TypeScript dans notre projet, installons-le comme une dépendance de développement, ainsi que les types pour Node.js :

```bash
npm install typescript @types/node --save-dev
```

### Configuration de TypeScript

Créez un fichier `tsconfig.json` à la racine de votre projet pour configurer les options du compilateur TypeScript. Vous pouvez en générer un en exécutant la commande suivante :

```bash
tsc --init
```

Voici un exemple de configuration basique :

```json
{
  "compilerOptions": {
    "target": "ESNext", // Version de JavaScript cible
    "module": "ESNext", // Système de modules
    "strict": true, // Activer les contrôles stricts (strict rendra la rigueur de TypeScript plus forte)
    "esModuleInterop": true, // Activer l'interopérabilité des modules ES, ce qui permet d'importer des modules CommonJS
    "skipLibCheck": true, // Ignorer la vérification des fichiers de définition de type
    "forceConsistentCasingInFileNames": true, // Forcer la cohérence de la casse des noms de fichiers
    "outDir": "./dist" // Répertoire de sortie pour les fichiers JavaScript compilés
  },
  "include": ["src/**/*"] // Fichiers à inclure dans la compilation
}
```

Cette configuration indique à TypeScript de compiler les fichiers dans le répertoire `src` et de placer le JavaScript compilé dans le répertoire `dist`.

## Utilisation des scripts npm pour automatiser les tâches

### Le mode "Watch" de TypeScript

Un aspect clé pour améliorer votre efficacité en développement est d'automatiser la compilation de TypeScript en JavaScript. Utilisons le mode "watch" de TypeScript pour compiler automatiquement notre code à chaque modification. Ajoutez le script suivant à votre `package.json` :

```json
"scripts": {
  "watch": "tsc --watch"
}
```

Avec ce script, exécutez `npm run watch` dans votre terminal, et TypeScript recompilera votre code à chaque fois que vous sauvegardez un fichier `.ts`, rendant le processus de développement plus fluide.

### Scripts pour Express en TypeScript

Pour développer une application Express en TypeScript, ajoutons un script pour démarrer notre serveur en utilisant `nodemon` et `ts-node`, qui permettent de relancer automatiquement le serveur à chaque modification du code source.

Tout d'abord, installez `nodemon` et `ts-node` :

```bash
npm install nodemon ts-node --save-dev
```

Ensuite, ajoutez un script de démarrage à votre `package.json` :

```json
"scripts": {
  "start": "nodemon --exec ts-node src/app.ts"
}
```

Ce script utilise `nodemon` pour surveiller les changements dans votre code source et `ts-node` pour exécuter directement les fichiers TypeScript sans avoir besoin de les compiler préalablement en JavaScript.

## Conclusion

Grâce à npm et à quelques configurations astucieuses, vous pouvez significativement accélérer le développement de votre application Express en TypeScript. L'utilisation du mode "watch" de TypeScript et de scripts npm bien pensés pour automatiser la compilation et le redémarrage de votre serveur vous permet de vous concentrer pleinement sur la création de fonctionnalités impressionnantes et intéressantes pour votre application. Ne jamais oublier la DX (Developer Experience) !

En adoptant ces pratiques, vous mettez en place un environnement de développement efficace et agile, prêt à répondre aux exigences d'un projet moderne en TypeScript.
