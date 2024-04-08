# **Approfondissement TypeScript - Types génériques**

## **1. Introduction**

Les types génériques sont l'un des moyens les plus avancés de définir des types flexibles et réutilisables en TypeScript. Ils permettent aux développeurs de définir des composants qui peuvent travailler sur une variété de types plutôt que sur un seul, tout en conservant la sécurité des types.

## **2. Qu'est-ce qu'un type générique ?**

Imaginons que nous ayons une fonction qui renvoie le même type qu'elle reçoit en entrée. C'est à dire, par exemple, une fonction qui prend un argument de type `number` et renvoie un argument de type `number`.
Sans les génériques, nous devrions donner à cette fonction un type `any`, ce qui nous ferait perdre la sécurité des types.

```ts
function identity(arg: any): any {
    return arg;
}
```

Avec les génériques, nous pouvons capturer le type d'entrée et l'utiliser pour la sortie, tout en conservant la sécurité des types.

## **3. Définir une fonction générique**

Voici comment vous définiriez la fonction `identity` avec un type générique:

```ts
function identity<T>(arg: T): T {
    return arg;
}
```

Ici, nous utilisons le paramètre de type générique `T` pour capturer le type d'entrée. Il est entre chevrons (`<>`) après le nom de la fonction. Nous pourrions également utiliser un autre nom pour le paramètre de type générique, comme `U` par exemple :

```ts
function identity<U>(arg: U): U {
    return arg;
}
```

Il faut juste savoir que les paramètres de type générique sont généralement nommés `T`, `U`, `V`, etc. Et ils nous permettent de capturer le type d'entrée afin que nous puissions l'utiliser plus tard. Ici, nous utilisons `T` pour définir le type de retour.

Vous pouvez utiliser cette fonction comme suit:

```ts
let output = identity<string>("myString");
```

Ici, nous explicitons le type d'entrée (`string`) et le compilateur déduit le type de sortie (`string`), ce qui nous donne le même résultat que si nous avions utilisé le type `any` mais avec la sécurité des types. On aurait pu, par exemple, passer un nombre en entrée, et le compilateur nous aurait averti que le type de sortie n'est pas le même que le type d'entrée.

```ts
let output = identity<string>(42); // Erreur : le type de sortie n'est pas le même que le type d'entrée
```

Cependant, pour faire marcher ce code, on peut changer le type en entrée pour `number` plutôt que `string`.

```ts
let output = identity<number>(42); // type de sortie est 'number'
```

Notez que l'inférence de type fonctionne également dans ce cas, ce qui signifie que vous pouvez écrire le code ci-dessus sans spécifier le type générique.

```ts
let output = identity(42); // type de sortie est 'number'
```

## **4. Types génériques pour les interfaces**

Imaginons que vous ayez une boîte où vous pouvez mettre n'importe quel objet : une pomme, une balle, un stylo, etc. Quand vous mettez un objet dedans, il faut que vous récupériez le même type d'objet.

Dans notre monde du code, cette boîte est une fonction. Et pour dire à cette fonction quel type d'objet nous allons mettre dedans, nous utilisons quelque chose appelé "type générique".

Regardez cet exemple :

```ts
function mettreDansLaBoite<T>(objet: T): T {
    return objet;
}

interface Boite<T> {
    (objet: T): T;
}

let boitePomme: Boite<pomme> = mettreDansLaBoite(apple.golden);
```

Dans cet exemple :

- `Boite<T>` est comme une règle qui dit : "Peu importe ce que vous mettez dans la boîte, vous obtiendrez la même chose en retour".
- Lorsque nous disons `boitePomme: Boite<pomme>`, c'est comme si nous spécifions une boîte spécialement conçue pour les pommes. Si vous mettez une pomme dedans, vous obtiendrez une pomme en retour.

On pourrait donc très bien aussi utiliser `Boite<ballon>` ou `Boite<stylo>`.

```ts
interface Boite<T> {
    (objet: T): T;
}

let boitePomme: Boite<pomme> = mettreDansLaBoite;
let boiteBallon: Boite<ballon> = mettreDansLaBoite;
let boiteStylo: Boite<stylo> = mettreDansLaBoite;
```

A chaque appel de la fonction `mettreDansLaBoite`, le type de l'objet en entrée et en sortie sera le même.

```ts
function mettreDansLaBoite<T>(objet: T): T {
    return objet;
}

let pomme = mettreDansLaBoite(apple.pinklady); // type de sortie est 'pomme'
let ballon = mettreDansLaBoite(42); // type de sortie est 'number'
let stylo = mettreDansLaBoite(true); // type de sortie est 'boolean'
```

## **5. Types génériques pour les classes**

Pensez à une machine à bonbons. Vous pouvez avoir différentes machines pour différents types de bonbons : une pour les bonbons au chocolat, une pour les bonbons acidulés, etc.

Mais au lieu d'acheter une machine différente pour chaque type de bonbon, imaginez si vous pouviez avoir une seule machine, et juste lui dire quel type de bonbon elle devrait donner. Ça serait cool, non? :)

C'est exactement ce que fait un "type générique" pour les classes en TypeScript.

Regardez cet exemple :

