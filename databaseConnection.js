const mongoose = require('mongoose');

const port = process.env.PORT || 8080 ; 
const dbConnection = ()=>{
mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log("DB Connected....");
        server.listen(port, () => {
        console.log("listened successfully on Port : ",port);
        });
    })
    .catch((error) => {
        console.log("Error" + error);
});
};
module.exports = dbConnection;