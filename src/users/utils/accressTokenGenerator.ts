import jwt from "jsonwebtoken";


interface jwtDataTypes{
    username:string,
    userId:number,
    password:string
}
export const generateAccessToken = (user:jwtDataTypes):string=>{
    const secretAccessToken = process.env.ACCESS_KEY;
    if(!secretAccessToken){
        throw new Error("access token key is not defined in environment variables.");
    }
    return jwt.sign(user, secretAccessToken, {expiresIn : '120m'});
}