const multer  = require('multer');
const ApiError = require('../utils/apiError');

//memory storage 
    const multerOptional = ( ) => {
        const multerStorage = multer.memoryStorage();
        const multerFilter = function(req , file , cb){
            if(file.mimetype.startsWith("image")){
                cb(null , true);
            }else{
                cb(new ApiError("only images allowed" , 400) , false);
            }
        };
        const upload = multer({ storage: multerStorage ,fileFilter: multerFilter});
    return upload;
    };

exports.uploadeSingleImage = (fieldName) => 
    multerOptional().single(fieldName);


    