const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASS);

mongoose.connect(DB).then((con) => {
  console.log('DB Connection successful!...');
});
