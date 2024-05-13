## Guide d'installation et configuration de PostgreSQL et pgAdmin

## Table des matières

- [Introduction à pgAdmin](#introduction-à-pgadmin)
- [Installation de PostgreSQL et pgAdmin](#installation-de-postgresql-et-pgadmin)
  - [Pour Windows](#pour-windows)
    - [Installation de PostgreSQL](#installation-de-postgresql)
    - [Installation de pgAdmin](#installation-de-pgadmin)
  - [Pour macOS](#pour-macos)
    - [Installation de PostgreSQL](#installation-de-postgresql-1)
    - [Installation de pgAdmin](#installation-de-pgadmin-1)
- [Configuration de pgAdmin](#configuration-de-pgadmin)
   - [Lancer pgAdmin](#lancer-pgadmin)
   - [Configuration Initiale](#configuration-initiale)
- [Création de la DB blog](#création-de-la-db-blog)
- [Avantages de pgAdmin](#avantages-de-pgadmin)

### Introduction à pgAdmin

**pgAdmin** est un outil open-source de gestion et de développement pour PostgreSQL, l'un des systèmes de gestion de bases de données relationnelles les plus populaires. pgAdmin offre une interface utilisateur graphique (GUI) intuitive pour interagir avec les bases de données PostgreSQL, ce qui facilite les tâches d'administration, de développement et de maintenance.

Pour certains d'entre vous, vous devez connaître phpMyAdmin, qui est un outil similaire pour MySQL. pgAdmin est l'équivalent pour PostgreSQL.

### Installation de PostgreSQL et pgAdmin

#### Pour Windows

##### Installation de PostgreSQL

1. **Téléchargement** :
   - Rendez-vous sur le site officiel de PostgreSQL : [PostgreSQL Downloads](https://www.postgresql.org/download/).
   - Sélectionnez "Windows" et téléchargez l'installateur.

2. **Installation** :
   - Double-cliquez sur le fichier téléchargé pour lancer l'installateur.
   - Cliquez sur "Next" pour commencer l'installation.

3. **Configuration** :
   - **Emplacement** : Sélectionnez le répertoire d'installation (par défaut, `C:\Program Files\PostgreSQL\<version>`).
   - **Composants** : Assurez-vous que "PostgreSQL Server" et "pgAdmin" sont sélectionnés.
   - **Répertoire de données** : Choisissez ou acceptez l'emplacement par défaut pour les données.
   - **Mot de passe superuser** : Définissez un mot de passe pour l'utilisateur `postgres` (l'administrateur de la base de données). Retenez ce mot de passe pour une utilisation ultérieure, c'est **TRÈS IMPORTANT** !!!!!!!!!!
   - **Port** : Le port par défaut est `5432`, **laissez-le tel quel**.
   - **Locale** : Choisissez votre langue et région, puis cliquez sur "Next".

4. **Finalisation** :
   - Cliquez sur "Next" puis "Finish" pour terminer l'installation.

5. **Démarrage** :
   - Le serveur PostgreSQL se lancera automatiquement. Vous pouvez vérifier son état dans le "PostgreSQL <version> Server" sous les services Windows.

##### Installation de pgAdmin

Si vous avez installé pgAdmin avec PostgreSQL, vous pouvez le lancer depuis le menu Démarrer. Si vous préférez installer pgAdmin séparément :

1. **Téléchargement** :
   - Allez sur le site officiel de pgAdmin : [pgAdmin Downloads](https://www.pgadmin.org/download/).

2. **Installation** :
   - Suivez les instructions de l’installateur après téléchargement.

#### Pour macOS

##### Installation de PostgreSQL

1. **Téléchargement** :
   - Visitez [PostgreSQL Downloads](https://www.postgresql.org/download/) et sélectionnez "macOS".

2. **Utilisation de homebrew** :
   - Ouvrez Terminal.
   - Installez Homebrew si ce n'est pas déjà fait : `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`.
   - Installez PostgreSQL : `brew install postgresql`.

3. **Démarrage du serveur PostgreSQL** :
   - Démarrez PostgreSQL : `brew services start postgresql`.
   - Créez une base de données par défaut : `createdb $(whoami)`.

##### Installation de pgAdmin

1. **Téléchargement** :
   - Rendez-vous sur [pgAdmin Downloads](https://www.pgadmin.org/download/).

2. **Installation** :
   - Téléchargez le package `.dmg` et double-cliquez pour l’ouvrir.
   - Faites glisser l’icône pgAdmin dans le dossier Applications.

### Configuration de pgAdmin

#### Lancer pgAdmin

1. **Windows** :
   - Ouvrez pgAdmin depuis le menu Démarrer : `PostgreSQL <version>` > `pgAdmin 4`.

2. **macOS** :
   - Ouvrez le dossier Applications et double-cliquez sur `pgAdmin`.

#### Configuration Initiale

1. **Créer un serveur (si le serveur PostgreSQL n'est pas déjà configuré)** :
   - **Ajouter un nouveau serveur** :
     - Sur l'icône "Servers" dans la barre latérale, faites un clic droit et sélectionnez "Register" > "Server...".

2. **Config** :
   - **General** :
     - **Name** : Entrez "3wa".
   - **Connection** :
     - **Host name/address** : `localhost`.
     - **Port** : `5432`.
     - **Maintenance database** : `postgres`.
     - **Username** : `postgres` (l'utilisateur par défaut, à moins que vous n'ayez créé un autre utilisateur).
     - **Password** : Le mot de passe défini lors de l'installation (dans cette étape: [Installation de PostgreSQL](#installation-de-postgresql)).

3. **Sauvegarder** :
   - Cliquez sur "Save" pour enregistrer les paramètres.

### Création de la DB blog

1. **Créer une DB** :
   - Cliquez droit sur `Servers` > `(Votre serveur)` > `Databases` > `Create` > `Database...`.
   - **Name** : Entrez `blog`.
   - **Owner** : Assurez-vous que `postgres` est sélectionné.
   - Cliquez sur `Save`.

2. **Fin** :
   - Sous `Databases`, vous devriez voir `blog` listée. Pour voir les tables, vous déployez simplement, la base de données, et vous allez dans `Schemas` > `public` > `Tables`. Normalement, il n'y a pas de tables pour l'instant.

### Avantages de pgAdmin

- **UI** : Offre une interface conviviale pour gérer les bases de données.
- **Gestion des objets** : Facile à utiliser pour créer, modifier et supprimer des objets de base de données (tables, vues, fonctions, etc.).
- **Support multi-plateforme** : Disponible sur Windows, macOS, et Linux.
- **Outils de développement** : Inclut des fonctionnalités pour la création de requêtes, l'analyse de performances, et la gestion des utilisateurs et des rôles.
