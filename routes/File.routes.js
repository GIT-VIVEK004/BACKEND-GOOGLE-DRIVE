const express=require("express")
const router=express.Router()

const {imageUpload,localFileUpload, videoUpload, ImageSizeReducer}=require("../controllers/FileUpload")

router.post("/localFileUpload",localFileUpload)
router.post("/imageUpload",imageUpload)
router.post("/videoUpload",videoUpload)
router.post("/imageSizeReducer",ImageSizeReducer)
module.exports=router 