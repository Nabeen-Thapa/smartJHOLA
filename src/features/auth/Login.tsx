import React, { FormEvent } from 'react';
import Style from '../../Styles/Style.tsx';


const Login = () => {
    const handleLogin=(e:FormEvent)=>{
        e.preventDefault();
        console.log("login success")
    }
  return (
    <>
      <div className="flex justify-center item-center min-h-screen bg-gray-200 p-6">
        <div className="bg-white p-3 rounded-lg 3/4 max-w-md">
            <h2 className='text-3xl font-bold text-center'>login</h2>
            <form action="" method="post" onSubmit={handleLogin}>
                <input type='text' name='username' placeholder='enter your username' className='w-3/4 border rounded m-3 p-3'/>
                <input type='passowrd' name='password' placeholder='enter your password' className='w-3/4 border rounded  m-3 p-3'/>
                <button type='submit' className='w-3/4 bg-green-500 text-white  m-3 p-3 rounded hover:bg-green-600'>login</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default Login;
