# Comprendre les Fonctions Génériques en TypeScript

**1. Introduction au Typage Générique**

Le typage générique, dans TypeScript, permet de créer des composants qui peuvent fonctionner avec plusieurs types plutôt qu'un seul. Imaginez que c'est comme une boîte qui peut s'adapter pour contenir n'importe quel type d'objet, que ce soit un nombre, une chaîne de caractères, etc.

**2. La Fonction `fusion<T>`**

Dans le code fourni, nous avons une fonction `fusion<T>`. Voici comment la décomposer :

- `function fusion<T>(a: T[], b: T[]): T[]` : Cette ligne définit une fonction appelée `fusion`. Le `<T>` après `fusion` indique que cette fonction est générique. `T` peut être n'importe quel type.
- `a: T[]` et `b: T[]` : Ces paramètres signifient que la fonction prend deux tableaux (`arrays`) de type `T`.
- `return a.concat(b);` : La fonction retourne un nouveau tableau qui est la combinaison des tableaux `a` et `b`.

**3. Utilisation de `fusion<T>`**

- `let c = fusion<string>(["a", "b", "c"], ["d", "e"]);` : Ici, `fusion` est utilisée avec des chaînes de caractères (`string`). Elle combine les tableaux `["a", "b", "c"]` et `["d", "e"]`.
- `fusion<number>([1, 2, 3], [5, 6, 7]);` : Dans cet exemple, `fusion` est utilisée avec des nombres (`number`). Elle combine `[1, 2, 3]` et `[5, 6, 7]`.

**4. La Fonction `fusionTR<T, R>`**

Cette fonction est une version étendue de `fusion`, capable de gérer deux types différents :

- `function fusionTR<T, R>(a: T[], b: R[]): Array<T|R>` : Cette fois, nous avons deux types génériques, `T` et `R`. La fonction prend deux tableaux de ces types distincts.
- `const res: Array<T|R> = [];` : Initialise un nouveau tableau vide pouvant contenir des éléments de type `T` ou `R`.
- `return res.concat(a, b);` : Retourne un tableau combiné de `a` et `b`.

**5. Utilisation de `fusionTR<T, R>`**

- `console.log( fusionTR<number, string>([1, 2, 3], ["10", "20"]) );` : Ici, `fusionTR` est utilisée pour combiner un tableau de nombres et un tableau de chaînes de caractères.

**6. Conclusion**

Ces fonctions génériques montrent la flexibilité de TypeScript pour travailler avec différents types de données. Elles sont comme des outils polyvalents qui peuvent s'adapter à diverses situations.
