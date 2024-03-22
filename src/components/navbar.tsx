import React from 'react'
import { RiLogoutCircleFill } from "react-icons/ri";
import { TfiHelpAlt } from "react-icons/tfi";
import { RiUploadCloudLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { TbEditCircle } from "react-icons/tb";
import { IoHome } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import Image from 'next/image'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip"

const navbar = () => {
  return (
    <div className="">

        <div className="w-full flex justify-between my-auto rounded-xl m-4  h-20">
        <div>
            <div className="my-auto" ><Image src="/logo.png" className="hover:scale-125 transition duration-300 hidden sm:block" alt="logo" width={150} height={150} /></div>
            
        </div>


        <div className="mr-10"> 
            <TooltipProvider>
            <Tooltip>
            <TooltipTrigger>
            <div className="my-auto mr-4 "><IoHome className="hover:scale-125 transition duration-300" size={35}/></div>
            </TooltipTrigger>
            <TooltipContent> 
              <p>Home</p>
            </TooltipContent>
            </Tooltip>
            </TooltipProvider>
        
            
           
            <TooltipProvider>
            <Tooltip>
            <TooltipTrigger>
            <div className="my-auto mr-4 "><TfiHelpAlt className="hover:scale-125 transition duration-300" size={35}/></div>
            </TooltipTrigger>
            <TooltipContent> 
              <p>Help</p>
            </TooltipContent>
            </Tooltip>
            </TooltipProvider>



            <TooltipProvider>
            <Tooltip>
            <TooltipTrigger>
            <div className="my-auto mr-4 "><FaUserGroup className="hover:scale-125 transition duration-300" size={35}/></div>
            </TooltipTrigger>
            <TooltipContent> 
              <p>Profile</p>
            </TooltipContent>
            </Tooltip>
            </TooltipProvider>


            <TooltipProvider>
            <Tooltip>
            <TooltipTrigger>
            <div className="my-auto mr-4 "><LogoutLink><RiLogoutCircleFill className="hover:scale-125 transition duration-300" size={35}/></LogoutLink></div>
            </TooltipTrigger>
            <TooltipContent> 
            <p>Logout</p>
            </TooltipContent>
            </Tooltip>
            </TooltipProvider>
        </div>    
            
            {/* </Tooltip>
            </TooltipProvider> */}
            {/* <div className="my-auto mr-2 "><TfiHelpAlt className="hover:scale-125" size={25}/></div>
            <div className="my-auto mr-2"><FaUserGroup className="hover:scale-125" size={30}/></div>
            <div className="my-auto "><RiLogoutCircleFill className="hover:scale-125" size={30}/></div> */}
        </div>
        {/* <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider> */}
    </div>
  )
}

export default navbar