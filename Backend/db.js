// importing mongoose 
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/my-notebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// connect Backend to mongoose
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to mongo , success");
    });
}
module.exports = connectToMongo;