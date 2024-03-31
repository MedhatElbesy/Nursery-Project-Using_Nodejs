const multer  = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandeller = require('express-async-handler');

const childSchema = require("../Model/childModel");
const {uploadeSingleImage} = require('../Midelwares/uploadeImageMiddleware');


exports.uploadChildImage = uploadeSingleImage("image");



// const multerStorage = multer.diskStorage({
//     destination : function (req , file ,cb){
//         cb(null, 'uploads/childs')
//     },
//     filename : function (req , file , cb){
//         const ext = file.mimetype.split('/')[1];
//         const fileName = `teacher-${uuidv4()}-${Date.now()}.${ext}`
//         cb(null,fileName)
//     },
// });

//     const multerFilter = function(req , file , cb){
//         if(file.mimetype.startsWith("image")){
//             cb(null , true);
//         }else{
//             cb(new ApiError("only images allowed" , 400) , false);
//         }
//     };

// const upload = multer({ storage :multerStorage,fileFilter: multerFilter});

exports.resizeImage = asyncHandeller( async(req , res , next) =>{
    const uniqueFileName = `child-${uuidv4()}-${Date.now()}.jpeg`;
    // console.log(req.file);
    if(req.file){
        await sharp(req.file.buffer)
            .resize(600,600)
            .toFormat("jpeg")
            .jpeg({quality:90})
            .toFile(`uploads/childs/${uniqueFileName}`);
        
            //save image in db
        req.body.image = uniqueFileName ;
    }
    console.log(req.body.image);
    next();
});

// exports.uploadChildImage = upload.single('image');



exports.getAllChild = (req , res  ,next) => {
    childSchema.find({})
    .then((data) => {
        res.status(200).json({ data });
    })
    .catch((error) => next(error));};

exports.getChildById = (req , res ,next) => {
    childSchema.findOne({ _id: req.params.id })
    .then((object) => {
    if (!object) {
        throw new Error("child not Exists");
    }
    res.status(200).json({ object });
    })
    .catch((error) => next(error));};

exports.insertChild = asyncHandeller(async(req , res,next)=>{
    const newDocument = await childSchema.create(req.body);
    res.status(201).json({ data: newDocument });
}
);

exports.updateChild = (req , res , next) => { 
    childSchema.updateOne({
        _id:req.params.id
    },{
        $set:{
            fullName:req.body.fullName,
            age:req.body.age,
            level:req.body.level,
            address:req.body.address
        }
    }).then(data=>{
        if(data.matchedCount==0)
            next(new Error("child not Found"));
        else
            res.status(200).json({data});
    })
    .catch(error=>next(error));
};

exports.deleteChild = (req , res , next) => {
    childSchema.deleteOne({
        _id:req.params.id
    }).then(data=>{
        res.status(200).json({data});
    })
    .catch(error=>next(error));
};


