# **Comment TypeScript améliore-t-il JavaScript?**

## **1. Introduction**

Tout en restant un sur-ensemble de JavaScript, TypeScript introduit un certain nombre de caractéristiques qui le rendent plus robuste, lisible et sûr. Dans ce chapitre, nous explorerons ces améliorations et comment elles peuvent améliorer votre expérience de développement.

## **2. Sûreté de type**

- **JavaScript est dynamiquement typé** : Le type d'une variable est déterminé à l'exécution.

```js
let value = "Hello";
value = 123; // Pas d'erreur ici
```

Le typage dynamique, ou automatique est couramment appelé "duck typing" (typage canard) en référence à l'expression "Si je vois un oiseau qui vole comme un canard, cancane comme un canard, et nage comme un canard, alors j'appelle cet oiseau un canard". On parle aussi d'inférence de type (type inference).

- **TypeScript introduit le typage statique** : Le type d'une variable est déterminé à la compilation.

```ts
let value: string = "Hello";
value = 123; // Erreur: Type 'number' is not assignable to type 'string'.
```

Cette sûreté de type permet de détecter de nombreuses erreurs courantes à un stade précoce du développement. Cela permet également d'améliorer la lisibilité du code, car les types sont documentés et peuvent être utilisés par les outils de développement.

### **3. Interfaces**

Les interfaces permettent de définir la structure d'un objet, fournissant ainsi une manière de garantir que l'objet respecte une certaine forme.

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
    lastName: "Dupont"
};

console.log(greet(user)); // Fonctionne parfaitement
```

La principale différence entre les interfaces et les classes en TypeScript est que les interfaces n'ont pas de représentation à l'exécution en JavaScript. Elles sont purement utilisées par le compilateur TypeScript pour vérifier la structure des objets lors de la phase de compilation. En revanche, les classes sont transcompilées en JavaScript et existent à l'exécution. Pour résumer :

- Les interfaces sont purement utilisées par le compilateur TypeScript pour vérifier la structure des objets lors de la phase de compilation.
- Les classes sont transcompilées en JavaScript et existent à l'exécution.
- Les interfaces ne peuvent pas être instanciées directement, mais peuvent être implémentées par des classes.

Imaginez que vous construisez une maison. Avant de commencer, vous avez besoin d'un plan ou d'un dessin qui montre à quoi ressemblera la maison une fois terminée. Ce plan est comme une "interface" en TypeScript. Il définit la structure et l'apparence de la maison, mais ce n'est pas quelque chose que vous pouvez réellement habiter. C'est juste un guide pour la construction. En TypeScript, une "interface" sert de guide pour montrer comment un objet doit être structuré.

Maintenant, une fois que vous avez le plan, vous pouvez construire la maison réelle en utilisant des briques, du ciment, du bois, etc. Cette maison construite est comme une "classe" en TypeScript. Contrairement au simple plan, vous pouvez réellement entrer dans cette maison, l'habiter et l'utiliser. En TypeScript, une "classe" est comme une version concrète d'une interface que vous pouvez "utiliser" dans votre programme.

Lorsque vous utilisez TypeScript pour écrire votre code, il s'assure que votre "maison" (classe) est construite selon le "plan" (interface). C'est ce qu'on appelle la vérification de type. Mais une fois que vous êtes prêt à utiliser votre programme dans le monde réel, TypeScript convertit tout cela en JavaScript, qui est un langage que les navigateurs web comprennent. Lors de cette conversion, le "plan" (interface) disparaît car il a déjà servi son objectif. Seule la "maison" (classe) reste et est convertie en JavaScript pour être utilisée.

Imaginons que dans le processus de planification de votre maison, vous ayez non seulement le plan général (l'interface) mais aussi des spécifications détaillées pour certaines parties de la maison. Par exemple, vous pourriez avoir une spécification pour une "porte" qui détaille la hauteur, la largeur, le type de bois utilisé, etc. Cette spécification est comme un "type" en TypeScript.

Le "type" est un moyen de définir précisément ce que quelque chose doit être. En reprenant l'exemple de la porte, si la spécification (type) dit que la porte doit mesurer 2 mètres de hauteur, alors elle doit absolument mesurer 2 mètres, ni plus, ni moins.

Dans le monde du code, un "type" peut définir des choses comme : "Ceci doit être un nombre" ou "Ceci doit être une chaîne de caractères".

Pour résumer :

- L'**interface** est comme un plan pour construire quelque chose. Elle détermine la structure, mais n'existe pas réellement.
- La **classe** est comme la maison réelle que vous construisez à partir du plan. Elle est concrète et utilisable.
- Le **type** est comme une spécification détaillée pour certaines parties de la maison, définissant exactement comment elles doivent être.
- TypeScript s'assure que votre "maison" est construite correctement selon le "plan", puis convertit tout cela en JavaScript pour être utilisé dans les navigateurs web.

Quant aux types et aux interfaces, ils servent tous deux à définir des structures d'objets en TypeScript, mais avec quelques différences clés. Les interfaces peuvent être étendues avec le mot-clé `extends`, tandis que les types, bien qu'ils ne puissent pas être "étendus" de la même manière, peuvent être combinés à l'aide de l'opération d'intersection de types avec le symbole `&`.

Par exemple, nous pouvons étendre l'interface `Person` pour créer une interface `Employee` :

```ts
interface Employee extends Person {
    salary: number;
}

