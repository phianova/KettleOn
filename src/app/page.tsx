import { RegisterLink, CreateOrgLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import React from 'react';
import Image from "next/image";
import styles from "./page.module.css";


export default function Home() {
  return (
    <main className={styles.main}>
      
      <div className="ml-80">
        {/* <div>KettleOn</div> */}
        <div className="flex">
      <LoginLink className="mr-2 bg-transparent hover:bg-gray-900 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">
        Sign In
      </LoginLink>  
      <RegisterLink authUrlParams={{"is_create_org":"true"}} className="bg-transparent hover:bg-gray-900 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">
        Register your team
      </RegisterLink>

    </div>
      </div>
     <video 
    src={require("../../public/loopHD.mp4")}
    autoPlay
    muted
    loop
    className={styles.video}/> 
    </main>
  );
}

