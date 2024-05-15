# Websockets

Dans ce cours, nous allons parler des websockets, mais seulement en théorie. Nous partirons sur l'aspect pratique dans le cours suivant. L'important, c'est de vraiment comprendre ce qu'est un websocket, comment ça fonctionne, et pourquoi c'est utile.

## La problématique

Imaginez le cas d'une messagerie instantanée. Tout néophyte (je suis passé par là pour l'anecdote) penserait que pour synchroniser en direct les messages reçus, il fallait par des appels API toutes les 2 secondes pour être tenus informés des nouveaux messages. Et cette méthode a un nom qu'on verra par la suite.

C'est notre problématique. Comment faire pour être tenu au courant des nouveaux messages ?

### Solution 1: Le polling

La première solution, serait le polling. C'est quoi le polling d'ailleurs ? C'est une méthode qui consiste à envoyer des requêtes à intervalles réguliers pour vérifier si de nouvelles données sont disponibles. C'est une méthode très gourmande en ressources, et qui n'est pas du tout optimale.

Vous avez peut-être tous déjà vu Shrek 2. Vous vous souvenez de la scène où l'âne demande à Shrek s'il est arrivé, et Shrek lui répond "Non, pas encore". Et l'âne de répéter la question toutes les 2 secondes. C'est un peu ça le polling.

<video width="320" height="240" controls>
  <source src="https://github.com/dilaouid/cda-node/raw/supports/assets/shrek.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>