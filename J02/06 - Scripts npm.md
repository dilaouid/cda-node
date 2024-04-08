# Introduction aux scripts npm pour automatiser les tâches

L'un des aspects les plus puissants de npm, au-delà de la gestion des dépendances, est sa capacité à automatiser des tâches répétitives grâce aux scripts npm. Ces scripts peuvent simplifier de nombreuses opérations courantes de développement, de test, de build et de déploiement, rendant votre workflow plus efficace et moins sujet aux erreurs. Dans cette section, nous allons découvrir comment utiliser les scripts npm pour automatiser les tâches dans le contexte d'un projet Express utilisant TypeScript.

## Qu'est-ce qu'un script npm ?

Un script npm est une commande ou une série de commandes stockées dans le fichier `package.json` de votre projet. npm vous permet d'exécuter ces scripts directement depuis la ligne de commande, en utilisant la syntaxe `npm run <nom-du-script>`. Les scripts peuvent inclure des opérations telles que le démarrage de votre serveur, la compilation de votre code TypeScript, ou l'exécution de tests.

## Définition des scripts dans `package.json`

Les scripts sont définis dans la section `"scripts"` de votre `package.json`. npm inclut déjà quelques scripts par défaut, comme `"start"` et `"test"`, mais vous pouvez définir vos propres scripts personnalisés pour répondre aux besoins spécifiques de votre projet.

### Exemple de scripts basiques

Voici un exemple de comment vous pourriez définir quelques scripts de base dans un projet Express TypeScript :

```json
"scripts": {
  "start": "node dist/app.js",
  "dev": "nodemon --exec ts-node src/app.ts",
  "build": "tsc",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

- **start**: Lance l'application à partir des fichiers JavaScript compilés dans le dossier `dist`.
- **dev**: Utilise `nodemon` et `ts-node` pour redémarrer automatiquement votre serveur durant le développement à chaque fois que vous modifiez un fichier source.
- **build**: Compile votre projet TypeScript en JavaScript, en utilisant les configurations définies dans votre `tsconfig.json`.
- **test**: Un placeholder pour l'exécution de tests. Mercredi, on verra comment écrire des tests et les exécuter, pour l'instant, on se contente de renvoyer une erreur.

### Automatisation avec le Mode Watch de TypeScript

Pour améliorer l'efficacité du développement, nous pouvons également utiliser le mode "watch" de TypeScript pour recompiler automatiquement le code en JavaScript à chaque modification. Ajoutez un script `"watch"` à votre `package.json` :

```json
"scripts": {
  "watch": "tsc --watch"
}
```

En exécutant `npm run watch`, TypeScript "surveillera" les changements dans vos fichiers `.ts` et recompilera le projet automatiquement, vous permettant de voir immédiatement les résultats de vos modifications. Plutôt que de devoir exécuter manuellement `tsc` à chaque fois que vous apportez des changements, le mode "watch" vous permet de rester concentré sur le développement.

## Scripts avancés et composition

Les scripts npm peuvent faire bien plus que lancer des commandes simples. Vous pouvez composer des scripts complexes en les chaînant, en utilisant les opérateurs `&&` pour exécuter les commandes séquentiellement, ou `&` pour les exécuter en parallèle.

### Exemple de script de nettoyage

Supposons que vous voulez nettoyer votre dossier de distribution avant chaque build pour vous assurer que seuls les fichiers les plus récents y soient préservés. Vous pourriez avoir un script comme celui-ci :

```json
"scripts": {
  "clean": "rimraf dist/*",
  "prebuild": "npm run clean",
  "build": "tsc"
}
```

- **clean**: Utilise `rimraf` (un paquet npm qui simule la commande `rm -rf` pour les systèmes d'exploitation qui ne la supportent pas nativement) pour supprimer le contenu du dossier `dist`.
- **prebuild**: `pre` et `post` sont des préfixes spéciaux reconnus par npm. En nommant un script `prebuild`, npm l'exécutera automatiquement avant le script `build`.

## Conclusion

Les scripts npm offrent une méthode puissante et flexible pour automatiser votre workflow de développement. En exploitant pleinement ces scripts, vous pouvez simplifier et accélérer le processus de développement, de test et de déploiement de vos applications Express TypeScript. Commencez petit avec quelques scripts simples, puis développez progressivement votre suite d'outils d'automatisation à mesure que les besoins de votre projet évoluent.
