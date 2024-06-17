import React from 'react'
import { RiLogoutCircleFill } from "react-icons/ri";
import { TfiHelpAlt } from "react-icons/tfi";
import { IoHome } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import Image from 'next/image'
import { FaTrophy } from "react-icons/fa6";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../shadcn/tooltip"

const navbar = () => {
    return (
        <div className="">

            <div className="w-full flex justify-between my-auto rounded-xl m-4  h-20">
                <div>
                    <div className="my-auto" ><a href="/home"><Image src="/logo.png" className="hover:scale-125 transition duration-300 hidden sm:block" alt="logo" width={150} height={150} /></a></div>
                </div>


                <div className="mr-10">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="my-auto mr-4 "><a href="/home"><IoHome className="hover:scale-125 transition duration-300" size={35} /></a></div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Home</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>



                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="my-auto mr-4 "><a href="/help"><TfiHelpAlt className="hover:scale-125 transition duration-300" size={35} /></a></div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Help</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>



                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="my-auto mr-4 "><a href="/dashboard"><FaUserGroup className="hover:scale-125 transition duration-300" size={35} /></a></div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Dashboard</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="my-auto mr-4 "><a href="/scoreboard"><FaTrophy className="hover:scale-125 transition duration-300" size={35} /></a></div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Leaderboard</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>


                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="my-auto mr-4 "><RiLogoutCircleFill className="hover:scale-125 transition duration-300" size={35} /></div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Logout</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}

export default navbar