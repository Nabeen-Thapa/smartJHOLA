import joi, { string } from "joi";

export const userValidationSchema =joi.object({
    name:joi.string().required(),
    username: joi.string().min(4).max(100).required(),
    email:joi.string().required(),
    phone:joi.string().required(),
    age: joi.string().optional(),
    gender : joi.string().optional(),
    image: joi.string().optional(),
})