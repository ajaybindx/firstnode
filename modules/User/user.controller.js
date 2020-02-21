const User = require( './user.model');


// create function getuser
const getUser = (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
};

module.exports ={ getUser};
