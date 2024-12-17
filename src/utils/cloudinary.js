import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
import { configDotenv } from "dotenv";

configDotenv({
    path: './.env'
});

const my_cloud_name = process.env.CLOUD_NAME
const my_api_key = process.env.API_KEY
const my_api_secret = process.env.API_SECRET

cloudinary.config({ 
    cloud_name: my_cloud_name, 
    api_key: my_api_key, 
    api_secret: my_api_secret,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        console.log(`File is uploaded on cloudinary and its url is: ${res.url}`);
        fs.unlinkSync(localFilePath)

        return res.url;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("error: ", error)
    }
}

export {uploadOnCloudinary};