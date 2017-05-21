# Gestion des unités d'enseignement
Service responsable de la gestion des unités d'enseignement (UE).

## GestionUE
Cette application, nommé _GestionUE_, permet de gérer les unités d'enseignement via une interface graphique. L'application permet de créer, modifier et supprimer des unités d'enseignement. En outre, chaque unité d'enseignement possède une liste d'activités et/ou des prérequis.

L'application offre également une **RESTful API** pour récupérer, ajouter, modifier et supprimer des unités d'enseignement et des activités.

## Installation
Avant d'installer l'application veuillez télécharger la dernière version de **Nodejs** et **NPM**. Les instructions pour installer ces composants se trouvent [ici](https://www.npmjs.com/get-npm).

Une fois les composants installés, veuillez suivre les étapes ci-dessous:

1. Clonez l'application sur votre ordinateur: `git clone https://github.com/GauthLin/GestionUE.git`.
1. Installez les dépendances de l'application. Pour ce faire, placez vous à la racine du projet: `cd GestionUE` et exécutez la commande suivante pour installer les différents dépendances: `npm install`.
1. Dès que les paquets ont bien été installés, lancez l'application `node app`. Si tout va bien, le message "_GestionUE app listening on port 3000!_" s'affiche dans la console.
1. Ouvrez votre navigation favori et entrez dans la barre d'adresse _http://localhost:3000_. Vous pouvez maintenant utiliser l'ensemble des fonctionnalités de l'application.

## Langages de programmation
Le front-end de l'application est programmé en HTML, CSS et jQuery. Quant au back-end, il utilise le framework _Nodejs_ pour sa simplicité de programmation et sa rapidité d'exécution. 

## Structure du projet
Le projet _Nodejs_ est divisé en différents fichiers et dossiers:
- **manager/**: Ce dossier contient deux fichiers: *UEManager* et *ActivityManager*. Ces fichiers offrent des méthodes implémentant la communication avec la base de données. De ce fait, pour récupérer, ajouter, modifier ou supprimer une entrée dans la base de données, il suffit d'appeler la méthode correspondante.
- **public/**: contient tous les fichiers statiques tels que les scripts JavaScript ou encore les feuilles de style.
- **routes/**: définit les routes disponibles de l'application et la logique de ces-dernières.
- **views/**: fournit l'ensemble des vues disponibles qui seront utilisées par les routes.
- **app.js**: point d'entrée du serveur _Nodejs_. Ce fichier initialise et prépare toute l'application.
- **package.json**: contient l'ensemble des dépendances du projet.

## Structure de la base de données
J'ai décidé d'utiliser une base de données rationnelle, _SQLite_, accessible par le langage SQL. Elle a une particularité par rapport aux autres bases de données tels que MySQL ou PostgreSQL. En effet, cette base de données est stockée sur un fichier indépendant de l'application. Cela permet de pouvoir travailler facilement depuis n'importe quel ordinateur (sans hérberger la base de données en ligne) en gardant les données intactes (suite à un pull par exemple).

La structure de la base de données est montrée sur la figure ci-dessous. Comme on peut le voir, elle contient 3 tables:
1. **ue**: contient l'ensemble des unités d'enseignement
1. **activities**: contient l'ensemble des activités liés à une unité d'enseignement grâce à l'attribut _ue_id_
1. **prerequisites**: contient l'ensemble des prérequis des unités d'enseignement. Les prérequis sont liés aux unités d'enseignement grâce au champ _ue_id_.

![Structure de la base de données](doc/img/db_structure.jpg "Structure de la base de données")

## Interface graphique
L'interface graphique vous permet: 
* d'ajouter, modifier et supprimer des unités d'enseignement
* d'ajouter, modifier et supprimer des activités à des unités d'enseignement.

Elle vous permet d'également afficher l'ensemble des données stockées dans la base de données.

## RESTful API
Comme expliqué précédemment, l'application offre une RESTful API disponible à l'adresse _/api_. Les requêtes disponibles sont détaillées ci-dessous:

- [GET] **/api/ue**: renvoie un tableau contenant l'ensemble des unités d'enseignement.
- [GET] **/api/ue/_:id_**: récupère les informations d'une unité d'enseignement en fonction de l'identifiant _id_.
- [PUT] **/api/ue/_:id_**: modifie les données d'une unité d'enseignement.
- [POST] **/api/ue**: crée une nouvelle unité d'enseignement.
- [DELETE] **/api/ue/_:id_**: supprime l'unité d'enseignement ayant comme identifiant _id_.


- [GET] **/api/activities**: récupère toutes les activités.
- [GET] **/api/activities/_:id_**: recupère l'activité ayant comme identifiant _id_.
- [PUT] **/api/activities/_:id_**: modifie l'activité ayant comme identifiant _id_.
- [POST] **/api/activities**: crée une nouvelle activité
- [DELETE] **/api/activities/_:id__**: supprime l'activité ayant comme identifiant _id_.

Toutes les routes de l'API sont définies dans le dossier _/routes/api/_.

## Conclusion
L'application offre les fonctionnalités suivantes:
- **Interface graphique** permettant une gestion complète des unités d'enseignement, des prérequis et des activités.
- **RESTful API** qui permet de communiquer avec le serveur depuis l'application même ou depuis des applications/services externes.
- **Base de données SQLite** qui sauvegarde de manière permanente les données.

L'application possède quelques défauts qui peuvent être améliorés. Les pistes d'amélioration sont indiquées ci-dessous:
- Améliorer la sécurité de l'application. En effet, pour l'instant seulement certaines données sont vérifiés avant de le sauvegarder.
- Lors de la création d'une activité, il est possible d'entrer un local de prédilection. Ce champ est un champ texte, l'utilisateur peut ainsi entrer n'importe quel local même inexistant. L'idée serait d'aller récupérer la liste des locaux disponibles depuis un service externe.
- Ajouter une gestion des utilisateurs. En effet, toutes les personnes disposants de l'adresse URL de l'application peuvent exécuter n'importe quelles requêtes. L'idée est donc d'ajouter un espace membre (pourrait récupérer les informations du _Service de gestion des enseignants_).
- Ajouter une clé client pour chaque utilisateur de la RESTful API. Ainsi, il faut enregistrer son application afin de recevoir une clé avant de pouvoir réaliser des requêtes depuis l'extérieur. Cette clé pourrait être utilisées pour limiter l'accès à certaines parties de l'application.


L'application peut cependant déjà être utilisée, elle est 100% fonctionnelle !
