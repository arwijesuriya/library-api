const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    author_id: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Authors'
    }],
    library_ids: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Library',
        required:true
    }]

});

const Books = mongoose.model('books',bookSchema);
module.exports=Books;