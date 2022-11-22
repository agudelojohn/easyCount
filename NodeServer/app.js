const dotenv = require('dotenv');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'All ok',
  });
});

//Start server
try {
  app.listen(process.env.PORT, () => {
    console.log(`App runing on port: ${process.env.PORT} `);
  });
} catch (err) {
  console.log('Error DB connection!...');
  console.error('DB connection failed!!');
}
