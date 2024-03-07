"use client"
import React, {FC} from 'react'
import {addUser} from "./AddUserFunctions";

interface AddUserProps {
    currentUser: string | null | undefined,
    role: string | null | undefined,
    organisation: string | null | undefined
}
const AddUserForm: FC<AddUserProps> = (props: AddUserProps) => {

  return (
    <form onSubmit={(e) => addUser(e,props)} className={"flex flex-col justify-center"}>
    <label>First name:  
    <input name="given_name" type="text" placeholder="Enter first name" className={"p-3"}/>
    </label>
    <label>Surname:  
    <input name="family_name" type="text" placeholder="Enter surname" className={"p-3"}/>
    </label>
    <label>Email:  
    <input name="email" type="email" placeholder="Enter email" className={"p-3"}/>
    </label>
    <label>Company:  
    <input name="company" type="text" placeholder="Enter company name" className={"p-3"}/>
    </label>
    <label>Role:  
    <input name="role" type="text" placeholder="Enter role" className={"p-3"}/>
    </label>
    <button type="submit">Add new user</button>
    </form>
  )
}

export default AddUserForm