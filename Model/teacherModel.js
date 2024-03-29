const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId }, 
    fullName: { type: String },
    password: {type: String , required: true },
    email: { type: String}, 
    image:String 
});

schema.pre('save',async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,12)
    next();
});

// schema.plugin(AutoIncrement, { id: '_id' });
module.exports = mongoose.model("Teacher", schema);
