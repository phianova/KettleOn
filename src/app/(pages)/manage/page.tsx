"use client";
import React, {useEffect, useState} from 'react'
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {useRouter, redirect} from "next/navigation";
import AddUserForm from '../../../components/AddUserForm';
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { trpc } from "../../_trpc/client";

interface User {
    email: string,
    username: string
    team: string
    company: string
    role: string
    image: string
    bio: string
    prompt: string
    answer: string
}

type UserListResponseType = User[]

export default function managePage() {
    let displayName : string | null | undefined
    let currentUser : string | null | undefined;
    let organisation : string | null | undefined;
    let role : string | null | undefined;
    let roleArray : string[] | undefined;

    const router = useRouter()
    const [loading, setLoading] = useState(true)
    // const [teamUsers, setTeamUsers] = useState([])

    const { isAuthenticated, isLoading, user, permissions} = useKindeBrowserClient();
    const currentUserData = user
    const roleData = permissions

    displayName = (currentUserData?.given_name ? currentUserData?.given_name : "") + " " + (currentUserData?.family_name ? currentUserData?.family_name : "")
    currentUser = currentUserData?.email;
    organisation = roleData.orgCode
    roleArray = roleData?.permissions
    role = roleArray ? roleArray[0] : null

    // console.log(roleData, user)
    // console.log ("authenticated: ", isAuthenticated, "user data: ", currentUser, organisation, role)
    // const {data: users} = trpc.getUsers.useQuery() as any; 
    const {data: userData} = trpc.getUsers.useQuery();
    
    let users = userData ? userData.data : [];

    if (users !== undefined) {
    console.log("users", users)
    }
    // if (usersLoading) return <div>Loading...</div>
    // if (usersError) return <div>Error: {usersError.message}</div>


    useEffect(() => {
        if (isLoading === false && isAuthenticated === false) {
            console.log("You do not have permission to access this page.")
            setLoading(false)
            // redirect(`/auth-callback?origin=manage/${currentUser}`);
            router.push('/login');
            // window.location.href = "/login";
        }
        else if (isLoading === false && roleData && roleData.permissions && !roleData.permissions.includes("manager")) {
            console.log("You need to be a manager to access this page.")
            setLoading(false)
            // redirect("/home")
            router.push('/home');
        } else if (isLoading === true) {
            setLoading(true)
        }
        console.log("users", users)
    }, [isLoading])


    return(
    <div className={"flex flex-col w-full items-center"}>
        <h1 className={"my-5 font-bold"}>Manage Users</h1>
        <p>You are logged in as {displayName}.</p>
        <p className={"mt-10"}>Your team's current users are:</p>
        {users && users?.length !== 0 && users.map ((user : any) => (
            <div className={"flex flex-col items-center"}>
            <div className={"flex flex-row justify-around w-full"}>
                <p>{user.username}</p>
                <span></span>
                <p>{user.email}</p>
            </div>
            <div className={"border-2 border-gray-600 w-10/12"}></div>
            </div>
        ))}
        <h2 className={"mt-10"}>Add a user via the form below:</h2>
        <AddUserForm currentUser={currentUser} organisation={organisation} role={role}></AddUserForm>
        <LogoutLink>Log out</LogoutLink>
    </div>
  )
}