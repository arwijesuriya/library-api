const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    birth_year:{
        type:Number,
        required:true
    }
});

const Authors = mongoose.model("authors",authorSchema);
module.exports = Authors;