const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

//1- create schema object
const schema = new mongoose.Schema({
    _id: { type: Number, required: true }, 
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    level: { type: String, enum: ["PreKG", "KG1", "KG2"], required: true }, 
    address: { 
        city: { type: String, required: true },
        street: { type: String, required: true },
        building: { type: String, required: true }
    },
    image:{String}
});



// const setImageURL = (doc) => {
//     if(doc.image){
//         const imageUrl = `${process.env.BASE_URL}/childs/${doc.image}`;
//         doc.image = imageUrl;
//     }
// };

// categorySchema.post('init',(doc) => {
//     //return image url + image name
//     setImageURL(doc);
// });

// categorySchema.post('save',(doc) => {
//     //return image url + image name
//     setImageURL(doc);
// });


//2-mapping
module.exports = mongoose.model("Child", schema);
