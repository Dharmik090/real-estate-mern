const express = require('express');
const DbConnector = require('./config/dbConnector');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes')
const app = express();
const cors = require('cors');
const path = require('path');
const nodeMailer = require('nodemailer');

app.use(cors());
app.use(express.json());
app.use("/", userRoutes);
app.use("/", propertyRoutes);
app.post("/send-mail", (req, res) => {

    const { from, to, message, password } = req.body;

    console.log("Email : ");
    console.log(`From : ${from} To: ${to} Message: ${message} Password: ${password}`);
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: from,
            pass: password
        }
    });

    const mailOpt = {
        from: from,
        to: to,
        subject: "Estate Prime",
        text: message,
    }

    transporter.sendMail(mailOpt, (err, info) => {
        if (err) {
            console.log('Failed : ' + err);
            return;
        }

        console.log('Success');
        console.log(info);
    });

});


app.listen(5000, () => {
    console.log("Server running at : http://localhost:5000/");
});