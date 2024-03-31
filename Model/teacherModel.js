const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId }, 
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


// const setImageURL = (doc) => {
//     if(doc.image){
//         const imageUrl = `${process.env.BASE_URL}/teachers/${doc.image}`;
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



schema.pre('save',async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,12)
    next();
});

// schema.plugin(AutoIncrement, { id: '_id' });
module.exports = mongoose.model("Teacher", schema);
