// load required packeges 
const mongoose = require('mongoose');

// Schema for geo
var geoSchema = new mongoose.Schema(
    {
        lat: String,
        lng: String
    }, { _id: false }
);
// Schema for address
var addSchema = new mongoose.Schema(
    {
        street: String,
        suite: String,
        city: String,
        zipcode: String,
        geo: geoSchema

    }, { _id: false }
);

// Schema  for company 
var companySchema = new mongoose.Schema(
    {
        name: String,
        catchPhrase: String,
        bs: String
    }, { _id: false }
);

// defineing user Schema 
var UserSchema = new mongoose.Schema(
    {
        id: Number,
        name: String,
        username: String,
        email: String,
        address: addSchema,
        phone: String,
        website: String,
        company: companySchema,
        isActivated: Boolean
    }
);


module.exports = mongoose.model('User', UserSchema);


