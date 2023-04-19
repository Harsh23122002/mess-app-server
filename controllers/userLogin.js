const User = require('../models/user');
const bcrypt = require('bcrypt');
const { createToken } = require('../utils/createToken');

module.exports.user_login = async function (req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {

            let token = createToken(user._id);
            res.status(200).json({
                'status': 200,
                'message': 'success',
                'body': user,
                'jwttoken': token
            })
        }
        else {
            res.status(400).json({
                'status': 400,
                'message': "Invalid Password"

            });
        }
    }
    else {
        res.status(400).json({
            'status': 400,
            'message': "Invalid Mail"
        });
    }
}