# **Basiques de TypeScript - Types**

## **1. Introduction**

L'une des caractéristiques les plus notables et puissantes de TypeScript est son système de typage statique. Contrairement à JavaScript qui est dynamiquement typé, TypeScript offre la possibilité de spécifier explicitement les types de variables, de paramètres de fonction et de valeurs de retour.

## **2. Type de base : Any**

- Avant de plonger dans les types spécifiques, il est important de connaître le type `any`. C'est un type spécial qui signifie que la variable peut être de n'importe quel type. C'est utile lorsque vous ne voulez pas restreindre une variable à un type spécifique.

```ts
let notSure: any = 4;
notSure = "peut-être une chaîne de caractères";
notSure = false; // maintenant un booléen
```

Mais bien évidemment, il est préférable d'éviter d'utiliser `any` autant que possible, car cela annule l'intérêt de TypeScript. Il est préférable de spécifier explicitement le type de la variable. De plus, votre DX (_Developer Experience_) sera bien meilleure, car vous aurez une documentation claire sur le type de la variable, plutôt qu'un comportement imprévisible.

## **3. Types primitifs**

- **Number** : Le type le plus basique, utilisé pour les nombres flottants.

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

- **String** : Une séquence de caractères, similaire aux chaînes en JavaScript.

```ts
let color: string = "blue";
color = 'red';
```

- **Boolean** : Juste vrai ou faux.

```ts
let isDone: boolean = false;
```

## **4. Tableaux**

Il y a deux façons de déclarer un tableau en TypeScript.

- Utilisation directe du type de l'élément suivi de `[]` :

```ts
let list: number[] = [1, 2, 3];
```

- Utilisation de l'objet générique `Array<type>` :

```ts
let list: Array<number> = [1, 2, 3];
```

## **5. Tuple**

Les tuples permettent d'exprimer un tableau où le type de certains éléments est connu.

```ts
let x: [string, number];
x = ["hello", 10]; // OK
x = [10, "hello"]; // Erreur
```

## **6. Enum**

Un moyen de donner des noms plus conviviaux à des ensembles de valeurs numériques.

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

## **7. Null et Undefined**

En TypeScript, `undefined` et `null` ont leurs propres types.

```ts
let u: undefined = undefined;
let n: null = null;
```

## **8. Void**

Souvent utilisé pour le type de retour des fonctions qui ne renvoient pas de valeur.

```ts
function warnUser(): void {
    console.log("This is a warning!");
}
```

## **9. Conclusion**

La capacité de définir des types est fondamentale dans TypeScript. Elle permet d'écrire du code plus prévisible et plus sûr. Les types fournissent une documentation explicite sur la façon dont le code doit fonctionner, et TypeScript valide ce contrat lors de la compilation.
