const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const autoIncrement = require('@alec016/mongoose-autoincrement');

const connection = mongoose.connection
autoIncrement.initialize(connection);



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
schema.plugin(autoIncrement.plugin, { model: 'Class', field: '_id' });
schema.plugin(autoIncrement.plugin, {
    model: 'Class',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});
//2-mapping
module.exports = mongoose.model("Class", schema);
