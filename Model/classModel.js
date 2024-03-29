const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

//1- create schema object
const schema = new mongoose.Schema({
    _id: { type: Number, required: true }, 
    name: { type: String, required: true },
    supervisor: { 
        type: mongoose.Schema.ObjectId,
        ref: "Teacher",
        required: [true , "supervisor must be belong supervisors"] }, 
    children: [{ 
        type: Number,
        ref: "Child" ,
        required: [true , "children must be belong childrens"] 
    }] 
});
// schema.plugin(AutoIncrement, { inc_field: '_id' });

//2-mapping
module.exports = mongoose.model("Class", schema);
