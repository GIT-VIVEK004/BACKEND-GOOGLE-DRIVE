const mongoose=require("mongoose")
const nodemailer=require("nodemailer")
require("dotenv").config()

const fileSchema=new mongoose.Schema({
    


    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String,
    }
},{timestamps:true})

fileSchema.post("save",async function(doc){
    try{
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        let info=await transporter.sendMail({
            from:`Vivek Chauhan`,
            to:doc.email,
            subject:"New File Uploaded on Cloudinart",
            html:`<h1>Good Morning Sir,</h1> <p>File Uploaded</p> View HereL<a href="${doc.imageUrl}">${doc.imageUrl}</a>`
        })

    }
    catch(error){
        console.log(error)  
    }
})

const File=mongoose.model("File",fileSchema)
module.exports=File