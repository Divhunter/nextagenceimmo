# Vowd et Serveur Express

Ce projet est composé de deux parties : le front-end construit avec React et le serveur basé sur Express. Il a pour but de permettre aux clients de saisir des informations sur leurs projets, de les envoyer au serveur, qui les enregistre dans la base de données. De plus, un tableau de bord (dashboard) est fourni pour récupérer et afficher les données.

## Front-end (React)

### Installation

1. Clonez le dépôt Git : `git clone https://github.com/votre-utilisateur/projet-frontend.git`
2. Accédez au répertoire du projet : `cd projet-frontend`
3. Installez les dépendances : `npm install`

### Configuration

- Modifiez le fichier `.env` pour définir la configuration requise, comme l'URL du serveur API.

### Exécution

- Lancez l'application React : `npm start`
- L'application sera accessible à l'adresse `http://localhost:3000`.

## Serveur Express

### Installation

1. Clonez le dépôt Git : `git clone https://github.com/votre-utilisateur/projet-serveur.git`
2. Accédez au répertoire du serveur : `cd server`
3. Installez les dépendances : `npm install`

### Configuration

- Modifiez le fichier `.env` pour définir la configuration requise, comme les détails de la base de données.

### Exécution

- Lancez le serveur Express : `npm start` ou `npm run server`
- Le serveur sera accessible à l'adresse `http://localhost:5000`.

## Fonctionnalités

- Le front-end permet aux clients de saisir des informations sur leurs projets.
- Le serveur Express reçoit ces informations et les enregistre dans la base de données.
- Le dashboard du front-end récupère les données depuis le serveur et les affiche.


# Documentation de l'API Express pour la gestion des projets

Bienvenue dans la documentation de l'API Express pour la gestion des projets. Cette API permet de gérer les informations liées aux projets, y compris la création, la récupération et la suppression de projets.

## Authentification

L'authentification est requise pour certaines routes de cette API. Vous devez inclure un en-tête d'autorisation avec vos requêtes HTTP. Voici comment vous pouvez l'inclure :

- Remplacez `{base64_encoded_credentials}` par vos informations d'authentification. Par exemple, pour l'utilisateur "abdourouf" avec le mot de passe "1234", l'en-tête d'authentification ressemblerait à ceci en utilisant Axios :


## Routes de l'API

### Liste de tous les projets

- **URL** : `/api/projets/`
- **Méthode** : GET
- **Description** : Cette route permet de récupérer la liste de tous les projets.
- **Authentification requise** : Oui, avec un jeton valide.

Exemple d'utilisation avec Axios :

```javascript
axios.get('http://localhost:5000/api/projets/', {
  headers: {
    Authorization: 'Basic YWxleDoxMjM0' // Remplacez par vos informations d'authentification
  }
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```


