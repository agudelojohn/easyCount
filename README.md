# EASY COUNT application

This application was created to solve a personal situation I found in my daily journal. Also, to practice my dev skills.

## Technologies

- NodeJS : Environment to run server side JS code.
- Express : Framework to build the REST API
- Mongoose : Library to connect to MongoDB services
- Multer : Middleware that allows application to receive files through out multipart/form-data forms

## How to use?

To run the application you need to have NodeJS 16 installed, use the script: npm start

To use nodemon it needs to be installed globaly, use the script: npm run dev

To import mock data for ingredients, use the script: npm run import

To import mock data for recipes, the id of each ingredient must be updated according to DB, use the script: npm run importRes

## Environment variables

The following are variables that must be in a .env file to run successfully the application

- PORT : Number of the port where the application will be listening
- DB_PASS : Password to acces to MongoDB collection
- DATABASE : Url to connect to MongoDB collection
- USER : User to connect to MongoDB collection
