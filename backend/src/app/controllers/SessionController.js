const User = require('../models/User');


class SessionController {

    async store (req, res) {

        const { email } = req.body;

        let user = await User.findOne({email});

        if(!user) {
            user = await User.create({email});
        }
        return res.status(200).json(user);
    }

}

module.exports = SessionController;