# **Basiques de TypeScript - Interfaces**

## **1. Introduction**

Dans le développement logiciel, une interface est un contrat ou une spécification qui décrit les opérations que quelque chose peut faire, sans pour autant définir comment ces opérations sont réalisées. TypeScript utilise des interfaces pour définir la structure des objets, ce qui rend le code plus lisible et offre une assurance sur la forme que les objets doivent respecter.

## **2. Comment définir une interface**

Définir une interface est simple. Il suffit d'utiliser le mot-clé `interface`.

```ts
interface LabelledValue {
    label: string;
}
```

## **3. Utilisation d'une interface pour décrire un objet**

Une fois définie, vous pouvez utiliser l'interface pour décrire la forme d'un objet.

```ts
function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Taille 10 Object"};
printLabel(myObj);
```

Même si l'objet `myObj` a plus de propriétés que ce qui est défini dans l'interface, il est compatible car il contient au moins la propriété `label` de type `string`. Cependant, si l'objet ne contient pas la propriété `label` ou si elle n'est pas de type `string`, TypeScript vous avertira.

```ts
function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj = {size: 10};
printLabel(myObj); // Erreur : l'objet n'a pas de propriété label
```

Il est également possible de passer par cette notation :

```ts
interface LabelledValue {
    label: string;
    [propName: string]: any;
}
```

Cela permet de définir une interface avec une propriété `label` de type `string` et un nombre quelconque de propriétés supplémentaires de type `any`.

A savoir, qu'en utilisant un linter comme ESLint, vous pouvez définir des règles pour éviter d'utiliser `any` dans votre code, ou des règles pour éviter d'utiliser des propriétés dynamiques comme `propName` dans l'exemple ci-dessus.

## **4. Propriétés optionnelles**

Les interfaces peuvent avoir des propriétés optionnelles, marquées par un `?` à la fin du nom de la propriété.

```ts
interface SquareConfig {
    color?: string;
    width?: number;
}
```

## **5. Propriétés en lecture seule**

Si vous voulez vous assurer qu'une propriété d'une interface n'est modifiée qu'au moment de la création d'un objet, utilisez le mot-clé `readonly` devant la déclaration de propriété.

```ts
interface Point {
    readonly x: number;
    readonly y: number;
}
```

## **6. Fonctions dans les interfaces**

Les interfaces peuvent aussi décrire les fonctions.

```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}
```

Ce n'est pas très fréquent, mais cela peut être utile dans certains cas, comme dans l'exemple suivant :

```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
```

## **7. Indexable Types**

Les interfaces peuvent être utilisées pour décrire des types que vous pouvez indexer, comme les arrays ou les objets.

```ts
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];
```

## **8. Extension d'interfaces**

Les interfaces peuvent étendre une ou plusieurs autres interfaces. Cela permet de créer une nouvelle interface en héritant des propriétés d'autres interfaces.

```ts
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
```

Ici, `<Square>{}` permet de créer un objet de type `Square` vide. C'est une façon de dire à TypeScript que vous savez ce que vous faites et que vous voulez que `square` soit de type `Square`. Un autre moyen de faire la même chose est d'utiliser `as` :

```ts
let square = {} as Square;
```

Vous pouvez aussi étendre plusieurs interfaces :

```ts
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

## **9. Conclusion**

Les interfaces sont un outil fondamental dans TypeScript, permettant de définir des contrats au sein de votre code et d'assurer une interaction correcte entre les objets. Elles favorisent la création d'un code structuré, prévisible et facile à comprendre.
