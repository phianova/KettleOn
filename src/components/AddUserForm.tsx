"use client"
import React, { FC } from 'react'
import { createUser } from "./AddUserFunctions";
import { trpc } from "@/app/_trpc/client";

interface AddUserProps {
  currentUser: string | null | undefined,
  role: string | null | undefined,
  organisation: string | null | undefined
}
const AddUserForm: FC<AddUserProps> = (props: AddUserProps) => {

  const { mutate: addUser } = trpc.addUser.useMutation(
    {
      onSuccess: () => {
        console.log("success")
      },
      onError: () => {
        console.log("error")
      }
    }
  )


  const createUser = async (e: any, props: any) => {
    e.preventDefault();

    console.log("function")

    // console.log(JSON.stringify(dbInputBody))


    //   {
    //     method: 'POST',
    //     body: JSON.stringify(dbInputBody),
    //   })
    //   .then(function(res) {
    //       console.log("res")
    //       console.log(res)
    //       return res.json();
    //   }).then(function(body) {
    //       console.log(body);
    //   });



    addUser(
      {
        email: e.target.email.value,
        username: e.target.given_name.value + " " + e.target.family_name.value,
        team: props.organisation,
        company: e.target.company.value,
        role: e.target.role.value,
        image: "",
        bio: "",
        prompt: "",
        answer: "",
        // profile: {
        //   given_name: e.target.given_name.value,
        //   family_name: e.target.family_name.value,
        // },
        // organization_code: props.organisation,
        // identities: [
        //   {
        //     type: "email",
        //     details: {
        //       email: e.target.email.value
        //     }
        //   }
        // ]
      }
    )


  }

  return (
    <form onSubmit={(e) => createUser(e, props)} className={"flex flex-col justify-center"}>
      <label>First name:
        <input name="given_name" type="text" placeholder="Enter first name" className={"p-3"} />
      </label>
      <label>Surname:
        <input name="family_name" type="text" placeholder="Enter surname" className={"p-3"} />
      </label>
      <label>Email:
        <input name="email" type="email" placeholder="Enter email" className={"p-3"} />
      </label>
      <label>Company:
        <input name="company" type="text" placeholder="Enter company name" className={"p-3"} />
      </label>
      <label>Role:
        <input name="role" type="text" placeholder="Enter role" className={"p-3"} />
      </label>
      <button type="submit">Add new user</button>
    </form>
  )
}

export default AddUserForm