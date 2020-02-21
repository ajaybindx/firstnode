const User = require('../model/user');
const Register = require('../model/register');
const bcrypt = require('bcryptjs');


// creating CURD API's

// function for postuser Create  user Document in userDetails
exports.postuser = function (req, res) {

    //Createing an instence of user model's
    let user = new User();
    // Set the user properties that came from the POST data
    user.id = req.body.id;
    user.name = req.body.name;
    user.username = req.body.username;
    user.email = req.body.email;
    user.address = {
        street: req.body.address.street,
        suite: req.body.address.suite,
        city: req.body.address.city,
        zipcode: req.body.address.zipcode,
        geo: {
            lat: req.body.address.geo.lat,
            lng: req.body.address.geo.lng
        }
    };
    user.phone = req.body.phone;
    user.website = req.body.website;
    user.company = {
        name: req.body.company.name,
        catchPhrase: req.body.company.catchPhrase,
        bs: req.body.company.bs
    };
    if (req.body.isActivated == undefined)
        req.body.isActivated = false;
    user.isActivated = req.body.isActivated;

    // Save the user and check for errors
    user.save(function (err) {
        if (err)
            res.send(err);

        res.json({ message: 'user added to the userDetails !', data: user });
    });
};




// Create function for putuser
exports.putuser = function (req, res) {
    // Use the Beer model to find a specific user
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);

        // Update the existing user isActivated
        user.isActivated = req.body.isActivated;

        // Save the user and check for errors
        user.save(function (err) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });
};


// Create function  for deleteuser
exports.deleteuser = function (req, res) {
    // Use the Beer model to find a specific user
    User.findByIdAndDelete(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        // Update the existing beer quantity
        res.send("DELETED ")
    });
};






// create function getuser
exports.getuser = function (req, res) {

    User.find(function (err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
};


//<------------------------REGISERE USER --------------------------------------->



// registered users 

exports.postRegister = function (req, res) {

    // Insert the Register user  if they do not exist yet

    register = new Register();
    register.email = req.body.email;
    var password = req.body.password;
    var hash = bcrypt.hashSync(password, 10);
    register.password = hash;

    console.log('your here ' + register);
    register.save(function (err) {
        if (err)
            res.send(err);

        res.json(register);
    });
}

//  creating endpoint /root/register for getRegisteredUser
exports.getRegisteredUser = function (req, res) {
    Register.find(function (err, regsiters) {
        if (err)
            res.send(err);

        res.json(regsiters);

    });
}

// Create function  for deleteRegistereduser
exports.deleteRegistereduser = function (req, res) {
    // Use the Register model to find a specific user
    Register.findByIdAndDelete(req.params.register_id, function (err, register) {
        if (err)
            res.send(err);
        // Update the existing beer quantity
        res.send("DELETED ")
    });
};

