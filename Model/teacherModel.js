const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    fullName: { type: String },
    password: {type: String , required: true },
    email: { type: String}, 
    image:{type:String} ,
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},
{passwordChangedAt: Date.now()});


const setImageURL = (doc) => {
    if(doc.image){
        const imageUrl = `http://localhost:8000/teachers/${doc.image}`;
        doc.image = imageUrl;
    }
};

schema.post('init',(doc) => {
    //return image url + image name
    setImageURL(doc);
});

schema.post('save',(doc) => {
    //return image url + image name
    setImageURL(doc);
});



schema.pre('save',async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,12)
    next();
});

module.exports = mongoose.model("Teacher", schema);
