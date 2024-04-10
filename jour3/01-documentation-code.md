# Documentation 

- essentiel pour rendre votre projet utilisable dans le temps 
- utilisable par beaucoup de monde 

- de nombreuses normes pour réaliser des documentations 
- jsdoc  => https://jsdoc.app/
- on va ajouter des commentaires avant nos fonctions / nos variables / nos class 

```js 
/**
 commentaire de type jsdoc va expliquer comment utiliser la fonction qui est à la suite 

@param {number} a - premier chiffre de l'addition
@param {number} b deuxieme chiffre de l'addition
@return {number} - resultat du calcul 
@see {@link https://jsdoc.app/tags-see}
 */
function addition( a, b  ){
    return a + b ; 
}
```

```ts 
/**
 commentaire de type jsdoc va expliquer comment utiliser la fonction qui est à la suite 
@param {number} a - premier chiffre de l'addition
@param {number} b deuxieme chiffre de l'addition
@return {number} - resultat du calcul 
 */
function addition( a : number, b : number  ) : number {
    return a + b ; 
}
```

via une commande => générer site internet qui présente la synthèse de votre documentation

jsdoc -c config.json 

## cas pratique 

1 créer dans le dossier jour03 un dossier documentation qui contient un sous dossier src

2 dans mon terminal je me positionne dans le dossier documentation

cd jour3/documentation
npm init --yes
npm i -D jsdoc
créer un fichier jsdoc.json # fichier de configuration de jsdoc 

{
    "source" : {
        "include" : ["src"],
        "exclude" : ["node_modules"]
    },
    "opts" : {
        "destination" : "docs/"
    }
}

ce fichier jsdoc.json est facultatif si vous ne le créez pas => il y en a un par défaut  https://jsdoc.app/about-configuring-jsdoc


// j'ai créé deux fichiers avec une fonction documenté chacune 

```bash
npx jsdoc -c jsdoc.json
```

## liste des @ à connaitre sur jsdocs 

- @param @arg => paramètre d'une fonction
- @returns => return de la fonction
- @throws => thrown new Error()
- @async  
- @type (typer une variable)
- liste complète disponible à l'adresse suivante : <https://jsdoc.app/>

## repositionné dans le projet fil rouge 

- repositionner dans le dossier racine du projet
- npm i 
- npm i -D typedoc 
- configuration 
    - modifier le tsconfig.json => où chercher les sources à documenter
                                => où créer la documentation (html)
    ,                            
      "typedocOptions" : {
        "entryPoints" : ["src/**/*.ts"],
        "out" : "docs" 
      }
    - ajouter une nouvelle script dans le fichier package.json
    - "doc" : "typedoc" dans le fichier package.json

npm run doc

- documenter un projet en typescript 