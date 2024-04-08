# Pourquoi TypeScript?

## **1. Qu'est-ce que TypeScript?**

TypeScript est un sur-ensemble typé de JavaScript développé par Microsoft. Il offre les mêmes fonctionnalités que JavaScript, tout en ajoutant une couche d'annotations de type facultatives.

```ts
let name: string = "John";
```

## **2. TypeScript et ES6 (ES2015) et au-delà**

- TypeScript comprend toutes les nouvelles fonctionnalités de ES6 et des versions ultérieures. Cela signifie que vous pouvez écrire du code moderne tout en étant sûr que ce code sera transcompilé en JavaScript plus ancien pour une meilleure compatibilité avec les navigateurs.

**Exemple avec ES6**:

```ts
let list: number[] = [1, 2, 3];
for (let value of list) {
    console.log(value);
}
```

## **3. La transcompilation**

- TypeScript est transcompilé en JavaScript. Cela signifie que le code TypeScript est transformé en JavaScript standard qui peut être exécuté dans n'importe quel navigateur ou environnement JavaScript.
  
  - Utilité pour le support des anciens navigateurs.
  - Possibilité de cibler différentes versions de ECMAScript lors de la compilation.
  - Possibilité d'utiliser des fonctionnalités JavaScript expérimentales (ESNext) en toute sécurité.

Lorsque le code TypeScript suivant, qui utilise une boucle `for...of`, est transcompilé en JavaScript ES5 :

```ts
let list: number[] = [1, 2, 3];
for (let value of list) {
    console.log(value);
}
```

Est transcompilé en JavaScript ES5:

```js
var list = [1, 2, 3];
for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
    var value = list_1[_i];
    console.log(value);
}
```

A savoir, que le symbole `_i` est utilisé pour éviter les collisions de noms de variables. C'est une pratique courante en JavaScript, et TypeScript l'applique automatiquement lors de la transcompilation pour la majorité des cas.

## **4. La nécessité de la sûreté des types**

- Les erreurs liées aux types sont courantes dans les grands projets JavaScript. TypeScript permet d'attraper ces erreurs à la compilation plutôt qu'à l'exécution.

**Exemple JavaScript**:

```js
function greet(person) {
    return "Bonjour, " + person.firstName + " " + person.lastName;
}

let user = {
    firstName: "Jean",
    lasttName: "Dupont"  // Notez la faute de frappe!
};

console.log(greet(user)); // Affiche "Bonjour, Jean undefined"
```

**Contre-Exemple TypeScript**:

```ts
interface Person {
    firstName: string;
    lastName: string;
}

function greet(person: Person) {
    return "Bonjour, " + person.firstName + " " + person.lastName;
}

let user = {
    firstName: "Jean",
    lasttName: "Dupont" // TypeScript signalera une erreur ici.
};

console.log(greet(user));
```

## **5. L'importance pour les grands projets**

- Pour un framework robuste conçue pour les applications de grande envergure. La complexité des projets nécessite une vérification de type pour garantir la qualité du code.
- TypeScript est un choix naturel pour les grosses codebases car il offre une vérification de type statique et une meilleure intégration avec les outils.

## **6. Autocomplétion et outils de développement**

- TypeScript offre une meilleure autocomplétion, navigation dans le code et refactoring grâce aux informations de type. C'est particulièrement utile dans les IDE tels que Visual Studio Code.
- TypeScript offre une meilleure intégration avec les outils de développement tels que les linters, les testeurs et les outils de build.
