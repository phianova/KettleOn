"use client"
import React, { FC } from 'react'
import { trpc } from "../app/_trpc/client";
import { useRouter } from "next/navigation";

interface AddUserProps {
  currentUser: string | null | undefined,
  role: string | null | undefined,
  organisation: string | null | undefined
}
const AddUserForm: FC<AddUserProps> = (props: AddUserProps) => {
  const router = useRouter();
  const { mutate: addUser } = trpc.addUser.useMutation(
    {
      onSuccess: () => {
        router.refresh()
        console.log("success")
      },
      onError: () => {
        console.log("error")
      }
    }
  )


  const addUserCall = async (e: any, props: any) => {
    // e.preventDefault();
    
    const inputs = {
      given_name: e.target.given_name.value,
      family_name: e.target.family_name.value,
      email: e.target.email.value,
      username: e.target.given_name.value + " " + e.target.family_name.value,
      team: props.organisation,
      teamname: "", 
      company: e.target.company.value,
      role: e.target.role.value,
      image: "",
      bio: "",
      prompt: "",
      answer: "",
      game: [
        {
            name: "NumberGame",
            score: 0,
            usage: 0
        },
        {
            name: "aiQuiz",
            score: 0,
            usage: 0
        },
    ]
    };
    addUser(inputs);
  }

  return (
    <form onSubmit={(e) => addUserCall(e, props)} className={"flex flex-col justify-center"}>
        <input name="given_name" type="text" placeholder="Enter first name" className="mx-auto my-auto block bg-slate-100 rounded-xl text-sm text-center h-10 w-1/2 mb-2" />
        <input name="family_name" type="text" placeholder="Enter surname" className="mx-auto my-auto block bg-slate-100 rounded-xl text-sm text-center h-10 w-1/2 mb-2"/>
        <input name="email" type="email" placeholder="Enter email" className="mx-auto my-auto block bg-slate-100 rounded-xl text-sm text-center h-10 w-1/2 mb-2" />
        <input name="company" type="text" placeholder="Enter company name" className="mx-auto my-auto block bg-slate-100 rounded-xl text-sm text-center h-10 w-1/2 mb-2" />
        <input name="role" type="text" placeholder="Enter role" className="mx-auto my-auto block bg-slate-100 rounded-xl text-sm text-center h-10 w-1/2 mb-2" />
      <button type="submit" className="mx-auto  my-auto block bg-white hover:bg-gray-100 text-slate-600 font-semibold py-2 px-4 border border-gray-400 w-1/2 rounded-full">Add new user</button>
    </form>

  )
}

export default AddUserForm