```ts
class MachineABonbons<T> {
    bonbonParDefaut: T;
    melanger: (bonbon1: T, bonbon2: T) => T;
}

let machineChocolat = new MachineABonbons<chocolat>();
machineChocolat.bonbonParDefaut = unChocolat;
machineChocolat.melanger = function(bonbon1, bonbon2) { return bonbon1 + bonbon2; };
```

Ici, `MachineABonbons<T>` est notre machine à bonbons générique. Lorsque nous créons `machineChocolat`, nous disons à la machine que nous voulons qu'elle travaille uniquement avec des chocolats.

Si nous avions voulu une machine pour les bonbons acidulés, nous aurions simplement dit `new MachineABonbons<bonbonAcide>()`.

Par exemple, on peut instancier une machine à bonbons pour les bonbons au chocolat, et une autre pour les bonbons acidulés.

```ts
class MachineABonbons<T> {
    bonbonParDefaut: T;
    melanger: (bonbon1: T, bonbon2: T) => T;
}

let machineChocolat = new MachineABonbons<chocolat>();
machineChocolat.bonbonParDefaut = unChocolat;
machineChocolat.melanger = function(bonbon1, bonbon2) { return bonbon1 + bonbon2; };

let machineAcide = new MachineABonbons<bonbonAcide>();
machineAcide.bonbonParDefaut = unBonbonAcide;
machineAcide.melanger = function(bonbon1, bonbon2) { return bonbon1 + bonbon2; };
```

## **6. Contraintes génériques**

Imaginez que vous ayez un jouet magique qui peut parler. Vous pouvez mettre n'importe quel objet dans ce jouet, et il vous dira combien de lettres cet objet a dans son nom. Si vous mettez un "chat", le jouet dira "4" (car "chat" a 4 lettres).

Mais attendez ! Que se passerait-il si vous mettiez un caillou ? Un caillou n'a pas de "nom" pour le jouet à compter.

Pour s'assurer que vous ne mettez que des objets avec un "nom" dans le jouet, le jouet a une règle. Cette règle dit : "Je n'accepte que les objets qui ont un 'nom' à compter".

En termes de code, cette règle est ce qu'on appelle une "contrainte générique".

Regardez cet exemple :

```ts
interface AvecNom {
    length: number; // C'est le nombre de lettres dans le "nom".
}

function jouetMagique<T extends AvecNom>(objet: T): T {
    console.log(objet.length); // Le jouet nous dit combien de lettres l'objet a dans son nom.
    return objet;
}
```

Dans cet exemple, `AvecNom` est la règle que le jouet utilise pour s'assurer que tout ce que vous mettez dedans a un "nom". La partie `T extends AvecNom` est la manière dont le jouet s'assure que la règle est respectée.

Autre exemple, si vous voulez que le jouet accepte uniquement les objets qui ont une propriété `nom` de type `string`, vous pouvez écrire ceci :

```ts
interface AvecNom {
    nom: string;
}

function jouetMagique<T extends AvecNom>(objet: T): T {
    console.log(objet.nom);
    return objet;
}
```

Ainsi, si vous essayez de mettre un objet sans propriété `nom` dans le jouet, le compilateur vous avertira.

```ts
interface AvecNom {
    nom: string;
}

function jouetMagique<T extends AvecNom>(objet: T): T {
    console.log(objet.nom);
    return objet;
}

jouetMagique(3); // Erreur : l'argument de type '3' n'est pas assignable au paramètre de type 'AvecNom'
```

## **7. Utiliser plusieurs paramètres de type**

Encore un exemple amusant, imaginez, que vous ayez une boîte magique qui peut échanger les places de deux objets. Par exemple, si vous mettez une pomme à gauche et une banane à droite, la boîte les échangera, et vous obtiendrez la banane à gauche et la pomme à droite.

Mais cette boîte est encore plus spéciale ! Avant de l'utiliser, vous pouvez lui dire exactement quel type d'objet vous allez mettre de chaque côté. Vous pouvez dire : "Je vais mettre un fruit à gauche et un nombre à droite".

Voyons comment cela fonctionne en code :

```ts
function boiteEchange<T, U>(duo: [T, U]): [U, T] {
    return [duo[1], duo[0]]; // Elle échange les objets de place !
}

boiteEchange<string, number>(["pomme", 7]);
```

Ici, la fonction `boiteEchange` peut échanger la place de deux types d'objets différents que vous lui indiquez. Dans l'exemple, nous lui avons dit que nous mettrions une `string` (chaîne de caractères) à gauche et un `number` (nombre) à droite.

En termes techniques, `boiteEchange` est une fonction générique avec deux paramètres de type générique : `T` et `U`. Et le paramètre `duo` est un tableau de deux éléments, où le premier élément est de type `T` et le deuxième élément est de type `U`. On a un tuple de type `[T, U]` en paramètre, et on renvoie un tuple de type `[U, T]`.

Et voilà ! Vous avez utilisé une boîte magique qui peut échanger la place de deux objets différents. C'est ainsi que vous pouvez utiliser plusieurs types génériques en TypeScript !

## **8. Conclusion**

Les types génériques offrent une manière flexible et sécurisée de créer des fonctions, classes et interfaces réutilisables. Ils sont essentiels pour garantir la sécurité des types tout en permettant la réutilisation du code dans des situations variées.
