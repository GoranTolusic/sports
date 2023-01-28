# SPORTS CLASS APPLICATION
# HINT: This application is writting from scratch on top of micro framewrok Express.js, whole architecture and folder structure is designed and coded by myself


-RUN WITHOUT DOCKER-

SETUP sports project (Make sure that Node.js (version >= 12, except for v13) is installed on your operating system and npm)

Requirements:

- Installed Node.js version >= 12 except for v13
- Installed npm version >= 6
- Running mysql server

Need to fill initial credentials in .env file (database and admin user credentials)

In terminal run "npm run installApp" in root folder. This will:

    -> install dependencies

    -> If not exists, this will create database utf8_unicode_ci with same name as defined in .env file (DB_DATABASE variable)

    -> run migrations

    -> run seeders for dummy/test data (make sure you fill admin credentials)




-RUN THROUGH DOCKER IMAGE-

SETUP OUT-OF-THE-BOX sports project

Requirments:

- Installed and running Docker on your OS system
- Installed npm package manager on your OS system

Need to fill initial credentials in .env file (database and admin user credentials)

In terminal "npm run dockerDeploy". This will:

    -> Automaticaly build and run services needed for project

    -> If not exists, this will create database utf8_unicode_ci with same name as defined in .env file (DB_DATABASE variable)

    -> run migrations

    -> run seeders for dummy/test data (make sure you fill admin credentials)



In database/seeds/01_users.ts is list of users and their passwords
API requests exaples and all routes are provided in exported postman collection, so please import postmanDocumentation from root project inside Postman Application and you are ready to start testing API. :)



