
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    
    imagepath: { type: String, required: true }

});




module.exports = mongoose.model('image', ImageSchema);
