// const jwt = require("jsonwebtoken");
// // const admin = {
// //     id: "id",
// //     name: "Admin name",
// //     role: "admin"
// // };
// module.exports = (req, res, next) => {
//     try {
//         let token = req.get("authorization").split(" ")[1];
//         let decoded_token = jwt.verify(token,"ostrack");
//         req.token = decoded_token;
//         next();
//     } catch (error) {
//         error.message = "nottt Athenticated";
//         error.status=403;
//         next(error);
//     }
// };


// module.exports.isAdmin = (req, res, next) => {
//     if (req.token.role == admin.role) next();
//     else next(new Error("not Authorizatied"));
// };

// module.exports.isteacher = (req, res, next) => {
//     if (req.token.role == "teacher") next();
//     else next(new Error("not Authorizatied"));
// };


