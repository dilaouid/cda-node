# Introduction

Rebonjour ! C'est un plaisir de vous ré-écrire à tous ! Commencons une nouvelle semaine, dans la bonne humeur, et dans l'apprentissage d'un tas de nouvelles choses !!
La dernière fois, nous nous sommes quitté sur votre TP final, *j'espère que vous l'avez encore, il vous servira pour plus tard.*

Cette semaine, nous allons approfondir certains concepts avancés tout en intégrant de nouvelles technologies et méthodologies de développement. Nous allons évoluer notre architecture de projet pour adopter un monorepo, intégrer une base de données réelle avec un ORM, et explorer les fonctionnalités des websockets. Beaucoup de nouvelles notions, mais rassurez-vous, ce sera beaucoup moins intense que la semaine dernière ! ;)

## Table des matières

- [Programme de la semaine](#programme-de-la-semaine)
- [Monorepo](#monorepo)
  - [Qu'est-ce qu'un "monorepo" ?](#qu'est-ce-qu'un-monorepo-)
  - [Avantages](#avantages)
  - [Structure](#structure)
- [Transition vers la configuration CORS](#transition-vers-la-configuration-cors)

## Programme de la semaine

1. **Application du CORS à notre serveur Express** : Nous allons commencer par configurer le Cross-Origin Resource Sharing (CORS) pour permettre à notre frontend de communiquer sans restriction avec notre backend. Qu'est-ce que le CORS et pourquoi est-il important ? Nous le découvrirons ensemble.

2. **Conversion des Mocks en une véritable base de données PostgreSQL avec ORM (Drizzle)** : Nous passerons de simples fichiers JSON mock à une base de données PostgreSQL gérée via l'ORM Drizzle, afin d'apporter une persistance et une gestion des données plus robuste. Je justifierai également pourquoi le choix de Drizzle, mais aussi de pourquoi je n'ai pas choisi d'autres ORM comme Sequelize, TypeORM ou Prisma. Bien sûr, ici, on reste tech agnostique !

3. **Approfondissement des tests** : Nous renforcerons nos compétences en matière de tests, mais vraiment en diagonale, c'est une notion de la première semaine mais j'aimerai qu'on la revoit suite à la demande de pas mal d'entre vous.

4. **Introduction aux Websockets avec Socket.io** : En fin de semaine, nous aborderons les websockets pour permettre une communication en temps réel entre le client et le serveur, ce qui est crucial pour ... vous découvrirez bien assez tôt ! ;)

## Monorepo

### Qu'est-ce qu'un "monorepo" ?

Un monorepo est une approche de gestion de plusieurs projets dans un seul dépôt git. Cette approche nous permet de centraliser toute la configuration à un seul endroit, de partager des dépendances communes et de faciliter la maintenance globale du projet. L'alternative, c'est d'avoir un dépôt pour son frontend, un autre pour son backend, et un autre pour ses librairies partagées, ce qui peut rapidement devenir compliqué à gérer.

Je précise néanmoins, avoir un seul dépôt git avec un dossier `frontend` et un dossier `backend` n'est pas **forcément** un monorepo. Il faut que ces deux dossiers soient connectés, partagent des dépendances, et soient construits ensemble pour que ce soit un monorepo.

### Avantages

- **Simplicité de gestion** : Un seul dépôt pour plusieurs projets simplifie la gestion des versions et des dépendances.
- **Partage de code** : Facilité de partager le code commun entre différents projets sans nécessiter de multiples copies ou liaisons.
- **Intégration et tests continus** : Plus efficace dans un monorepo car tout le code est au même endroit, facilitant l'exécution des tests à travers tous les projets.
- **Collaboration améliorée** : Facilite la collaboration entre les équipes travaillant sur différents projets mais dans le même dépôt.

### Structure

Pour notre projet, nous utilisons la structure suivante :

```graphql
├── packages/
│   ├── client/                 # Application frontend React avec Vite
│   └── server/                 # Application backend que vous connaissez déjà
├── package.json                # Fichier de configuration du monorepo
├── tsconfig.base.json          # Configuration TypeScript pour le monorepo
```

Les scripts définis dans le `package.json` racine permettent de lancer et de construire les applications client et serveur simultanément, utilisant l'outil `concurrently` pour exécuter plusieurs commandes en parallèle.

Je précise, vous avez donc bien `git pull`, forcément, et vous vous retrouvez avec un nouveau projet React. La galère !
Non. Vous ne toucherez **pas une seule ligne** de ce projet React cette semaine. C'est simplement pour pouvoir utiliser notre serveur Express avec un frontend React, et pour vous montrer comment fonctionne un monorepo. Vous n'avez pas besoin de comprendre le code React, ni de le modifier. Ca serait bien de simuler un véritable environnement, plutôt que de se faire chier sur Postman, non ?

## Transition vers la configuration CORS

Pour débuter avec les aspects techniques de cette semaine, nous allons configurer le CORS sur notre serveur Express. Le CORS est essentiel pour permettre à notre frontend hébergé sur un domaine différent d'interagir avec notre backend sans rencontrer de problèmes de sécurité imposés par la politique de même origine du navigateur.

Dans la prochaine section, nous aborderons comment configurer de manière sécurisée et efficace le CORS dans notre serveur Express, en préparation pour les interactions avec notre frontend React.
