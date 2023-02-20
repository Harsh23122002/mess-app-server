const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.send('Error ' + err);
    }
});

router.post('/', async (req, res) => {
    try {
        const temp1 = new User({
            name: req.body.name,
            password: req.body.password,
            phone: req.body.phone,
            email: req.body.email
        })
        const a = await temp1.save();

        res.send(a);
    } catch (err) {
        console.log(err);
    }

});

module.exports = router;