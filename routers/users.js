const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createToken } = require('../utils/createToken');
const { user_login } = require('../controllers/userLogin');
const { join_mess } = require('../controllers/joinMess');


// baseURL/users/    GET
router.get('/', async (req, res) => {
    try {
        const users = await User.find();

        const response = {
            'status': 200,
            'message': 'success',
            'body': users
        }
        res.send(response);
    } catch (err) {
        res.send('Error ' + err);
    }
});

// baseURL/users/register   POST
router.post('/register', async (req, res) => {


    const { name, password, phone, email } = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        const user = new User({
            name: name,
            password: hash,
            phone: phone,
            email: email
        });


        User.create({ name, password: hash, phone, email }).then((result) => {
            let token = createToken(result._id);

            if (token == 0) {
                console.log(err);
                res.status(400).json({
                    'status': 400,
                    'message': err.message,
                    'body': err,
                });
            } else {
                res.status(200).json({
                    'status': 200,
                    'message': 'success',
                    'body': result,
                    'jwttoken': token
                })
            }
        }).catch((err) => {
            console.log(err);
            res.status(400).json({
                'status': 400,
                'message': err.message,
                'body': err,
            });
        })
            ;

    });

});


// baseURL/users/login     POST
router.post('/login', user_login);


// baseURL/users/joinmess     POST
router.post('/joinmess', join_mess);

module.exports = router;