import { RegisterLink, CreateOrgLink } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

export default function Login() {

    return (
        <RegisterLink>
            <CreateOrgLink>
                Sign in
            </CreateOrgLink>
        </RegisterLink>
    )
}
