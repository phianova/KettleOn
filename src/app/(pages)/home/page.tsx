"use client"
// import Image from "next/image";
// import { serverClient } from "../trpc/server-client";
import React from 'react';
import { InfiniteMovingCards } from "../../../components/ui/infinite-moving-cards";
import { AnimatedTooltip } from "../../../components/ui/animated-tooltip";
import {useState, useEffect} from "react";
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';

export default async function Home() {
  
  const [content, setContent] = useState([
    
      {
      title: "Quiz",
      image: "/quiz.jpg",
      description: "A quiz to test your teams knowledge",
      link: "/quiz"    
      },
    {
      title: "Team Building Question",
      image: "/team.jpg",
      description: "Find out new facts about your team.",
      link: "/TeamQuestion"      
    },
    {
      title: "Games",
      image: "/games.jpg",
      description: "Play games and compare your score to other team members.",
      link: "/game"      
    }
  ])

  const [users, setUsers] = useState([
    {
      id: 1,
      name:"User1" ,
      designation: "Developer",
      image: "/user1.jpg"
    },
    {id: 2,
      name:"User2" ,
      designation: "Overall Manager",
      image: "/user2.jpg"},
    {id: 3,
      name:"User3" ,
      designation: "Accounts Manager",
      image: "/user3.jpg"},
    {id: 4,
        name:"User4" ,
        designation: "Designer",
        image: "/user4.jpg"},
    {id: 5,
          name:"User5" ,
          designation: "Admin Manager",
          image: "/user5.jpg"},
  ])
  
  

  // useEffect(() => {
    
  //   setContent(test)
  // }, [])


  
  


  return (
   <><main>
    
        <h1 className="ml-10 mt-10 text-4xl font-semibold">Main Page</h1>
        <div className="ml-20">
        <InfiniteMovingCards items={content} className={undefined}/>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip icons={users} />
    </div>
        {/* <AnimatedTooltip icons={users} /> */}
        {/* <p>{connected}</p> */}
        </div>
        <LogoutLink>Log out</LogoutLink>
    </main> </>
  );
}
