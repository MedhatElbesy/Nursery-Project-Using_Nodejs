const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

//1- create schema object
const addressSchema = new mongoose.Schema({
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String, required: true }
});

const schema = new mongoose.Schema({
    id: { type: Number, required: true }, 
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    level: { type: String, enum: ["PreKG", "KG1", "KG2"], required: true }, 
    address: { type: addressSchema, required: true },
    image:{String}
});

//2-mapping
module.exports = mongoose.model("Child", schema);
