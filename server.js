const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASS);
//Start server
const port = process.env.PORT || 3000;
try {
  mongoose.connect(DB).then(() => {
    console.log('DB Connection successful!...');
    app.listen(port, () => {
      console.log(`App runing on port: ${port} `);
    });
  });
} catch (err) {
  console.error(err);
  console.error('Error starting the application');
}
