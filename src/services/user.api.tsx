

const host =`http://localhost:5500/smartjhola/user/register`;
import axios from "axios";
export const signup =async (FormData:{
    name: string;
    username: string;
    email: string;
    phone: string;
    age: string;
    gender: string;
})=>{
    try {
        const userSignupResponce = await axios.post(`${host}//user/register`,FormData,{
            headers: {
                "Content-Type": "application/json",
              },
        })
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
}

