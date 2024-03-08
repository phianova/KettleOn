"use client"
// import Image from "next/image";
// import { serverClient } from "../trpc/server-client";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import {useState, useEffect} from "react";


export default async function Home() {
  // const connected = await serverClient.apiTest();
  // const test = {
  //   title: "title",
  //   quote: "description",
  //   name: "image"     
  // }
  
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
      image: "/user.jpg"
    },
    {id: 2,
      name:"User2" ,
      designation: "Developer",
      image: "/user.jpg"},
    {id: 3,
      name:"User3" ,
      designation: "Developer",
      image: "/user.jpg"}
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
        
    </main> </>
  );
}
