import axios from "axios";
export const signup =async (FormData:{
    name: string;
    username: string;
    email: string;
    phone: string;
    age: string;
    gender: string;
})=>{

    const host =`http://localhost:5555/smartjhola`;

    try {
        const userSignupResponce = await axios.post(`http://localhost:5555/smartjhola/user/register`,FormData,{
            headers: {
                "Content-Type": "application/json",
              },
        });
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
}