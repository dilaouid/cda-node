# Socket.io dans un cadre hexagonal

Nous travaillons, depuis la 1ère semaine, sur une architecture hexagonale. Nous avons vu comment mettre en place une architecture hexagonale, et comment la mettre en place avec Express.

Cependant, il est possible d'aller plus loin, et d'ajouter Socket.io à notre architecture hexagonale. C'est ce que nous allons voir dans ce cours.

D'habitude, il est commun de voir tout le code lié à Socket.io dans le fichier principal de l'application, `app.ts` ou `server.ts`. Cependant, nous allons voir comment intégrer Socket.io dans notre architecture hexagonale, du coup en découpant le code en plusieurs parties.

Nous allons ajouter un **système de messagerie instantanée** à notre application. Il y aura des salons de discussion, et les utilisateurs pourront envoyer des messages dans ces salons.

## Table des matières

- [Présentation de l'architecture](#présentation-de-larchitecture)
- [Installation de Socket.io](#installation-de-socketio)
- [Mise en place](#mise-en-place)
    - [Schémas](#schémas)
    - [Repositories](#repositories)
    - [Services](#services)
    - [Contrôleurs](#contrôleurs)
- [Liens utiles](#liens-utiles)

## Présentation de l'architecture

Nous gardons notre architecture actuelle, nous allons simplement ajouter quelques dossiers et fichiers pour mettre en place Socket.io.

```bash
src/
├── config/
├── domain/
|   ├── entities/
|       ├── Message.ts # Entité Message
|       ├── Room.ts # Entité Room
|   ├── services/
|       ├── MessageService.ts # Service pour gérer les messages
|       ├── RoomService.ts # Service pour gérer les salons
├── infrastructure/
|   ├── data/
|       ├── schema/
|           ├── messages.ts # Schéma de DB pour les messages
|           ├── rooms.ts # Schéma de DB pour les salons
|   ├── repositories/
|       ├── MessageRepository.ts # Repository pour les messages (actions CRUD)
|       ├── RoomRepository.ts # Repository pour les salons (actions CRUD)
|   ├── web/
|       ├── controllers/
|           ├── sockets # On crée un dossier pour les contrôleurs Socket.io, car ils sont différents des contrôleurs HTTP
|               ├── MessageController.ts    # Contrôleur pour les messages
|               ├── RoomController.ts       # Contrôleur pour les salons
├── middlewares/
├── tests/
├── types/
├── utils/
|   ├── socketCookies.ts # Fonctions pour récupérer les cookies d'un socket
app.ts
```

Adaptez votre architecture à cette nouvelle ici présente avant de continuer le cours.
Nous viendrons sur l'écriture de chacun des fichiers par la suite. Commençons déjà par installer Socket.io !

## Installation de Socket.io

Pour installer Socket.io, il suffit de lancer la commande suivante :

```bash
npm install socket.io
```

Vous n'avez besoin de rien de plus, même en TypeScript, car Socket.io est déjà écrit en TypeScript.

## Mise en place

Nous allons mettre en place Socket.io dans notre application. Commençons tout d'abord par la plus haute couche de notre architecture hexagonale, à savoir l'écriture des schémas.

### Schémas

Nous allons créer les schémas pour les messages et les salons. Ces schémas seront utilisés pour la base de données, mais également pour les contrôleurs Socket.io. Il n'y aura aucune information capitale dans les salons, seulement un `uuid` pour identifier le salon.

Les messages, cependant, seront attaché à une `room`, contiendra un `content` et un `author` attaché à un utilisateur. Et bien entendu, le message aura un `uuid` pour l'identifier.

#### `rooms.ts`

```ts
import { pgTable, uuid } from "drizzle-orm/pg-core";

export const rooms = pgTable('rooms', {
    id: uuid('id').defaultRandom().primaryKey(),
})
```

#### `messages.ts`

```ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { users, rooms } from "./"

export const messages = pgTable('messages', {
    id: uuid('id').defaultRandom().primaryKey(), // Identifiant du message
    content: text('content').notNull(), // Contenu du message
    author: uuid('author').references(() => users.id).notNull(), // Auteur du message (référence à un utilisateur)
    roomId: uuid('roomId').references(() => rooms.id).notNull(), // Salon du message (référence à un salon)
    date: timestamp('date').defaultNow().notNull() // Date du message (généré automatiquement)
})
```

---

Et bien entendu, n'oubliez pas de mettre à jour votre `index.ts` dans le dossier `schema` pour exporter ces schémas, c'est le **Barrel Export**.

```ts
import { users } from "./users";
import { posts } from "./posts";
import { comments } from "./comments";
import { rooms } from "./rooms";
import { messages } from "./messages";

export {
    users,
    posts,
    comments,
    rooms,
    messages
}
```

### Repositories

Passons désormais à la couche inférieure. Nous allons créer les repositories pour les messages et les salons.

Nous allons rester dans quelque chose de simple, à savoir créer un salon, écrire un message, en supprimer, et récupérer les messages d'un salon.

Vous avez l'habitude de rédiger des repositories, donc je vous laisse le faire.
Voici les instructions à suivre :

- `RoomRepository` a deux méthodes :
    - `createRoom` pour créer un salon. Nous n'avons aucune données à insérer, car la table ne contient uniquement l'identifiant, donc il faudra rédiger la requête comme suit :
    ```ts
    return db.insert(rooms).values({}).execute();
    ```
    - `getMessagesRoom(roomId: string)` pour récupérer les messages d'un salon. Il faut récupérer l'`id` des messages, le contenu, et des informations sur l'auteur d'un un objet `author`, et bien entendu, la date du message.

- `MessageRepository` a deux méthodes :
    - `createMessage(roomId: string, author: string, content: string)` pour créer un message. Il faudra insérer le contenu, l'auteur, et le salon dans la base de données.
    - `deleteMessage(id: string, userId: string)` pour supprimer un message. `id` étant l'id du message. Le message ne pourra être supprimé que par son auteur.

### Services

Calquez vos Services sur vos Repositories. Les services devront appeler les méthodes des repositories, et les manipuler si besoin. Le Service sert à sanitiser les données, et à les manipuler avant de les envoyer à la base de données. Donc pensez à faire les contrôles nécessaires directement dans les services.

- `RoomService` :
    - `createRoom()` pour créer un salon
    - `getAllMessagesRoom(roomId: string)` pour récupérer les messages d'un salon
- `MessageService` :
    - `sendMessage(data: { roomId: string, author: string, content: string })` pour créer un message
    - `deleteMessage(data: { id: string, userId: string })` pour supprimer un message. `id` étant l'id du message, et `userId` l'id de l'utilisateur faisant appel à la méthode.

Très bien, vous avez mis en place le schéma, les repositories, et les services.

Avant de passer à la partie contrôleur, nous allons voir comment mettre en place Socket.io dans notre application.

### Installation de socket.io dans l'application

Il faut savoir que les instances express ont du mal à fonctionner avec Socket.io. Il est donc recommandé de créer un serveur HTTP à part pour Socket.io, et injecter l'instance d'Express dans ce serveur HTTP, dans lequel on a aussi injecté Socket.io.

Voici comment faire :

```ts
// app.ts
// .......

import http from 'http';

const app = express();

// Notre serveur HTTP pour Socket.io avec l'instance d'Express injectée
const server = http.createServer(app);

// ....

/* On remplace notre app.listen par server.listen, car c'est notre serveur HTTP qui va écouter et non
plus notre instance d'Express */
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
```

Voilà pour le moment.

Mais là, nous n'avons encore mis de socket nul part, il faudrait injecter ca dans notre serveur HTTP.
Nous allons donc créer notre fichier `infrastucture/web/sockets/server.ts` pour initialiser Socket.io:

```ts
// infrastructure/web/sockets/server.ts

// Nous importons Server de socket.io
import { Server } from "socket.io";

// http sera utilisé pour le typage de notre paramètre
import http from "http";

import env from "../../../config/env";

const { FRONTEND_URL } = env;

export function initializeSocketServer(server: http.Server): Server {
    // Nous allons configurer notre serveur Socket.io avec un cors, comme pour celui que nous avons configuré pour Express
    const io = new Server(server, {
        cors: {
            origin: FRONTEND_URL,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            credentials: true
        }
    });

    // On retourne notre serveur Socket.io
    return io;
}
```

Vous vous dites désormais que ca n'explique toujours pas comment fonctionne les sockets. Quid de tout les `socket.emit` et `socket.on` que nous avons vu dans les cours précédents ?

Nous y venons ! 
Nous allons donc créer, dans le même dossier, un fichier `events.ts` qui va s'occuper d'écouter et d'émettre tout les événements socket de notre application.

```ts
// infrastructure/web/sockets/events.ts
import { Server } from "socket.io";

export function setupSocketEvent(io: Server) {
    
    /* Comme vu dans les cours précédents, nous allons écouter les événements ici, à l'intérieur de cette fonction qui sert de handshake.
    C'est à dire, au moment où le client se connecte en websocket, on va écouter les événements ici. */
    io.on('connection', (socket) => {
        console.info(`${socket.id} connected`);

        // Lorsque le client emit un socket "createRoom", on appelle la fonction "createRoom" ici présente
        socket.on("createRoom", () => {
            // Fonction pour créer un salon
        });

        // Lorsque le client emit un socket "joinRoom", on appelle la fonction "joinRoom" ici présente
        socket.on('joinRoom', (roomId: string) => {
            // Fonction pour rejoindre un salon
        });

        // Lorsque le client emit un socket "sendMessage", on appelle la fonction "sendMessage" ici présente
        socket.on('sendMessage', (data) => {
            // Fonction pour envoyer un message
        });

        // Lorsque le client emit un socket "deleteMessage", on appelle la fonction "deleteMessage" ici présente
        socket.on('deleteMessage', (data: { id: string, roomId: string }) => {
            // Fonction pour supprimer un message
        });

        // Lorsque le client rafraichit la page, quitte l'onglet, etc.... on notifie de sa déconnexion
        socket.on('disconnect', () => {
            console.info(`${socket.id} disconnected`);
        });

    });
}
```

Vous voyez en paramètre de notre callback de notre handshake, nous avons un objet `socket`. C'est cet objet qui va nous permettre d'émettre et d'écouter des événements.

Il a plusieurs propriétés et méthodes. Parmis les méthodes intéressantes, nous avons :
- `socket.emit()` pour émettre un événement
- `socket.on()` pour écouter un événement
- `socket.join()` pour rejoindre une room
- `socket.leave()` pour quitter une room

Et parmis les propriétés intéressantes, nous avons :
- `socket.id` pour récupérer l'identifiant du socket
- `socket.rooms` pour récupérer les rooms auxquelles le socket appartient

Il faut savoir, qu'à la connexion d'un utilisateur, un socket est créé. Ce socket est unique, et est propre à l'utilisateur. C'est grâce à cet identifiant que nous allons pouvoir identifier l'utilisateur.

Si un autre utilisateur se connecte, un autre socket sera créé, et n'écrasera pas les sockets des autres utilisateurs. C'est à dire que l'utilisateur A qui s'est connecté aura toujours son `socket.id` identique tant qu'il ne se déconnecte pas.

Pour se déconnecter d'un serveur Socket.io, il suffit de fermer la connexion, ou de fermer l'onglet du navigateur. C'est à ce moment que l'événement `disconnect` sera émis. Rafraichir la page ou fermer l'onglet, émettra un événement `disconnect`.

Maintenant nous avons tout nos événements, il ne reste plus qu'à les implémenter à notre serveur socket.io.

```ts
// infrastructure/web/sockets/server.ts

// Nous importons Server de socket.io
import { Server } from "socket.io";

// http sera utilisé pour le typage de notre paramètre
import http from "http";

import { setupSocketEvent } from "./events";
import env from "../../../config/env";

const { FRONTEND_URL } = env;

export function initializeSocketServer(server: http.Server): Server {
    // Nous allons configurer notre serveur Socket.io avec un cors, comme pour celui que nous avons configuré pour Express
    const io = new Server(server, {
        cors: {
            origin: FRONTEND_URL,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            credentials: true
        }
    });
    // On appelle notre fonction pour écouter les événements
    setupSocketEvent(io);

    // On retourne notre serveur Socket.io
    return io;
}
```

Désormais, nous avons notre serveur Socket.io qui écoute les événements, et qui est prêt à recevoir des connexions. Cependant, nous n'avons toujours pas intégré Socket.io à notre serveur HTTP. On retourne donc à l'intérieur du moteur de notre application, `app.ts`.

```ts
// app.ts

// .......

import { initializeSocketServer } from "./infrastructure/web/sockets/server";

// .....
const app = express();
const server = http.createServer(app);
initializeSocketServer(server);

// .....
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
```

Nous avons donc notre serveur Socket.io qui est prêt à recevoir des connexions. Il reste néanmoins la partie que nous avons volontairement skip pour plus de clarté : les contrôleurs.

### Contrôleurs

Comme nous l'avons vu dans les cours précédents, les contrôleurs des websockets sont différents des contrôleurs HTTP. En effet, les contrôleurs HTTP sont des fonctions qui sont appelées lorsqu'une route est appelée. Les contrôleurs Socket.io sont des fonctions qui sont appelées lorsqu'un événement est émis.

Un contrôleur websocket n'aura donc pas accès à la requête HTTP, et n'envoiera pas de réponse HTTP. Il n'aura pas non plus accès à des middlewares.

Ce sont simplement des fonctions qui vont faire appels à vos services. Et pour bien les distinguer, nous avons créer un sous-dossier `sockets` dans le dossier `controllers`, et un fichier par contrôleur.

#### MessageController

Voici un exemple de contrôleur pour les messages :

```ts
// src/infrastructure/web/controllers/sockets/MessageController.ts

import { Socket } from "socket.io";
import { MessageService } from "../../../../domain/services/MessageService";

const messageService = new MessageService();

// Fonction (controller) pour envoyer un message
export const sendMessage = async (socket: Socket, data: { authorId: string, roomId: string, content: string }, userId: string) => {
    try {
        // On envoit un message (création en db)
        const message = await messageService.sendMessage({...data, author: userId})
        if (!message) // Si aucun message (ca veut dire que le service à planté)
            throw new Error("Impossible de créer le message"); // On rentre dans le catch
        socket.to(data.roomId).emit("message", message); // On envoit un socket à tout les autres clients dans la data.roomId avec en information
        // le message nouvellement crée
    } catch (error) {
        console.error(error);
        socket.emit("error", "Impossible de créer le message");
    }
}

export const deleteMessage = async (socket: Socket, data: { id: string, roomId: string }, userId: string) => {
    try {
        // On supprime le message indiqué en paramètre de la fonction, et on notifie tout les clients dans la data.roomId de sa
        // suppression
        await messageService.deleteMessage({ ...data, userId });
        socket.to(data.roomId).emit('deletedMessage', data.id);
    } catch (error) {
        console.error(error);
        socket.emit("error", "Impossible de supprimer le message");
    }
}
```

Comme vous pouvez le voir, nous sommes dans un paradigme différent de celui des contrôleurs HTTP. Nous n'avons pas de requête, pas de réponse, et pas de middlewares. Nous avons simplement un socket, et des données.

Vous voyez qu'on n'envoit pas de réponse si le contrôleur se passe bien, mais on émet un socket à tout les autres clients connectés avec des `socket.to().emit()`, et s'il y a un problème, on notifie l'utilisateur à l'origine de l'événement avec `socket.emit("error")`.

#### RoomController

Voici un exemple de contrôleur pour les salons :

```ts
// src/infrastructure/web/controllers/sockets/RoomController.ts

import { Socket } from "socket.io";
import { RoomService } from "../../../../domain/services/RoomService";

const roomService = new RoomService();

export const joinRoom = async (socket: Socket, roomId: string) => {
    try {
        // On commence par récupérer tout les messages de la room
        const messages = await roomService.getAllMessagesRoom(roomId); 
        // On rejoint cette même room dans le socket (cad on pourra recevoir tout les messages de cette room à l'avenir)
        socket.join(roomId);
        // On envoit au client (AU SINGULIER), cad l'emetteur initial, la liste des messages de la room
        socket.emit("messages", messages);
    } catch (error) {
        console.error(error);
        socket.emit("error", "Impossible de rejoindre la salle");
    }
}

export const createRoom = async (socket: Socket) => {
    try {
        // On crée simplement la room, et on renvoit l'information de création (cad son id) à l'émetteur du socket
        const room = await roomService.createRoom();
        socket.emit("room", room);
        socket.join(room.id);
    } catch (error) {
        console.error(error);
        socket.emit("error", "Impossible de créer la salle");
    }
}
```

Exactement la même chose. Nous avons néamoins une fonction intéressante, à savoir `socket.join()`. Cette fonction permet de rejoindre une room, et donc de recevoir tout les messages de cette room à l'avenir.

#### Ajout des contrôleurs à nos événements

Il ne reste plus qu'à ajouter nos contrôleurs à nos événements. Pour cela, nous allons modifier notre fichier `events.ts` :

```ts
// infrastructure/web/sockets/events.ts

import { Server } from "socket.io";
import { joinRoom, createRoom } from "../controllers/sockets/RoomController";
import { sendMessage, deleteMessage } from "../controllers/sockets/MessageController";

export function setupSocketEvent(io: Server) {
    
    io.on('connection', (socket) => {
        console.info(`${socket.id} connected`);

        socket.on("createRoom", () => {
            createRoom(socket);
        });

        socket.on('joinRoom', (roomId: string) => {
            joinRoom(socket, roomId);
        });

        socket.on('sendMessage', (data) => {
            sendMessage(socket, data, socket.id);
        });

        socket.on('deleteMessage', (data: { id: string, roomId: string }) => {
            deleteMessage(socket, data, socket.id);
        });

        socket.on('disconnect', () => {
            console.info(`${socket.id} disconnected`);
        });

    });
}
```

Et voilà, emballé c'est pesé. Vous avez désormais un serveur Socket.io qui écoute des événements, et qui appelle des contrôleurs pour gérer ces événements. Ces mêmes contrôleurs émettent des sockets à tout les autres clients connectés, et notifient l'utilisateur à l'origine de l'événement en cas d'erreur.

Vous avez donc une application avec une architecture hexagonale, et Socket.io intégré à cette architecture. Félicitations !

## Liens utiles

- [Socket.io](https://socket.io/)
- [Socket.io - Documentation](https://socket.io/docs/v4/server-api/)
- [Socket.io - Emit cheatsheet v.4](https://socket.io/docs/v4/emit-cheatsheet/)
- [Socket.io - Rooms](https://socket.io/docs/v4/rooms/)