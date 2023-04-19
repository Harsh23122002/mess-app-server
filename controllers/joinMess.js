const User = require('../models/user');
const Mess = require('../models/mess');

module.exports.join_mess = async (req, res) => {
    const { mess_id, user_id } = req.body;

    //auth or auth middleware implementation

    const a = await User.updateOne(
        { _id: user_id },
        { $push: { subscriptions: mess_id } }
    ).catch((err) => {
        console.log(err);
        res.status(400).json({
            'status': 400,
            'message': err.message,
            'body': err,
        });
    });

    const b = await Mess.updateOne(
        { _id: mess_id },
        { $push: { subscribers: user_id } }
    ).catch((err) => {
        console.log(err);
        res.status(400).json({
            'status': 400,
            'message': err.message,
            'body': err,
        });
    });

    res.status(200).json({ "status": 200, "message": "success", });




    // await User.updateOne({ _id: user_id },
    //     { $push: { subscriptions: mess_id } }
    // ).then((result) => {
    //     res.status(200).json({
    //         "status": 200,
    //         "message ": "success",
    //         "body": result
    //     });
    // }).catch((err) => {
    //     console.log(err);
    //     res.status(400).json({
    //         'status': 400,
    //         'message': err.message,
    //         'body': err,
    //     });
    // });
}