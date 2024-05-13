# Installation et Configuration de l'Environnement de Développement

Après avoir découvert ce qu'est Node.js et ses multiples facettes, il est temps de plonger dans le concret. La première étape de toute aventure de développement est de préparer votre environnement de travail. Aujourd'hui, nous allons parcourir ensemble l'installation de Node.js et la configuration nécessaire pour utiliser les ES Modules, un standard moderne pour l'organisation et le chargement de votre code JavaScript.

## Installation de Node.js

Node.js peut être installé de plusieurs façons, mais nous allons nous concentrer sur la méthode la plus directe : télécharger les binaires depuis le site officiel.

### Pour Windows et MacOS

1. **Accédez au [site officiel de Node.js](https://nodejs.org/)**. Vous y trouverez deux versions : LTS (Long Term Support) et Current. La version LTS est recommandée pour la plupart des utilisateurs, car elle est plus stable et mieux supportée sur le long terme.
2. **Téléchargez l'installateur** correspondant à votre système d'exploitation et exécutez-le. L'assistant d'installation vous guidera à travers les étapes nécessaires. Par défaut, il configurera correctement Node.js et npm (Node Package Manager) sur votre machine.

### Pour les Utilisateurs Linux

Les utilisateurs Linux peuvent installer Node.js via le gestionnaire de paquets de leur distribution. Voici un exemple pour Ubuntu et dérivés :

```shell
sudo apt update
sudo apt install nodejs npm
```

### Vérification de l'Installation

Pour vérifier que Node.js et npm sont correctement installés, ouvrez un terminal ou une invite de commande et tapez :

```shell
node --version
npm --version
```

Si tout s'est bien passé, vous devriez voir les versions installées de Node.js et npm.

## Conclusion

Félicitations ! :D
Vous avez maintenant Node.js installé, vous ouvrant la porte à un développement JavaScript backend.
