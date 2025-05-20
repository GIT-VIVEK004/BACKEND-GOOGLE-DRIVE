const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGOOSE_URL)
        .then(() => {
            console.log("Database Connected...");
        })
        .catch((err) => {
            console.log("Failed during connecting to DB....", err);
            process.exit(1);
        });
};


module.exports=dbConnect    