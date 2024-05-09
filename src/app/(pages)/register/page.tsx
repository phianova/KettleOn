"use client"
import React from 'react'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
const page = () => {

  const { register } = useKindeAuth()

  return (
    <div className="h-screen">
    <div className="bg-[#FAF2F0] rounded-lg shadow-lg flex flex-col items-center h-5/6 m-10">
    <img className="mt-10 h-1/5" src="logo.png" alt="Logo"></img>
    <h1 className="text-3xl my-5">Register your team now!</h1>
    <p className="text-xl">Enter your email address below to sign up as a manager or team leader.</p>
    <p className="text-xl">You'll be able to register your team members from within the app.</p>
    <form onSubmit={() => {{(e:any) =>
      e.preventDefault();
      register({
        authUrlParams: {
            connection_id: "conn_018f0889f36ae6db5d8613837bbebe0b",
            is_create_org: true
         }
      })
    }}} className="flex flex-col items-center w-10/12">
      <input className="my-3 p-3 w-full sm:w-1/2 md:w-1/3 rounded-lg text-lg" type="email" placeholder="Email"></input>
      <button type="submit" className="my-2 text-xl bg-[#E29D65] text-white border border-slate-300 hover:bg-slate-300 py-2 px-4 rounded-full">Register</button>
    </form>
    <p className="text-lg italic my-5">Not a manager? Share the link with your team leader to get set up!</p>
    </div>
    </div>
  )
}

export default page