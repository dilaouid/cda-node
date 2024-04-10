# API 

Application Program Interface  <=> code qui permet de faire fonctionner deux programmes 

Front <====> Back 

express 
utiliser une documentation spéciale pour expliquer (et rassemble)
l'ensemble des routes (points d'entrée) que vous avez créé dans votre API 

## swagger 

- swagger (nom historique)
- OpenAPI (nouveau nom de l'outil de documentation)

=> ajouter dans votre api
=> positionner dans le dossier jour3 cd swagger
=> npm init --yes
=> npm i express 
=> configuration package.json "type": "module"
=> créer mon api 

=> documenter => expliquer comment l'utiliser !!! 

=> je vais installer une librairie (dans un environnement js)

```
npm install swagger-ui-express yamljs
```

=> je vais installer une librairie (dans un environnement ts)

```
npm install swagger-ui-express yamljs
npm i --save-dev @types/swagger-ui-express
npm i --save-dev @types/yamljs
```

// utiliser swagger pour documenter mon api MAIS elle est en ts 
// il faut compiler l'application pour pouvoir utiliser swagger 

// dans mon terminal positionner à la racine du projet

```
npm install swagger-ui-express yamljs
npm i --save-dev @types/swagger-ui-express
npm i --save-dev @types/yamljs
```

créer un nouveau fichier swagger.json (dans le dossier racine / pas dans src)

```yaml
openapi: 3.0.0
info:
  title: API fil rouge formation CDA
  description: Cette API permet de gérer les posts d'un blog.
  version: "1.0.0"
servers:
  - url: http://localhost:8080
paths:
  /:
   get
  /comments/{id}:
   get
  /posts/:
   get
  /posts/{id}:
   get
```

modifier le fichier app.ts

## lancer le projet solution 1

```bash
npm i -g ts-node-dev
```

## lancer le projet solution 2

```bash
npm install copyfiles -g
tsc && copyfiles -u 1 src/**/*.json dist && node dist/app.js
```

<http://localhost:8080/api-docs>