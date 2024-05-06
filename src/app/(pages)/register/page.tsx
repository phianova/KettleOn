import React from 'react'

const page = () => {
  return (
    <div className="bg-[#FAF2F0] rounded-lg shadow-lg flex flex-col items-center">
    <img className="mt-10" src="logo.png" alt="Logo"></img>
    <h1 className="text-3xl">Register your team now!</h1>
    <p className="text-xl">Enter your email address below to sign up as a manager or team leader. 
    You'll be able to register your team members from within the app.</p>
    <p className="text-lg italic">Not a manager? Share the link with your team leader to get set up!</p>

    
    </div>
  )
}

export default page