import joi  from "joi";

export const userValidationSchema =joi.object({
    name:joi.string().trim().required(),
    username: joi.string().alphanum().trim().min(4).max(100).required(),
    email:joi.string().email().trim().required(),
    //phone:joi.string().trim().required(),
    phone: joi.alternatives().try(joi.string(), joi.number()).custom((value) => String(value)).required(),
    age: joi.number().integer().allow(null, " ").optional(),
    gender : joi.string().allow(null, " ").optional(),
    image: joi.string().allow(null, " ").optional(),
    status:joi.string().valid("active", "deactive").default("Deactive"),
})