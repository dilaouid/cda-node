# Websockets

Dans ce cours, nous allons parler des websockets, mais seulement en théorie. Nous partirons sur l'aspect pratique dans le cours suivant. L'important, c'est de vraiment comprendre ce qu'est un websocket, comment ça fonctionne, et pourquoi c'est utile.

## La problématique

Imaginez le cas d'une messagerie instantanée. Tout néophyte (je suis passé par là pour l'anecdote) penserait que pour synchroniser en direct les messages reçus, il fallait par des appels API toutes les 2 secondes pour être tenus informés des nouveaux messages. Et cette méthode a un nom qu'on verra par la suite.

C'est notre problématique. Comment faire pour être tenu au courant des nouveaux messages ?

### Solution 1: le polling

La première solution, serait le polling. C'est quoi le polling d'ailleurs ? C'est une méthode qui consiste à envoyer des requêtes à intervalles réguliers pour vérifier si de nouvelles données sont disponibles. C'est une méthode très gourmande en ressources, et qui n'est pas du tout optimale.

Vous avez peut-être tous déjà vu Shrek 2. [Vous vous souvenez de la scène où l'âne demande à Shrek s'il est arrivé, et Shrek lui répond "Non, pas encore". Et l'âne de répéter la question toutes les 2 secondes](https://www.youtube.com/watch?v=pRsxDmxA9Qk). C'est un peu ça le polling.

Le client va envoyer une requête au serveur à chaque court interval pour être tenu informé des nouvelles données. C'est très gourmand en ressources, et ça ne permet pas d'avoir une synchronisation en temps réel.

<p style="text-align: center;">
    <img src="../../assets/polling.gif" alt="Polling animation"/>
    <em>Schéma du polling (le carré rouge représente une réponse serveur défavorable, le vert une réponse favorable)</em>
</p>

## Solution 2 : le long polling

Le long polling est une version alternative du polling. C'est une méthode qui consiste à envoyer une requête au serveur, et le serveur ne répondra que lorsqu'il aura des données à envoyer. C'est une méthode qui permet de réduire la charge serveur, mais qui n'est pas optimale non plus.

Pourquoi ? Simplement car vous allez laisser le connexion ouverte en simultanées pour de nombreux utilisateurs. C'est une méthode qui peut vite saturer le serveur, et qui n'est pas du tout optimale ni scalable.

<p style="text-align: center;">
    <img src="../../assets/long_polling.gif" alt="Long Polling animation"/>
    <em>Schéma du long polling</em>
</p>

## Solution 3 : les websockets

La star du cours. Les Websockets, c'est avoir un canal de communication bidirectionnel entre le client et le serveur.

C'est une connexion persistante, donc direct et permanente, qui permet d'envoyer des données dans les deux sens. C'est une méthode qui permet d'avoir une communication en temps réel, et qui est très peu gourmande en ressources en comparaison du polling et du long polling.

Fini l'attente de 2 secondes pour savoir si un message est arrivé, ou la surcharge serveur avec le polling.

A l'instar d'une communication HTTP classique (car Websocket est également un protocole basé sur TCP), la communication est initiée par le client. Mais à la différence du HTTP, le serveur peut également envoyer des données au client sans que celui-ci n'ait à demander. 

En résumé, le serveur peut envoyer des données au client sans que celui-ci n'ait envoyé de requête. C'est une communication en temps réel.

<p style="text-align: center;">
    <img src="../../assets/websocket.gif" alt="Websockets animation"/>
    <em>Schéma des websockets</em>
</p>

C'est comme une messagerie instantanée. Vous envoyez un message, et l'autre personne le reçoit instantanément. Une fois la connexion établie, la discussion reste ouverte, prête à transmettre des informations dans les deux sens: client vers serveur, et serveur vers client.

#### Comment ça marche

Imaginez que vous ouvrez votre navigateur. Et à la place de faire une requête HTTP, vous faites une requête WS (Websocket). 

On dit au serveur "hey viens on reste en contact en temps réel", le serveur réponds "ok d'accord j'accepte, ça me va".

C'est ce qu'on appelle le **handshake**, une poignée de main, un accord entre le client et le serveur pour rester en contact en temps réel de façon permanente.

Ce qui est intéressant, c'est qu'il y a donc un véritable dialogue entre le client et le serveur, et on quitte le schéma classique HTTP où le client envoie une requête, le serveur répond, et la connexion est fermée.


#### Exemples de choses à faire avec les websockets

- Messagerie instantanée
- Notifications en temps réel
- Jeux en ligne
- Synchronisation de données en temps réel
- Dessin collaboratif
- Pixel wars