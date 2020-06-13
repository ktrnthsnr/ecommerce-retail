-- Log into mysql  $ `mysql -u root -p`
-- To run manually for testing, run under the mysql command line, 
--   mysql> source ./db/schema.sql
--   mysql> source ./db/seeds.sql

-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;
-- CREATE DATABASE
CREATE DATABASE ecommerce_db;
show databases;
-- Connect to the new database
USE ecommerce_db;

-- Delete any tables before recreating
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS product_tag;

show tables;

-- to exit the msql2 command line, type quit