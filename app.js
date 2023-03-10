const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(
    {
        path: './config.env'
    }
)

const app = express();
app.use(express.json());
const url = process.env.DATABASE;

mongoose.set('strictQuery', false);

const port = process.env.PORT;
mongoose.connect(url).then((result) => {
    app.listen(port);
    console.log("DB started and server hosted on port 5000");
}).catch((err) => {
    console.log(err);
});

const con = mongoose.connection;

con.on('open', () => {
    console.log('Connected');
});

const userRoute = require('./routers/users');

app.use('/users', userRoute);


app.get('*', (req, res) => {
    res.status(400).json({
        'status': 404
    });

});