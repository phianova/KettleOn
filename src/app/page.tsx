import { RegisterLink, CreateOrgLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import React from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import { GoogleAnalytics } from '@next/third-parties/google'
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
} from "@/components/ui/drawer"


export default function Home() {
  return (
    <main className={styles.main}>
      <GoogleAnalytics gaId="G-R0Y4M12C9B" />
      
      <div >
        {/* <div>KettleOn</div> */}
        <div className="flex ">
       
      

    </div>
      </div>
     <video 
    src={require("../../public/loopHD.mp4")}
    autoPlay
    muted
    loop
    className={styles.video}/> 

<Drawer >
  <DrawerTrigger className="ml-20 sm:ml-60"><FaPowerOff style={{ color: "gray", fontSize: "50px" }}/>Start</DrawerTrigger>
  <DrawerContent className="justify-end ml-4 bg-slate-100 xs:w-72 md:w-1/5">
    <DrawerHeader>
      <DrawerTitle>
        <img className="mb-4" src="logo.png" alt="Logo"></img>
      </DrawerTitle>
      <div className="flex flex-col">
        <div className="mx-auto mb-6">
          <LoginLink className="bg-transparent hover:bg-gray-900 text-slate-900 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded-xl">
            Sign In
          </LoginLink>
        </div>
        <div className="mx-auto">
          <RegisterLink authUrlParams={{"is_create_org":"true"}} className="bg-transparent rounded-xl hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent">
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
    </main>
  );
}

