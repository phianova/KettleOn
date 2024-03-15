"use client"
// import Image from "next/image";
// import { serverClient } from "../trpc/server-client";
import React from 'react';
import { InfiniteMovingCards } from "../../../components/ui/infinite-moving-cards";
import { AnimatedTooltip } from "../../../components/ui/animated-tooltip";
import {useState, useEffect} from "react";
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from "next/navigation";
import { trpc } from "../../_trpc/client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {

  let displayName: string | null | undefined
  let currentUser: string | null | undefined;
  let organisation: string | null | undefined;
  let role: string | null | undefined;
  let roleArray: string[] | undefined;

  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const { isAuthenticated, isLoading, user, permissions } = useKindeBrowserClient();
  const kindeUserData = user
  const roleData = permissions

  displayName = (kindeUserData?.given_name ? kindeUserData?.given_name : "") + " " + (kindeUserData?.family_name ? kindeUserData?.family_name : "")
  currentUser = kindeUserData?.email;
  organisation = roleData.orgCode
  roleArray = roleData?.permissions
  role = roleArray ? roleArray[0] : null

  const { data: userData } = trpc.getUsers.useQuery();
  const { data: currentUserData} = trpc.getCurrentUserData.useQuery();

  
  

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
  
  useEffect(() => {
    if (userData) {
      const userArray = userData?.data
      const usersMapped = userArray?.map((user, index) => 
        {
          const imagePlaceholder = (user.image !== "") ? user.image.toString() : "/user.jpg"
          return {id: index, name: user.username.toString(), designation: user.role.toString(), image: imagePlaceholder}})
      setUsers(usersMapped || users);
    }
  }, [userData])

  const currentUserProfile = currentUserData?.data;
  const currentUserEmail = currentUserProfile?.email.toString()  
  const currentUserCompany = currentUserProfile?.company.toString()
  const currentUserTeamName = currentUserProfile?.teamname.toString()
  const currentUserBio = currentUserProfile?.bio.toString()
  const currentUserRole = currentUserProfile?.role.toString()

  useEffect(() => {
    console.log(isLoading)
      if (isLoading === false && isAuthenticated === false) {
          console.log("You do not have permission to access this page.")
          setLoading(false)
          router.push('/login');
      } else if (isLoading === false) {
          setLoading(false)
      }
  }, [isLoading])

  if (loading) {
    return <div>Loading...</div>
  }


  return (
   <><main className="bg-[#FAF2F0] py-5 my-5">
    

{/* <!--     <button onClick={() => run.refetch()} className='text-6xl'>Test</button> --> */}
        <h1 className="ml-10 mt-10 text-4xl font-semibold">{currentUserTeamName}</h1>
        <div className="ml-20">
        <InfiniteMovingCards items={content} className={undefined}/>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip icons={users} />
    </div>
        {/* <AnimateadTooltip icons={users} /> */}
        {/* <p>{connected}</p> */}
        </div>
        <LogoutLink>Log out</LogoutLink>
    </main> </>
  );
}
