const bycrypt = require('bcrypt');
const Mess = require('../models/mess');

const { createToken } = require('../utils/createToken');

module.exports.mess_login = async (req, res) => {
    const { email, password } = req.body;

    const mess = await Mess.findOne({ email });
    if (mess) {
        const auth = await bycrypt.compare(password, mess.password);
        if (auth) {

            let token = createToken(mess._id);
            res.status(200).json({
                'status': 200,
                'message': 'success',
                'body': mess,
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