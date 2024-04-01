const classSchema = require("../Model/classModel");
const asyncHandeller = require('express-async-handler');


exports.getAllClasses = (req , res  ,next) => {
    classSchema.find({})
    .then((data) => {
        res.status(200).json({data});
    })
    .catch((error) => next(error));
};

exports.getClassById = (req , res ,next) => {
    classSchema.findOne({ _id: req.params.id })
    .then((object)=>{
        if (!object) {
            throw new Error("class not Exists");
        }
        res.status(200).json({ object });
    })
    .catch((error) => next(error));
};
exports.insertClass = asyncHandeller(async(req , res,next)=>{
    const newDocument = await classSchema.create(req.body);
    res.status(201).json({ data: newDocument });
}
);
// exports.insertClass = (req , res , next) => {
//     let object = new classSchema(req.body);
//     object
//     .save()
//     .then((data) => {
//         res.status(200).json({ data });
//     })
//     .catch((error) => next(error));
// };

exports.updateClass = (req , res , next) => { 
    classSchema.updateOne({
        _id:req.params.id
    },{
        $set:{
            name:req.body.fullName,
            supervisor:req.body.supervisor,
            children:req.body.children
        }
    }).then(data=>{
        if(data.matchedCount==0)
            next(new Error("Teacher not Found"));
        else
            res.status(200).json({data});
    })
    .catch(error=>next(error));
};

exports.deleteClass = (req , res , next) => {
    classSchema.deleteOne({
        _id:req.params.id
    }).then(data=>{
        res.status(200).json({data});
    })
    .catch(error=>next(error));
};

exports.classChildrenInfo = (req , res , next) => {
    classSchema.find({children:req.params.id})
    .then((data) => {
        res.status(200).json({data});
    })
    .catch((error) => next(error));
};

exports.classSupervisorInfo = (req , res , next) => {
    
};
