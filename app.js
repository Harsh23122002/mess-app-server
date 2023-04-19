const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routers/users');
const messRoute = require('./routers/mess_route');
const { compareSync } = require("bcrypt");


dotenv.config(
    {
        path: './config.env'
    }
)

const app = express();
app.use(express.json());
const url = process.env.DATABASE;
const secretKey = process.env.SECRET_KEY;

mongoose.set('strictQuery', false);

const port = process.env.PORT;


mongoose.connect(url).then((result) => {
    app.listen(port);
    // console.log(result);
    console.log("DB started and server hosted on port " + port);
}).catch((err) => {
    console.log('ERROR');
    console.log(err);
    //
});



const con = mongoose.connection;

con.on('open', () => {
    console.log('Connected');
});



app.use('/users', userRoute);
app.use('/mess', messRoute);

app.get('*', (req, res) => {
    res.status(400).json({
        'status': 404,
        'message': 'invalid request'
    });

});