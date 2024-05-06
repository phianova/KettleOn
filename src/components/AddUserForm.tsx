"use client"
import React, { FC, useState } from 'react'
import { trpc } from "../app/_trpc/client";
import { useRouter } from "next/navigation";
import { useToast } from "../components/shadcn/use-toast";
import Spinner from "../components/Spinner";

interface AddUserProps {
  currentUser: string | null | undefined,
  role: string | null | undefined,
  organisation: string | null | undefined
}
const AddUserForm: FC<AddUserProps> = (props: AddUserProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const delay = (ms : number) => new Promise(res => setTimeout(res, ms));
  const { mutate: addUser } = trpc.addUser.useMutation({
    onSuccess: async (success) => {
      if (success) {
        toast({
          title: "Success!",
          description: "User added successfully."
        })
        setLoading(true)
        await delay(2000);
        window.location.reload();
        setLoading(false)
        router.push("/dashboard")
      }
    },
    onError: async (error) => {
      if (error) {
        toast({
          title: "Error!",
          description: "Could not add user.",
          variant: "destructive",
        })
        setLoading(true)
        await delay(2000);
        window.location.reload();
        setLoading(false)
        router.push("/dashboard")

      }
    }
  })


  const addUserCall = async (e: any, props: any) => {
    // e.preventDefault();

    const inputs = {
      given_name: e.target.given_name.value,
      family_name: e.target.family_name.value,
      email: e.target.email.value,
      username: e.target.given_name.value + " " + e.target.family_name.value,
      team: props.organisation,
      teamname: "",
      company: "",
      role: e.target.role.value,
      image: "",
      bio: "",
      prompts: [],
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
        {
          name: "weeklyQuiz",
          score: 0,
          usage: 0
        }, 
        {
          name: "nameQuiz",
          score: 0, 
          usage: 0
        }
     ],
    rank: 0,
    };
    addUser(inputs);
  }

  if (loading) {
    return <Spinner></Spinner>
  }

  return (
    <form onSubmit={(e) => addUserCall(e, props)} className={"flex flex-col justify-center"}>
      <input name="given_name" type="text" placeholder="Enter first name" className="mx-auto my-auto block bg-white rounded-xl text-lg sm:text-xl text-center h-10 w-8/12 mb-2 text-[#292929] placeholder-[#E29D65] placeholder-opacity-60" />
      <input name="family_name" type="text" placeholder="Enter surname" className="mx-auto my-auto block bg-white rounded-xl text-lg sm:text-xl text-center h-10 w-8/12 mb-2 text-[#292929] placeholder-[#E29D65] placeholder-opacity-60" />
      <input name="email" type="email" placeholder="Enter email" className="mx-auto my-auto block bg-white rounded-xl text-lg sm:text-xl text-center h-10 w-8/12 mb-2 text-[#292929] placeholder-[#E29D65] placeholder-opacity-60" />
      <input name="role" type="text" placeholder="Enter role" className="mx-auto my-auto block bg-white rounded-xl text-lg sm:text-xl text-center h-10 w-8/12 mb-2 text-[#292929] placeholder-[#E29D65] placeholder-opacity-60" />
      <button type="submit" className="mx-auto my-auto block bg-[#FAF2F0] hover:bg-[#74AA8D] text-[#292929] font-semibold py-2 px-4 border border-[#292929] w-8/12 rounded-full text-xl">Add new user</button>
    </form>

  )
}

export default AddUserForm