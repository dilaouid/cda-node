# Socket.io dans un cadre hexagonal

Nous travaillons, depuis la 1ère semaine, sur une architecture hexagonale. Nous avons vu comment mettre en place une architecture hexagonale, et comment la mettre en place avec Express.

Cependant, il est possible d'aller plus loin, et d'ajouter Socket.io à notre architecture hexagonale. C'est ce que nous allons voir dans ce cours.

D'habitude, il est commun de voir tout le code lié à Socket.io dans le fichier principal de l'application, `app.ts` ou `server.ts`. Cependant, nous allons voir comment intégrer Socket.io dans notre architecture hexagonale, du coup en découpant le code en plusieurs parties.

Nous allons ajouter un **système de messagerie instantanée** à notre application. Il y aura des salons de discussion, et les utilisateurs pourront envoyer des messages dans ces salons.

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