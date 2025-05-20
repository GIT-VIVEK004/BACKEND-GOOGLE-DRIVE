const express = require("express");
const app = express();
const database = require("./config/db");
const cloudinary = require("./config/cloudinary");
require("dotenv").config();
database();
cloudinary.cloudinaryConnect();

const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp'
}));

const PORT = process.env.PORT_NO || 4000;
app.use(express.json());

const upload = require("./routes/File.routes");
app.use("/api/v1/upload", upload);

app.listen(PORT, () => {
    console.log(`Server Running at: http://localhost:${PORT}`);
});
