import React from 'react'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
// import {useRouter} from "next/navigation";
import AddUserButton from '../../../components/AddUserButton';

export default async function managePage() {
    let currentUser : string | null | undefined;
    let organisation : string | null | undefined;
    let role : string | null | undefined;
    let roleArray : string[] | undefined;

    const {isAuthenticated, getUser, getOrganization, getPermissions} = getKindeServerSession();
    const currentUserData = await getUser()
    const organisationData = await getOrganization()
    const roleData = await getPermissions()
    // const router = useRouter()

    currentUser = currentUserData?.email;
    organisation = organisationData?.orgCode
    roleArray = roleData?.permissions
    role = roleArray ? roleArray[0] : null

    if (!(await isAuthenticated())) {
        console.log("You do not have permission to access this page.")
        // router.push("/login");
        // window.location.href = "/login";
    }

    if (!role || role !== "admin") {
        console.log("You need to be a manager to access this page.")
        // router.push("/home");
    }


    return(
    <div>
        <h1>Manage Users</h1>
        <AddUserButton currentUser={currentUser} organisation={organisation} role={role}></AddUserButton>
    </div>
  )
}