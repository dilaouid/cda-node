# **Approfondissement TypeScript - Modules**

## **1. Introduction**

Dans de grands projets, il est essentiel de diviser le code en modules réutilisables pour maintenir le code lisible, réutilisable et éviter les collisions de noms. TypeScript, comme ES6, offre un système de modules pour séparer le code en différentes unités logiques.

## **2. Pourquoi les modules ?**

- **Maintenabilité** : Vous pouvez diviser le code en petites parties réutilisables.
- **Espace de noms** : Vous évitez les collisions de noms dans le code global.
- **Réutilisabilité** : Importez et réutilisez des modules dans d'autres projets.

## **3. Exporter des membres**

Pour rendre les fonctions, classes ou variables accessibles en dehors du module, utilisez le mot-clé `export`.

```ts
// math.ts
export function add(x: number, y: number): number {
    return x + y;
}
```

A noter que la différence entre `export` et `export default` est que `export` permet d'exporter plusieurs membres, alors que `export default` permet d'exporter un seul membre.

```ts
// math.ts
export default function add(x: number, y: number): number {
    return x + y;
}
```

```ts
// app.ts
import add from "./math";

console.log(add(2, 3));  // 5
```

Du coup, si vous voulez `export default` plusieurs membres, vous devez le faire comme ceci :

```ts
// math.ts
export default {
    add(x: number, y: number): number {
        return x + y;
    },
    subtract(x: number, y: number): number {
        return x - y;
    }
}
```

```ts
// app.ts
import math from "./math";

console.log(math.add(2, 3));  // 5
console.log(math.subtract(2, 3));  // -1
```

En fonction des usages, vous pouvez préférer l'un ou l'autre. Mais dans la plupart des cas, `export` est suffisant. C'est pourquoi nous utiliserons `export` dans les exemples suivants.

## **4. Importer des membres**

Utilisez le mot-clé `import` pour accéder aux membres d'un autre module.

```ts
// app.ts
import { add } from "./math";

console.log(add(2, 3));  // 5
```

## **5. Export par défaut**

Si un module est principalement destiné à exporter une seule classe, fonction ou objet, utilisez `export default`.

```ts
// greeting.ts
export default function() {
    return "Hello, World!";
}
```

```ts
// app.ts
import greet from "./greeting";

console.log(greet());  // Hello, World!
```

## **6. Réexporter**

Vous pouvez également réexporter des choses pour rendre votre structure de module plus pratique.

```ts
// index.ts
export * from "./math";
```

```ts
// app.ts
import { add } from "./math";

console.log(add(2, 3));  // 5
```

En gros, ça va exporter tout ce qui est exporté par `math.ts` dans `index.ts`, et vous pourrez donc importer `add` depuis `index.ts`. Ce n'est pas vraiment une solution pratique dans ce cas, mais ça peut être utile dans d'autres cas. Comme par exemple, si vous voulez réexporter plusieurs modules dans un seul module.

```ts
// index.ts
export * from "./math";
export * from "./greeting";
```

```ts
// app.ts
import { add, subtract, greet } from "./index";

console.log(add(2, 3));  // 5
console.log(subtract(2, 3));  // -1
console.log(greet());  // Hello, World!
```

## **7. Importer tout**

Si vous avez besoin de toutes les fonctions/exportations d'un module, vous pouvez les importer toutes.

```ts
// app.ts
import * as math from "./math";

console.log(math.add(1, 2));  // 3
```

## **8. Modules vs. Namespaces**

Auparavant, TypeScript utilisait le concept de _Namespaces_ pour organiser le code. Avec l'avènement des modules ES6, il est généralement préférable d'utiliser des modules pour diviser et organiser le code. Cependant, les namespaces sont toujours utiles dans certains cas, comme pour les bibliothèques JavaScript qui ne sont pas conçues pour les modules.

```ts
// math.ts
export namespace Math {
    export function add(x: number, y: number): number {
        return x + y;
    }
}
```

```ts
// app.ts
import { Math } from "./math";

console.log(Math.add(2, 3));  // 5
```

Bon, on constate bien que les namespaces sont moins pratiques que les modules. Il n'y a pas de raison de les utiliser, sauf si vous travaillez sur une bibliothèque JavaScript qui n'est pas conçue pour les modules.

## **9. Conclusion**

Les modules sont un moyen puissant d'organiser et de structurer votre code en TypeScript, surtout dans les applications à grande échelle. Ils favorisent la lisibilité, la réutilisabilité et garantissent que les noms ne se heurtent pas dans l'espace de noms global.
