import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary";

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: "products", // Cloudinary folder name
            format: file.mimetype.split("/")[1], // Extract format dynamically from MIME type
            public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`, // Clean filename
            resource_type: "image", // Ensures it's an image
        };
    },
});

const productImage = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedFormats = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
        if (allowedFormats.includes(file.mimetype)) {
            cb(null, true); // Accept the file if it's in the allowed formats
        } else {
            cb(new Error("Invalid file format. Allowed formats: JPEG, PNG, WebP, GIF, SVG")); // Reject others
        }
    },
});

export default productImage;
