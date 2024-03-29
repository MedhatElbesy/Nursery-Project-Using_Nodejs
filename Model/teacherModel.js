const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId }, 
    fullName: { type: String },
    password: {type: String , required: true },
    email: { type: String}, 
    image:String 
});
// schema.plugin(AutoIncrement, { id: '_id' });
module.exports = mongoose.model("Teacher", schema);
