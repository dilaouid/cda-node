# Sujet de TP Final en binôme : application express / TS avec architecture hexagonale

## Objectif général

Ce travail pratique final a pour objectif de vous faire appliquer les concepts d'architecture hexagonale et de collaboration via Git, dans le développement d'une application Express.js en Typescript. Chaque binôme sera chargé de développer quatre blocs fonctionnels distincts, deux par personne, tout en veillant à l'intégration et à la cohérence de l'ensemble.

## Consignes spécifiques

### Répartition des tâches

- **Binôme A** :
  - Développera deux blocs fonctionnels de l'application. Chaque bloc comprendra son propre ensemble de repository, service, controller, entité, et mock.
  - Par exemple, pour une application de gestion de contenu, le Binôme A pourrait développer les fonctionnalités relatives aux articles et aux catégories. Il faut que les deux entités soient en relation les unes avec les autres.

- **Binôme B** :
  - Développera deux autres blocs fonctionnels distincts de ceux du Binôme A, suivant la même structure (repository, service, controller, entité, et mock).
  - Par exemple, en continuant sur l'exemple de l'application de gestion de contenu, le Binôme B pourrait s'occuper des utilisateurs et des commentaires.

### Exigences Techniques

1. **Relation entre les blocs** : Assurez-vous que vos blocs fonctionnels sont interdépendants. Par exemple, les articles doivent pouvoir être associés à des catégories et des commentaires.

2. **Authentification** :
   - Implémenter un système d'authentification permettant de créer des utilisateurs et de se connecter.
   - Les actions de création dans les blocs fonctionnels doivent être sécurisées et nécessiter une authentification.

3. **Middleware d'authentification** :
   - Créer un middleware vérifiant l'authentification des utilisateurs pour les routes nécessitant une authentification.
   - Bonus pour l'implémentation d'un système de refresh token.

4. **Tests** :
   - Chaque binôme doit écrire au moins un test pour l'une de ses fonctionnalités développées, en veillant à sa pertinence.

5. **Documentation du code** :
   - Documenter clairement chaque partie du code (fonctions, méthodes, classes) pour en faciliter la compréhension et la maintenance.

6. **TypeSafety et variables d'env** :
   - Veiller à ce que tout le code soit typesafe, y compris les variables d'environnement.

### Livrables

- Le **lien vers un repository GitHub (ou autre)** contenant votre code source complet et vos branches.

Bonne chance ! :D
Vous inquiétez pas, vous allez y arriver !
