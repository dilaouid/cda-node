# Sujet de TP final en binôme/solo : application express / TS avec architecture hexagonale (Semaine 2)

## Objectif général

Pour cette deuxième et dernière semaine, vous allez améliorer votre application développée lors de la première semaine en intégrant des fonctionnalités avancées telles que l'utilisation de bases de données avec Drizzle, la gestion des websockets pour la communication en temps réel, et la sécurisation de vos endpoints avec la gestion du CORS. Vous allez également appliquer des tests unitaires sur au moins un service pour assurer la qualité et la fiabilité de votre application.

## Consignes spécifiques

### Répartition des tâches

Chaque binôme travaillera sur l'extension de leur application existante en ajoutant deux nouveaux blocs fonctionnels chacun. Ces blocs doivent interagir avec les blocs existants pour former un système cohérent.

### Exigences

1. **Intégration de Drizzle** :
   - Remplacez les mocks par une vraie base de données utilisant Drizzle. 
   - Effectuez des migrations appropriées pour structurer votre base de données.
   - Adaptez vos repositories pour interagir avec la base de données via Drizzle.

2. **Websockets avec Socket.io** (**_BONUS_**) :
   - Intégrez Socket.io pour permettre la communication en temps réel, vous êtes libre de choisir les fonctionnalités à ajouter à votre application, seulement, ça doit être placé dans le cadre d'une architecture hexagonale. Autremement dit, pas de `io.on('connection', ...)` dans votre `app.ts`. Même si c'est du bonus, vous ne gagnerez pas de points si vous ne respectez pas l'architecture hexagonale. Mais si vous le faites, c'est un gros plus pour vous.

3. **Gestion du CORS** :
   - Configurez correctement CORS pour sécuriser les requêtes entre différents domaines, notamment entre votre serveur backend et le client frontend (si utilisé).

4. **Tests unitaires** :
   - Rédigez des tests pour au moins un de vos services en utilisant Jest pour valider les fonctionnalités de base et la logique métier.
   - Assurez-vous que vos tests couvrent les cas d'usage critiques de votre application.

5. **Documentation et typesafety** :
   - Documentez tout le code développé pendant cette semaine pour assurer sa compréhension et sa maintenance.
   - Veillez à ce que tout le code soit typesafe, incluant les interactions avec la base de données.

6. **Nouveaux blocs fonctionnels** :
   - Chaque binôme doit ajouter au moins deux nouveaux blocs fonctionnels à l'application. Ces blocs doivent inclure des routes utilisant différentes méthodes HTTP (GET, POST, PUT, DELETE). Du coup, si vous êtes seul, vous devez ajouter 4 nouveaux blocs fonctionnels. **Il faut appliquer des relations entre les différents schémas de données.**

### Livrables

- Le **lien vers le repository GitHub (ou autre)** contenant le code source complet de votre application, incluant les nouvelles fonctionnalités développées durant cette semaine.

Bonne chance et utilisez au mieux les connaissances acquises durant ces deux semaines pour réaliser un projet solide et professionnel ! Vous avez toutes les clés en main pour réussir !!! :D

Rappelez vous, l'important, ce n'est pas de faire des points pour une note. L'important, c'est de comprendre et de savoir faire. Ce TP final sera le reflet de votre accomplissement durant ces deux semaines. Alors, donnez le meilleur de vous-même et surtout, amusez-vous !

### A savoir

Pour les apprenants n'ayant pas été là la première semaine pour le TP final, vous pouvez commencer directement par cette semaine en créant une application Express.js en Typescript avec une architecture hexagonale. Ce que je vous demande, c'est de voir le TP final de la première semaine, et de le faire. Seulement à quelques différences près :
- Pas de mock mais une DB
- Présence de la gestion du CORS