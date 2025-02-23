import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dw7n0sxuu",
    api_key: process.env.CLOUDINARY_API_KEY ||"838356385886399" ,
    api_secret: process.env.CLOUDINARY_API_SECRET || "tFw0UepyLwffbcfUMj1RaUfvBrQ",
});

export default cloudinary;
