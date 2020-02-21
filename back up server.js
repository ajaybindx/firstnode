// emporting required packages 

const express = require('express');
const mongoose = require('mongoose');
const Image = require("./model/images");
const bodyParser = require('body-parser');


const multer = require('multer');

const app = express();

//parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/json' }))

const router = express.Router(); // create an router
const port = 8080;

//to Connect  mongodb

mongoose.connect('mongodb://localhost:27017/userDetails', { useNewUrlParser: true, useUnifiedTopology: true })

const storage = multer.diskStorage({ dest: '/images/' });
// const upload = multer({ storage: storage });
const upload = multer({ storage }).single('avatar');

// destination for storage of uploaded images

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/Uploaded/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname);
//     }
// });


// // filtering the images only accepte .jpeg ,.jpg,.png  

// const fileFilter = function (req, file, cb) {    // store files 
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     }
//     else {
//         cb(null, false);
//     }
// }



// const upload = multer({
//     storage: storage,
//     //limit: { fileSize: 1024 * 1024 * 5 }, // this will store  upto 5 mb 
//     fileFilter: fileFilter
// })


const usercontroller = require('./controllers/user');

// Create endpoint handlers for /users

router.route('/users')
    .post(usercontroller.postuser)
    .get(usercontroller.getuser)

// Create endpoint handlers for /users/:user_id

router.route('/users/:user_id')
    .get(usercontroller.getuser)
    .put(usercontroller.putuser)
    .delete(usercontroller.deleteuser)

//Create endpoints handlers for /registere/

router.route('/register')
    .post(usercontroller.postRegister)
    .get(usercontroller.getRegisteredUser)

router.route('/register/:register_id')
    .delete(usercontroller.deleteRegistereduser)



//<----------------------- Upload  Image and Get Image  api --------------------------->
console.log("hello");


//  , upload.single('imagesfile')
router.post('/imageupload', upload.single('photos'), function (req, res) {
    //Createing an instence of Image model's
    console.log(re.file.path);
    Image = new Image({ imagepath: req.file.path });
    console.log(Image);
    Image.save(function (err) {
        if (err)
            res.send(err);

        res.json({ message: "Image Uploaded " });
    });

});





// Initial dummy route for testing
// http://localhost:8080/root
app.use('/root', router);
app.listen(port);

console.log('Server Started at  port ' + port);









// // Load required packages

// const multer = require('multer');
// const fs = require('fs');

// const FileUpload = require('../models/fileUpload.model'); // importing file upload model.

// const storage = multer.diskStorage({
//     destination: 'public/uploads/',
//     filename: (req, file, cb) => {
//         const extArray = file.originalname.split('.');
//         const extension = extArray[extArray.length - 1];
//         cb(null, `${Date.now()}.${extension}`);
//     },
// });

// const upload = multer({ storage }).single('avatar');

// // File Upload.

// exports.uploadFile = [
//     (req, res, next) => {
//         upload(req, res, (err) => {
//             if (err) {
//                 res.status(500);
//             }
//             FileUpload.model.create(req.file).then((result) => {
//                 if (!result) {
//                     res.status(400).send({ message: 'Error while uploading file!' })
//                 } else {
//                     res.status(200).send({ message: 'File Uploaded successfully', result });
//                 }
//             })
//                 .catch((err) => {
//                     res.status(500).send(err);
//                 })
//         });
//     },
// ];

