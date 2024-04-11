# Test 

- le fait écrire du code qui va tester votre code 
- il existe plein de type de test
    - Test unitaire
    - Test d'intégration
    - Test Fonctionnel (e2e => test End to End)



## Test Unitaire

- facile à écrire (écrire beaucoup)
- exécutable rapidement
- tester chaque partie de votre code (fonction) de manière unitaire 
- sans ses dépendances (autres fonctions / relation avec une base de données)

## Test Intégration

- un peu plus complexe à écrire
- un peu plus lent à exécuter
- fonctionnalité ET ses dépendances (requete HTTP / connecter à la base de données)

## Test Fonctionnel 

- les plus complexes à écrire (à set up)
- les plus lent à exécuter (vraiment se mettre dans la peau d'un utilisateur qui veut effectuer un traitement)
- fragile (souvent une mise à jour de l'application va les déstabiliser)
- tests qui permettent de vérifier un usercase en intégralité 

## Pyramides de test ?? 

## pour réaliser des test 

- utiliser des librairies / framework 
    - mettre à disposition des fonctions qui permettent de créer des 
    scenario
    - fonction d'assertion => je m'attends à ce que la fonction retourne un tableau ET je le vérifie 
    - fonction de simulation "mock"
    - fonction de set up => teardown mettre en place un environnement

- test runner => un outil en ligne de commande qui va exécuter les tests
- e2e => headless browser (Cypress)


## outils à connaitre TU

- jest (js) Facebook très complet  https://jestjs.io/
- jasmine (js) plus ancien https://jasmine.github.io/ 
-  Chai + Mocha https://mochajs.org/

## outils à connaitre TI

- jest (js) + supertest (simuler une requête http)

## outils à connaitre TF e2e

- Seleninum (outil très complet)
- Cypress (rapide et facile à installer) js 

- rdv 15h25 bon café !!!!

La mise en place de test permet de rendre plus pérenne votre code 

=> TDD 

Test Driven Developpement 

=> d'abord vous écrire que ce vous voulez réaliser Test 
=> écrire le code / traitement / feature 

// créer un nouveau dossier dans jour3 => test
// cd jour3/test
// npm init --yes
// npm i -D jest
// modifier le fichier package.json du dossier test

// si vous utiliser le système de module CJ (module.exports / require)
"scripts": {
    "test": "jest"
}

// si vous utilisez le système de module ES (export import)
"scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js --watchAll"
}