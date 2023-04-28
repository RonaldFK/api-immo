[![forthebadge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ronald-fonlebeck)
[![forthebadge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://forthebadge.com)
[![forthebadge](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://forthebadge.com)
[![forthebadge](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](#)
[![forthebadge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)

## README :

### Projet :

Api-immo est un projet d'api pour application immobilière.<br />
L'idée est de constuire une base de données en rapport avec les besoins d'une agence immobilière classique et de mettre à disposition une API pour servir ces données.
Cela permet pour l'instant de gérer les biens dans une application web

<img width="1731" alt="projet immo" src="https://user-images.githubusercontent.com/90004972/235125856-f5c52435-cef4-4624-b0bf-9c5bc1bb2dcf.png">


### Outils :

- TypeOrm pour les échanges avec la base de données.
- Docker pour exécuter la SGBD Postgres.
- PostgresSQL pour le stockage des données de l'application.
- Bcrypt pour le chiffrage des mots de passe.
- Joi pour la validation des données ( pour le formulaire d'inscription ).
- Json Web Token.
- Documentation API avec swagger

## Prérequis :

### Cloner le projet :
```
git@github.com:RonaldFK/api-immi.git
```
### Installer les dépendances :
Compléter le .env.example avec vos infos
### Installer les dépendances :

```bash
npm i
```

### Création des tables de la base de données :

Utilise les scripts dans  /database

### Démarré le projet

```
npm start
```

