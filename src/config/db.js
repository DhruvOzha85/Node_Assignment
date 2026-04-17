const mongoose = require('mongoose');
async function ConnectDB(){

    mongoose.connect("mongodb://localhost:27017/notes-app")
    .then(() => console.log("Mongodb has been connected succesfully"))
    .catch((err) => console.log(err.message));
}
module.exports = ConnectDB;
