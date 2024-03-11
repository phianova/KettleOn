"use client";
import React, {useEffect, useState} from 'react'
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {useRouter, redirect} from "next/navigation";
import AddUserForm from '../../../components/AddUserForm';
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";


export default function managePage() {
    let displayName : string | null | undefined
    let currentUser : string | null | undefined;
    let organisation : string | null | undefined;
    let role : string | null | undefined;
    let roleArray : string[] | undefined;

    const router = useRouter()
    const [loaded, setLoaded] = useState("")
    const teamUsers = [
        {displayName: "User One",
        email: "email@email.com"},
        {displayName: "User Two",
        email: "email@email.com"},
        {displayName: "User Three",
        email: "email@email.com"}
    ]

    const { isAuthenticated, isLoading, user, permissions} = useKindeBrowserClient();
    const currentUserData = user
    const roleData = permissions

    displayName = (currentUserData?.given_name ? currentUserData?.given_name : "") + " " + (currentUserData?.family_name ? currentUserData?.family_name : "")
    currentUser = currentUserData?.email;
    organisation = roleData.orgCode
    roleArray = roleData?.permissions
    role = roleArray ? roleArray[0] : null

    console.log(roleData, user)
    console.log ("authenticated: ", isAuthenticated, "user data: ", currentUser, organisation, role)

    useEffect(() => {
        if (isLoading === false && isAuthenticated === false) {
            console.log("You do not have permission to access this page.")
            // redirect(`/auth-callback?origin=manage/${currentUser}`);
            router.push('/login');
            // window.location.href = "/login";
        }
        else if (isLoading === false && roleData && roleData.permissions && !roleData.permissions.includes("manager")) {
            console.log("You need to be a manager to access this page.")
            // redirect("/home")
            router.push('/home');
        }
    }, [isLoading])

    return(
    <div className={"flex flex-col w-full items-center"}>
        <h1 className={"my-5 font-bold"}>Manage Users</h1>
        <p>You are logged in as {displayName}.</p>
        <p className={"mt-10"}>Your team's current users are:</p>
        {teamUsers.map ((user) => (
            <div className={"flex flex-col items-center"}>
            <div className={"flex flex-row justify-around w-full"}>
                <p>{user.displayName}</p>
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