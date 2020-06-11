-- Log into mysql  $ `mysql -u root -p`
-- To run, under the mysql command line, 
--   mysql> source ./db/schema.sql
--   mysql> source ./db/seeds.sql

-- clear values
-- TRUNCATE TABLE category;

-- seed the tables with testing data
INSERT INTO category (category_name)
VALUES
  ('Shirts'),
  ('Pants'),
  ('Shoes'),
  ('Socks'),
  ('Hats');

SELECT * FROM category;


-- after seeding, alter the product table to set default vaule of stock to 10
-- ALTER TABLE product ALTER COLUMN stock integer SET DEFAULT 10;