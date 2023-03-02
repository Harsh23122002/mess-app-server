const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// baseURL/users/
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

// baseURL/users/register
router.post('/register', async (req, res) => {


    const { name, password, phone, email } = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        const temp1 = new User({
            name: name,
            password: hash,
            phone: phone,
            email: email
        })
        User.create({ name, password: hash, phone, email }).then((result) => {
            res.status(200).json({
                'status': 200,
                'message': 'success',
                'body': result
            })
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

// baseURL/users/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
});

module.exports = router;