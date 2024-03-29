const jwt = require("jsonwebtoken");
const teacherShema = require("./../Model/teacherModel");

exports.login = (req, res, next) => {
    teacherShema.findOne({
        fullName: req.body.fullName,
        password: req.body.password,
    })
    .then((object) => {
        if (!object) {
            throw new Error("Not Authenticated , Invalid full name or password");
        }
        let token = jwt.sign( 
            {
                _id: object._id,
                role: "teacher",
            },
            "ostrack",
            { expiresIn: "1hr" }
        );

        res.status(200).json({ data: "Authenticated", token });
    })
    .catch((error) => next(error));
};

