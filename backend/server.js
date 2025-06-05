require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const nodeMailer = require('nodemailer');

const db = require('./config/db')
const userRoutes = require('./routes/user.routes');
const propertyRoutes = require('./routes/property.routes')

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true, // Allow cookies
  optionsSuccessStatus: 200 // For legacy browsers
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/', rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    message: "Too many requests, please try again later."
}));

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

app.use((err, req, res, next) => {
    const status = err.statusCode || 500;

    if (status === 500)
        err.message = 'Server error: ' + err.message
    res.status(status).json({ success: false, message: err.message });
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running at : http://localhost:${process.env.PORT || 5000}`);
});