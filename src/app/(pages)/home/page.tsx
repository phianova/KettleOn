import React from 'react'
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { notFound, redirect } from "next/navigation";

const page = () => {

    // const {isAuthenticated, user, permissions} = useKindeBrowserClient();
    // const currentUserData = user
    // if (!isAuthenticated) redirect(`/auth-callback?origin=home`);
  return (
    <div>Home Page</div>
  )
}

export default page