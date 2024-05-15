# Websockets - Cas d'usage

Nous avons compris comment fonctionnent les websockets, et pourquoi elles sont utiles. Maintenant, nous allons voir comment les utiliser dans un cas d'usage concret.

Nous n'allons pas encore intégrer les websockets dans notre application, mais nous allons voir comment elles peuvent être utilisées pour résoudre un problème.

Notre problème est le suivant : nous avons un jeu en ligne, et nous voullons que les joueurs soient informés en temps réel des actions des autres joueurs, à savoir, les déplacements dans la carte.

Les joueurs rejoignent une carte (une _map_ dans le jargon), et se déplacent à l'intérieur de celle-ci. Il faut que tout les joueurs de cette même _map_ soient informés en temps réel des déplacements des autres joueurs.

Nous n'allons pas coder l'application, mais nous allons voir comment les websockets peuvent être utilisées pour résoudre ce problème, et dans notre cas, nous utiliserons [Socket.io](https://socket.io/).

## Table des matières

- [Comment ça se passe](#comment-ça-se-passe)
    - [Handshake et premiers événements](#handshake-et-premiers-événements)
    - [Notifier les autres joueurs](#notifier-les-autres-joueurs)
- [Résumé](#résumé)


## Comment ça se passe

Socket.io est une librairie qui permet de gérer les websockets en Node.js. Elle est très simple d'utilisation, et permet de gérer les événements de manière très simple. Et on a parler de communication bidirectionnelle, c'est à dire que le client peut envoyer des données au serveur, et le serveur peut envoyer des données au client.

Donc, disons que nous avons installé Socket.io à la fois sur le serveur et sur le client. Le client se connecte au serveur, et le serveur envoie un événement `join` pour ajouter le joueur à la _map_.

### Handshake et premiers événements

```js
// Client

// Ici, nous réalisons notre connexion au serveur, notre handshake !
const socket = io('http://localhost:3000');

// On envoit un événement `join` pour ajouter le joueur à la map, ce sera le serveur qui réceptionnera cet événement
socket.emit('join_map', mapId);


function move(direction) {
    // On envoit un événement `move` pour déplacer le joueur
    socket.emit('player_move', { x: direction.x, y: direction.y });
}
```


```js
// Serveur

// On importe Socket.io, et on l'initialise avec notre serveur Express. Ici, on suppose que notre serveur Express est déjà configuré.
io.on('connection', (socket) => { // Notre connexion avec le client, notre handshake !

    // On écoute l'événement `join_map` pour ajouter le joueur à la map
    socket.on('join_map', (mapId) => {
        console.log(`Player ${socket.id} joined map ${mapId}`);

        // On ajoute le joueur à la room correspondant à la map
        socket.join(mapId);
    });

    // On écoute l'événement `player_move` pour déplacer le joueur
    socket.on('player_move', (direction) => {
        console.log(`Player ${socket.id} moved to ${direction.x}, ${direction.y}`);
    });

});
```

Dans un exemple visuel, voilà ce qu'il se passe avec ce code:

![Exemple de mouvement](../../assets/move_1.gif)

Imaginez que l'écran de gauche, c'est le **Joueur 1**, et l'écran de droite, c'est le **Joueur 2**. Le **Joueur 1** se déplace, mais le **Joueur 2** n'est pas informé de ce déplacement.

Initialement, les joueurs rejoignent la map, donc `emit` de `join_map` pour ajouter le joueur à la map.

Ensuite, lorsqu'un joueur se déplace, celui-ci `emit` un événement `player_move` pour déplacer le joueur. Le serveur reçoit cet événement.

### Notifier les autres joueurs

Sauf que, dans notre exemple, une donnée est envoyée au serveur, mais le serveur ne renvoie rien au client. Donc, le **Joueur 2** n'est pas informé du déplacement du **Joueur 1**.

Il va donc falloir notifier le **Joueur 2** du déplacement du **Joueur 1**.

```js
// Serveur

// On importe Socket.io, et on l'initialise avec notre serveur Express. Ici, on suppose que notre serveur Express est déjà configuré.
io.on('connection', (socket) => { // Notre connexion avec le client, notre handshake !

    // On écoute l'événement `join_map` pour ajouter le joueur à la map
    socket.on('join_map', (mapId) => {
        console.log(`Player ${socket.id} joined map ${mapId}`);

        // On ajoute le joueur à la room correspondant à la map
        socket.join(mapId);
    });

    // On écoute l'événement `player_move` pour déplacer le joueur
    socket.on('player_move', (direction) => {
        console.log(`Player ${socket.id} moved to ${direction.x}, ${direction.y}`);

        // On informe player2 (admettons que player2 est définit quelque part) du déplacement du joueur
        io.to(player2).emit('player_moved', { playerId: socket.id, direction });
    });

});
```

Ici, `io.to(player2).emit('player_moved', { playerId: socket.id, direction });` permet d'envoyer un événement `player_moved` **exclusivement** à un joueur spécifique, en l'occurence, le **Joueur 2** (son socket id est stocké dans la variable `player2`).

Désormais, **Joueur 2** est informé du déplacement du **Joueur 1**, comme nous le montre ce schéma:

![Exemple de mouvement](../../assets/move_2.gif)

Voilà, le **Joueur 1** se déplace, et le **Joueur 2** est informé en temps réel du déplacement du **Joueur 1**.

Et si on essayait le sens inverse ? c'est à dire, **Joueur 1** se déplace, **Joueur 2** est notifié, puis se déplace à son tour, et **Joueur 1** est notifié ? Car actuellement, ce que nous avons, c'est ceci, dans le cas où **Joueur 2** se déplace:

![Exemple de mouvement](../../assets/move_3.gif)

Ca serait mieux de notifier également **Joueur 1** du déplacement de **Joueur 2**. En fait, de notifier tout les joueurs de la map lors d'un déplacement de n'importe quel joueur. Pour cela, nous allons remplacer noter `io.to(player2)` par un `socket.to(mapId)`.

```js
// Serveur

io.on('connection', (socket) => {
    socket.on('join_map', (mapId) => {
        console.log(`Player ${socket.id} joined map ${mapId}`);
        socket.join(mapId);
    });

    socket.on('player_move', (direction) => {
        console.log(`Player ${socket.id} moved to ${direction.x}, ${direction.y}`);

        // On informe tout les joueurs de la map du déplacement d'un joueur spécifique
        socket.to(mapId).emit('player_moved', { playerId: socket.id, direction });
    });

});
```

Ainsi, peut importe qui bouge, toutes les personnes qui auront, client side, envoyé `socket.emit('join_map', mapId);` seront notifiées du déplacement de n'importe quel joueur dans cette map.

Du coup, on se retrouve avec un schéma comme celui-ci:

![Exemple de mouvement](../../assets/move_4.gif)

---

Et voilà donc comment les websockets peuvent être utilisées pour résoudre un problème concret. Dans notre cas, nous avons grossièrement montré un exemple avec un jeu en ligne, mais les websockets peuvent être utilisées pour bien d'autres cas d'usage.

### Résumé

Pour résumer donc :

- On établit un handshake entre le client et le serveur (connexion) depuis le client
- Lorsqu'on `emit` un événement client side, le serveur le reçoit
- Le serveur peut `emit` un événement à un client spécifique, ou à tout les clients d'une room spécifique
- Pour écouter un événement côté serveur, on utilise `socket.on('event', callback)`
- Pour envoyer un événement côté serveur, on utilise `socket.emit('event', data)`
- Pour envoyer un événement côté client, on utilise `socket.emit('event', data)`
- Pour écouter un événement côté client, on utilise `socket.on('event', callback)`