Task list, How to complete this project:

1. create the database, tables, fk constraints, seed the tables
    create the sql queries for each CRUD
        read
        create
        update
        delete
2. create the API routes (functions and sequelize queries), per CRUD - one for each 
      read
        complete an Insomnia test
      create
        complete an Insomnia test
      update    
        complete an Insomnia test
      delete
        complete an Insomnia test
3. create specialized queries
4. create the API routes with sequelize queries
5. complete the walkthrough for each acceptance criteria items



## Schema
- To view the mysql database scheme from the terminal, initiate the MySQL command line, 
by typing:  `mysql -u root -p`  in your command line, then add your MySQL password when prompted.

- Check the mysql database and tables were created by running in the MySQL command line,
* mysql> `USE ecommerce_db;` show tables; `describe Category; describe Product; describe Tag;describe ProductTag;`
- You should see this result
- ![showtables](./img/<insert>.jpg "Show tables")

- Check the tables after seeding by running in the mysql command line,
* mysql> `select * from category; select * from product; select * from tag; select * from product-tag;`
- You should see this result
- ![selecttables](./img/<insert>.jpg "Select tables")