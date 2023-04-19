const express = require('express');
const router = express.Router();
const Mess = require('../models/mess');
const bycrypt = require('bcrypt');
const { createToken } = require('../utils/createToken');
const { mess_login } = require('../controllers/messLogin');

router.get('/', async (req, res) => {
    try {
        const users = await Mess.find();

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


router.post('/register', async (req, res) => {

    const { name, email, password, location, phone } = req.body;

    bycrypt.hash(password, 10).then((hash) => {
        Mess.create({ name, email, password: hash, location, phone }).then((result) => {
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

        });
    });
});


router.post('/login', mess_login);

module.exports = router;