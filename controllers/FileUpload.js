const File=require("../models/File")
const cloudinary=require("cloudinary").v2

exports.localFileUpload=async(req,res)=>{
    try{
    const file=req.files.file;
    console.log("File is : ",file)

    let path= __dirname+"/files/"+Date.now()+`${file.name.split('.')[1]}`
    console.log("Path is: ",path)

    file.mv(path,(err)=>{
        console.log(err)
    })

    res.json({
        success:true,
        message:"LOCAL FILE UPLOADED SUCCESSFULLY"
    })

    }
    catch(err){
        console.log(err)
    }
}

function isFileTypeSupported(type,FileType){
    return FileType.includes(type)
}

async function uploadToCloudinary(file,Folder,quality){
    const options={Folder}
    if(quality){
        options.quality=quality
    }
    options.resource_type="auto"
    return await cloudinary.uploader.upload(file.fileTempPath,options)
} 

exports.imageUpload=async(req,res)=>{
    try{
        const{name,tags,email}=req.body
        console.log(name," ",tags,"",email)

        const file=req.files.imageFile
        console.log("Image File-> ",file)

        const supportedTypes=["jpg","jpeg","png"]
        const fileType=file.name.split(".")[1].toLowerCase()

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported"
            })
        }

        const response = await uploadToCloudinary(file,"cloudinaryProject");
        console.log(response)

        const fileData=await File.create({
            name,
            email,
            tags,
            ImageUrl:response.secure_url,
        })

        res.json({
            success:true,
            message:"File Upload Successful"
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:"SomeThing Went Wrong"
        })
    }
}


exports.videoUpload=async(req,res)=>{
    try{
        const{name,tags,email}=req.body
        console.log(name," ",tags,"",email)

        const file=req.files.imageFile
        console.log("Image File-> ",file)

        const supportedTypes=["mp4","mov"]
        const fileType=file.name.split(".")[1].toLowerCase()

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported"
            })
        }

        const response = await uploadToCloudinary(file,"cloudinaryProject");
        console.log(response)

        const fileData=await File.create({
            name,
            email,
            tags,
            ImageUrl:response.secure_url,
        })

        res.json({
            success:true,
            message:"video File Upload Successful"
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:"SomeThing Went Wrong"
        })
    }
}

exports.ImageSizeReducer=async(req,res)=>{
    try{
        const{name,tags,email}=req.body
        console.log(name," ",tags,"",email)

        const file=req.files.imageFile
        console.log("Image File-> ",file)

        const supportedTypes=["mp4","mov"]
        const fileType=file.name.split(".")[1].toLowerCase()

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported"
            })
        }
        const quality=90

        const response = await uploadToCloudinary(file,"cloudinaryProject",quality);
        console.log(response)

        const fileData=await File.create({
            name,
            email,
            tags,
            ImageUrl:response.secure_url,
        })

        res.json({
            success:true,
            message:"File Upload Successful"
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:"SomeThing Went Wrong"
        })
    }
}
