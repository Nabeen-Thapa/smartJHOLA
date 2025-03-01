import React, { FormEvent } from 'react'


const Login = () => {
    const handleLogin=(e)=>{
        e.preventDefault();
        console.log("login success")
    }
  return (
    <>
      <div className="flex justify-denter item-center min-h-screeen b-g-gray-100 p-6">
        <div className="bg-white p-3 rounded-lg 3/4 max-w-md">
            <h2 className='text-3xl font-blod text-cnter m-6'>login</h2>
            <form action="" method="post" onSubmit={handleLogin}>
                <input type='text' name='username' placeholder='enter your username' className='w-3/4 border rounded'/>
                <input type='passowrd' name='password' placeholder='enter your password' className='w-3/4 border rounded'/>
                <button type='submit' className='w-3/4 bg-green-500 text-white p-2 -4 rounded hover:bg-green-600'>login</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default Login;
