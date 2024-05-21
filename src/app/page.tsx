// "use client"

import { RegisterLink, CreateOrgLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import React from 'react';
// import Image from "next/image";
import styles from "./page.module.css";
// import { GoogleAnalytics } from '@next/third-parties/google'
import { FaPowerOff } from "react-icons/fa";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/drawer"
import CookiePolicy from "@/components/CookieConsent";


export default function Home() {
  return (
    <main className={styles.main}>
      
      {/* <GoogleAnalytics gaId="G-R0Y4M12C9B" /> */}
      
      <div >
        {/* <div>KettleOn</div> */}
        <div className="flex ">
       
      

    </div>
      </div>
     <video 
    src="loopHD.mp4"
    autoPlay
    muted
    loop
    className={styles.video}/> 

<Drawer >
  <DrawerTrigger className="ml-20 text-center text-xl text-[#292929] sm:ml-60"><img src="logo.png" height={"200"} width={"200"} alt="Logo"></img><p className="mt-2">Click To Start</p></DrawerTrigger>
  <DrawerContent className="justify-end ml-4 bg-gray-300 xs:w-72 md:w-1/5">
    <DrawerHeader>
      <DrawerTitle>
        <img className="mb-4" src="logo.png" alt="Logo"></img>
      </DrawerTitle>
      <div className="flex flex-col">
        <div className="mx-auto mb-6">
          <LoginLink className="bg-[#E29D65] hover:bg-orange-300 text-white text-xl py-2 px-4 rounded-lg">
            Sign In
          </LoginLink>
        </div>
        <div className="mx-auto">
          <RegisterLink authUrlParams={{"is_create_org":"true"}} className="bg-[#E29D65] rounded-lg hover:bg-orange-300 text-white text-xl hover:text-white py-2 px-4 ">
            Register your team
          </RegisterLink>
        </div>
      </div>
    </DrawerHeader>
    <DrawerDescription></DrawerDescription>
    <DrawerFooter>
      {/* <Button>Submit</Button> */}
      <DrawerClose>
        {/* <Button variant="outline">Cancel</Button> */}
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
<CookiePolicy />
    </main>
  );
}

