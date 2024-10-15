const express = require('express');
const DbConnector = require('./config/dbConnector');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes')
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use("/",userRoutes);
app.use("/",propertyRoutes);


app.listen(5000,() => {
    console.log("Server running at : http://localhost:5000/");
});