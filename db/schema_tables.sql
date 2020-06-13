-- NOTE!!  THIS SCRIPT IS NOT USED, ONLY AVAILABLE FOR TABLE SCHEMA REFERENCE

-- Log into mysql  $ `mysql -u root -p`
-- To run, under the mysql command line, 
--   mysql> source ./db/schema.sql
--   mysql> source ./db/seeds.sql

-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;
-- CREATE DATABASE
CREATE DATABASE ecommerce_db;
-- Connect to the new database
USE ecommerce_db;
show databases;

-- Delete any tables before recreating
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS product_tag;

show tables;
----------------------  Create the tables manually for testing only --------------------
CREATE TABLE category (
    id INTEGER NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
    );

-- after creating the table, show its schema
describe category;

-- original w\o Foreign Key
    -- CREATE TABLE product (
    --     id INTEGER NOT NULL AUTO_INCREMENT,
    --     product_name VARCHAR(30) NOT NULL,
    --     price DECIMAL NOT NULL, 
    --     stock INTEGER NOT NULL, 
    --     PRIMARY KEY(id)
    --     );

-- with Foreign Key
CREATE TABLE product (
    id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    price DECIMAL NOT NULL, 
    stock INTEGER NOT NULL, 
    category_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(category_id)
        REFERENCES category(id)
    );

-- after creating the table, show its schema
describe product;

----------
-- to do's: 
-----------
-- product table, stock column: add stock default value of 10 -- in seeds.sql script
-- product table, stock column: add validation that the value is numeric -- where?
  
CREATE TABLE tag (
    id INTEGER NOT NULL AUTO_INCREMENT,
    tag_name VARCHAR(30) NULL,
    PRIMARY KEY(id)
    );

describe tag;

CREATE TABLE product_tag (
    id INTEGER NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (product_id)
        REFERENCES product(id),
    FOREIGN KEY (tag_id)
        REFERENCES tag(id)
    );

describe product_tag;

-- change to the ecommerce database
USE ecommerce_db;
-- all tables
describe category;describe product;describe tag;describe product_tag;


