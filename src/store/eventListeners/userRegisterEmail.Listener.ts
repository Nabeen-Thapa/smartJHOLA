import { string } from "joi";
import { userRegisterEmail } from "../utils/userRegisterEmail.emitter";
import { sendEmail } from "../../common/utils/email-sender";
import logger from "../../common/utils/logger";


userRegisterEmail.on("sendRegisterMail", async({to, subject, text, username, password}:{to:string, subject:string, text:String, username:String, password:string})=>{
    try {
        await sendEmail({
            to: to,
            subject: subject,
            text: `${text}.\n\n
    Your username: ${username}
    Your password is: ${password}\n\n
    Please use this OTP to log in and  reset your password.\n`,
        });
    } catch (error) {
        if (error instanceof Error) {
            // Check if the error is an instance of Error
            logger.error("Email sending failed:", error.message);
            return { message: error.message }
            
        } else {
            // Handle non-Error cases (unlikely, but good practice)
            logger.error("Unexpected email sending error:", error);
            return { message: "Unexpected error occurred while sending email." }
        }
    }
})