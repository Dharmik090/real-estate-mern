const mongoose = require('mongoose');

const url = process.env.DB_URI;

mongoose.connect(url)
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch(() => {
    console.log("Database Connection Failed");
  });