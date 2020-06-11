# E-Commerce Back-End Exercise

## GitHub repository
https://github.com/ktrnthsnr/ecommerce-retail


## Table of Contents
* [Description](#description)
* [Installations](#installations)
* [Usage](#usage)
* [Technology](#technology)
* [Contribution](#contribution)

## Description
- This E-Commerce Back-End repo project demonstrates the work to setup database schema and tables, and given an already bulit frontend, also setting up the API routes and connections from the frontend to the database and server of an e-commerce website. 

- Given a working Express.js API, the work involves using MySQL2 and Sequelize to interact with the MySQL database. The backend work included in this process was as follows:
    - created the database, table schema, and seeding scripts that will be run on the MySQL shell
    - created the model associations, foreign key relationships, through join Sequelize constructions
    - added the GET routes for all tables - categories, product, and tags tested in Insomnia
    - added the GET routes for single selections from each table tested in Insomnia
    - added POST, PUT, DELETE routes (create, read, update, and delete operations) for products, category and tags using the Sequelize models, and test in Insomnia
    - used MySQL2 and Sequelize packages to connect to the MySQL database
    - used the dotenv package to store sensitive data in environment variables
    - synced Sequelize models to MySQL database and demonstrated the app usage

## Installations
- Prereq: install VSCode, Node.js, and MySQL http://dev.mysql.com/downloads/
- After cloning the GitHub repo to your local drive, run the following in the VSCode command-line terminal. First change directory to the /Develop folder, then run
- Install npm
- $ `npm init -y` or $ `npm install`
- Create a .gitignore file in the root and add node_modules to this file
- If you need to re-add the dependencies, run $ `npm install`
- Install Sequelize, more info https://www.npmjs.com/package/sequelize
- $ `npm install --save sequelize`
- Install MySQL anad MSQL2, create a pwd, then afterwards verify installed, $ `mysql --version`
- $ `npm install -g mysql`
- $ `npm install mysql2 --save`
- Install console.table to print MySQL in console
- $ `npm install console.table --save`
- Install Express.js
- $ `npm install express --save` or $ `npm i express`
- Install dotenv, more info https://www.npmjs.com/package/dotenv
- $ `npm install dotenv`


## Usage
- Within the VSCode terminal, start MySQL
-   $ `mysql -u root -p`
- Enter your MySQL password when prompted
- Start using the db
-   mysql> `USE ecommerce_db;`
- Create the database, tables and seed the tables
-   mysql> `npm seed`
- Run the application within the terminal and view the app locally, run
-   $ `npm start` or $ `node server.js`
- Then open your desktop's browser to http://localhost:3001/
- ![invokeapp](./img/<insert>.jpg "Start application")
- A walkthrough is included here:
<insert walkthrough link>

## Technology
MySQL, MySQL2, Express.js, Sequelize, Node.js, JavaScript, npm, HTML, CSS, dotenv

## Contribution
ktrnthsnr

### ©️2020 ktrnthsnr
