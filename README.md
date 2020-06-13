# E-Commerce Back-End
This exercise focuses on backend and middleware: Sequelize models and MySQL2 to connect to Express.js API routes and MySQL database content.

## GitHub repository
https://github.com/ktrnthsnr/ecommerce-retail


## Table of Contents
* [Description](#description)
* [Installations](#installations)
* [Usage](#usage)
* [Technology](#technology)
* [Contribution](#contribution)

## Description
- Given a working Express.js API, the work for this e-commerce back-end project involves using MySQL2 and Sequelize models to interact with the MySQL database. 

- The server-side work included:
- `creating the database, table schema`, and `seed` JavaScripts that will be run on the MySQL shell
- adding the Sequelize table `model` js scripts for each table
- adding foreign key relationships through join Sequelize constructions
- adding GET `routes` for all tables - categories, product, and tags and then test via Insomnia
- adding GET `routes` for single selections from each table, then test via Insomnia
- adding POST, PUT, DELETE `routes` (create, read, update, and delete operations) for products, category and tags using the Sequelize models, then test via Insomnia
- using MySQL2 and Sequelize packages to connect to the MySQL database
- using the dotenv package to store sensitive data in environment variables
- syncing Sequelize models to MySQL database and demonstrating the browser rendering content based upon the models, connecting to the backend tables via the API endpoints, viewed in the walkthrough through the Insomnia tool

## Installations
- Prereq: install VSCode, Node.js, and MySQL http://dev.mysql.com/downloads/
- After cloning the GitHub repo to your local drive, run the following in the VSCode command-line terminal. 
- First CD into the /Develop folder, `$ cd Develop` then run the following:
- Intialize npm
- $ `npm init -y`
- Create a .gitignore file in the root and add node_modules to this file
- If you need to re-add the dependencies, run $ `npm install`
- Install Express, Sequelize and mysql2
- $ `npm install express sequelize mysql2`
- If you need to install separately:
    - Install Express.js
    - $ `npm install express --save` or $ `npm i express`
    - Install Sequelize, more info https://www.npmjs.com/package/sequelize
    - $ `npm install --save sequelize`
    - $ `npm install -g sequelize-cli`
    - (No need to iniatize as the configuration files are installed, $ `sequelize init`)
    - Install MySQL anad MSQL2, create a pwd, then afterwards verify installed, $ `mysql --version`
    - $ `npm install -g mysql`
    - $ `npm install mysql2 --save`
- Install console.table to print MySQL in console
- $ `npm install console.table --save`
- Install dotenv, more info https://www.npmjs.com/package/dotenv
- $ `npm install dotenv`
- Install a body-parser module to parse JSON payloads
- `npm install body-parser --save`
- Install Insomnia locally to test the GET, POST, PUT, and DELETE API endpoints per the routes.


## Usage
- Within the VSCode terminal, start MySQL
-   $ `mysql -u root -p`
- Enter your MySQL password when prompted

- Create the database 
-   mysql> `source db/schema.sql`
- Validate database was created
-   mysql> `show databases`

- Start using the db
-   mysql> `USE ecommerce_db;`

- Create and seed the tables for testing purposes in the terminal
-   $ `npm run seed`
- Validate tables were created
-  mysql>`describe category;describe product;describe product_tag;describe tag;`
- Validate tables were populated
-  mysql>`select * from category;select * from product;select * from product_tag;select * from tag;`

- Run the application locally, to start the Express.js, sync w/Sequelize, and also create and seed the tables.
-   $ `npm start` or $ `node server.js`

- Validate: View all rows within the Categories table, through a sample API endpoint. Open the Insomnia debug tool, enter a GET URL, `http://localhost:3001/api/categories`

- A walkthrough of how the application is invoked is included here, showing how the database and tables are created, rows seeded, and then validated at a route API endpoint.  The Category table is used as the example:
https://drive.google.com/file/d/1jCFMWTOneYsJO5n4JwkTgSkcd4Nhx8xB/view

## Technology
MySQL, MySQL2, Express.js, Sequelize, Node.js, JavaScript, npm, HTML, CSS, dotenv

## Contribution
ktrnthsnr

### ©️2020 ktrnthsnr