let employee = {
    firstName: "Jean",
    lastName: "Dupont",
    salary: 50000
};

console.log(greet(employee)); // Fonctionne parfaitement
```

Pour les types, nous pouvons combiner plusieurs types à l'aide de l'opération d'intersection :

```ts
type EmployeeType = Person & { salary: number };
```

Il est important de noter que le symbole `&` est utilisé pour les types d'intersection, et non pour les types union. Un type d'intersection combine plusieurs types en un seul, obligeant la structure à respecter tous les types combinés.

### **4. Classes et héritage**

Bien que ES6 ait introduit des classes, TypeScript les enrichit avec des modificateurs d'accès, des propriétés et des méthodes statiques.

```ts
class Animal {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    move(distance: number) {
        console.log(`${this.name} moved ${distance} meters.`);
    }
}

class Snake extends Animal {
    move() {
        console.log("Slithering...");
        super.move(5);
    }
}
```

### **5. Modules**

On appelle "module" une unité de code réutilisable, qui peut être exportée et importée par d'autres modules. Les modules sont essentiels pour construire des applications à grande échelle, car ils permettent de diviser le code en unités plus petites et plus gérables. Les modules sont également utiles pour éviter les collisions de noms et les dépendances circulaires.

TypeScript offre une manière native de modulariser le code, ce qui est essentiel pour construire des applications à grande échelle.

```ts
// math.ts
export function add(x: number, y: number): number {
    return x + y;
}

// app.ts
import { add } from './math';
console.log(add(2, 3)); // 5
```

### **6. Générics (Types génériques)**

Les génériques permettent de créer des composants réutilisables qui peuvent fonctionner sur une variété de types.

```ts
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("Hello"); // type de sortie est 'string'
let output2 = identity<number>(42); // type de sortie est 'number'
```

Nous reviendrons sur les génériques dans un chapitre ultérieur. Pour l'instant, il suffit de savoir qu'ils permettent de créer des composants réutilisables qui peuvent fonctionner sur une variété de types.

### **7. Enum**

Les enums permettent de définir des ensembles de constantes nommées, rendant le code plus lisible.

```ts
enum Direction {
    Up,
    Down,
    Left,
    Right
}

let move: Direction = Direction.Up;
```

Ce code est transcompilé en JavaScript :

```js
var Direction;

(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
```

On voit que c'est beaucoup plus verbeux en JavaScript. Les enums sont donc un moyen de rendre le code plus lisible.
