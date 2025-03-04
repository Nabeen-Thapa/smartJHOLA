//import axios from "axios";
export const signup =async (FormData:{
    name: string;
    username: string;
    email: string;
    phone: string;
    age: string;
    gender: string;
})=>{
    const host =`http://localhost:5500/smartjhola`;
    try {
        const payload = {
            ...FormData,
            age: Number(FormData.age), // Convert age to a number
        };
        // const userSignupResponce = await axios.post(`${host}/user/register`,payload,{
        //     headers: {
        //         "Content-Type": "application/json",
        //       },
        // });
        const userSignupResponce = await fetch(`${host}/user/register`,{
            method : "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
        });
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
}