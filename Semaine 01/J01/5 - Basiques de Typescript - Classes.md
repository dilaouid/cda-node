# **Basiques de TypeScript - Classes**

## **1. Introduction**

Les classes sont au cœur de la programmation orientée objet. Elles permettent de définir des schémas pour les objets et contiennent des fonctions qui définissent les comportements de ces objets. TypeScript, tout en étant basé sur le JavaScript moderne (ES6+), ajoute des fonctionnalités supplémentaires pour travailler avec des classes.

## **2. Définir une classe**

La définition d'une classe en TypeScript est similaire à celle d'autres langages orientés objet.

```ts
class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

## **3. Héritage**

L'héritage est un mécanisme qui permet de créer une nouvelle classe à partir d'une classe existante.

```ts
class Animal {
    move(distance: number = 0) {
        console.log(`Animal moved ${distance}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
```

## **4. Modificateurs d'accès**

TypeScript supporte les modificateurs d'accès `public` (par défaut), `private` et `protected` sur les membres de la classe.

```ts
class Animal {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }
}

let a = new Animal("Cat");
// Error: 'name' est privé et n'est accessible que dans la classe 'Animal'.
// console.log(a.name);
```

Petit rappel sur les modificateurs d'accès :

- `public` : accessible partout
- `private` : accessible uniquement dans la classe
- `protected` : accessible dans la classe et ses sous-classes

## **5. Propriétés en lecture seule**

Les propriétés `readonly` doivent être initialisées lors de leur déclaration ou dans le constructeur.

```ts
class Octopus {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

## **6. Paramètres de propriété dans le constructeur**

TypeScript offre une syntaxe plus courte pour créer et initialiser des membres d'une classe: les paramètres de propriété.

```ts
class Octopus {
    constructor(readonly name: string) {}
}
```

## **7. Accessors (getters et setters)**

TypeScript supporte les accesseurs `get` et `set` pour accéder aux propriétés d'un objet.

```ts
class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        this._fullName = newName;
    }
}
```

## **8. Classes statiques**

Les membres d'une classe marqués `static` sont visibles sur la classe elle-même plutôt que sur les instances.

```ts
class Grid {
    static origin = { x: 0, y: 0 };

    calculateDistanceFromOrigin(point: { x: number; y: number }) {
        let xDist = point.x - Grid.origin.x;
        let yDist = point.y - Grid.origin.y;
        return Math.sqrt(xDist * xDist + yDist * yDist);
    }
}
```

Une classe statique ne peut pas être instanciée ou dérivée, c'est à dire qu'elle ne peut pas être utilisée comme type.

```ts
let grid = new Grid(); // Error: 'Grid' only refers to a type, but is being used as a value here.
```

Du coup, les membres statiques sont appelés en utilisant le nom de la classe.

```ts
let distance = Grid.origin; // OK
```

## **9. Conclusion**

Les classes en TypeScript fournissent des fonctionnalités pour créer et utiliser des objets. Avec le soutien de la typification statique et des caractéristiques de la programmation orientée objet, les classes TypeScript rendent le code plus lisible, réutilisable et facile à maintenir.
