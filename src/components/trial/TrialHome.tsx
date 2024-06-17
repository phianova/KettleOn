"use client"
// import Image from "next/image";
// import { serverClient } from "../trpc/server-client";
import Navbar from '@/components/navbar';
import React from 'react';
import { InfiniteMovingCards } from "..//ui/infinite-moving-cards";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { useState, useEffect } from "react";
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from "next/navigation";
import { trpc } from "../../app/_trpc/client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../shadcn/drawer"
import Spinner from "../Spinner"
import { useToast } from "../shadcn/use-toast";
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Home() {

  let displayName: string | null | undefined
  let currentUser: string | null | undefined;
  let organisation: string | null | undefined;
  let role: string | null | undefined;
  let roleArray: string[] | undefined;
  let currentUserPrompt: string | null | undefined;
  let currentUserAnswer: string | null | undefined;

  const router = useRouter()
  const { toast } = useToast();
  const [loading, setLoading] = useState(true)
  const [asked, setAsked] = useState(false)
  const [content, setContent] = useState([
    {
      title: "Number Game",
      image: "/numbergame.png",
      description: "Test your mathematical skills in this countdown-inspired game!",
      link: "/NumberGame/start"
    },
    {
      title: "General Knowledge Quiz",
      image: "/aiquiz.png",
      description: "Test your knowledge of different topics. Try our AI topic generator!",
      link: "/quiz"
    },
    {
      title: "Big Fat Quiz of the Week",
      image: "/weeklyquiz.png",
      description: "Find out new facts about your teammates based on their answers to the daily questions!",
      link: "/weeklyquiz"
    },
    {
      title: "Name Game",
      image: "/namequiz.png",
      description: "A quiz about your teammates' names! Find out fun facts and test your general knowledge.",
      link: "/name_quiz"
    }
  ])

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "User1",
      designation: "Developer",
      image: "/user1.jpg"
    },
    {
      id: 2,
      name: "User2",
      designation: "Overall Manager",
      image: "/user2.jpg"
    },
    {
      id: 3,
      name: "User3",
      designation: "Accounts Manager",
      image: "/user3.jpg"
    },
    {
      id: 4,
      name: "User4",
      designation: "Designer",
      image: "/user4.jpg"
    },
    {
      id: 5,
      name: "User5",
      designation: "Admin Manager",
      image: "/user5.jpg"
    },
  ])

  useEffect(() => {
      setUsers(users);
      setLoading(false);
  }, [])

    currentUserPrompt = "What's your favourite thing about your team?"
    currentUserAnswer = ""


  const [drawerOpen, setDrawerOpen] = useState(false)
  const question = "What's your favourite thing about your team?"

  useEffect(() => {
    if (asked === true) {
      setDrawerOpen(false)
    } else if (asked === false) {
      setDrawerOpen(true)
    }
  }, [asked])

  const submitAnswerCall = (e: any) => {
    e.preventDefault();
    setAsked(true)
    toast({
        title: "Success!",
        description: "Answer submitted successfully."
    })
  }

  if (loading) {
    return <div>
      <Spinner></Spinner>
    </div>
  }

  return (
    <div className="h-full w-full">
    <GoogleAnalytics gaId="G-R0Y4M12C9B" />


      <main className="bg-[#FAF2F0] w-11/12 rounded-xl mx-auto py-5 my-5">

        <Navbar />
        {/* <!--     <button onClick={() => run.refetch()} className='text-6xl'>Test</button> --> */}
        <h1 className="teamTitle text-center mx-auto mb-10 text-6xl ">Your team name</h1>

        <div className="flex flex-col items-center">
          <InfiniteMovingCards items={content} className={undefined} />
          <div className="flex flex-row items-center justify-center my-5 w-full">
            <AnimatedTooltip icons={users} />
          </div>
          {/* <AnimateadTooltip icons={users} /> */}
          {/* <p>{connected}</p> */}
        </div>

      </main>
      <Drawer open={!loading && drawerOpen}>
        {/* <DrawerTrigger>
          Open Drawer
        </DrawerTrigger> */}
        <DrawerContent className="bg-[#FAF2F0]">
          <div className="mx-auto w-full text-center">
            <DrawerHeader className="w-full">
              <DrawerTitle className="text-lg font-normal w-full text-center">Before you start, please answer today's icebreaker question:</DrawerTitle>
              <DrawerDescription className='mt-2 text-[#292929] text-xl text-center'>{question}

              </DrawerDescription>

            </DrawerHeader>
            <form onSubmit={(e) => submitAnswerCall(e)}>
              <label className="flex flex-col items-center">
                <input placeholder="Enter your answer here" className='pl-4 w-full h-10 rounded-xl max-w-sm bg-white placeholder-[#E29D65] text-[#292929] border-2 border-[#E29D65] focus:border-[#E29D65] focus:outline-none'
                  type="text" name="answer"
                />
                <button className=" mt-4 bg-[#FAF2F0] hover:bg-[#E29D65] text-[#292929] font-semibold py-2 px-4 border border-[#292929] rounded-xl shadow w-fit" type="submit">Submit answer</button>
              </label>
            </form>

            <DrawerFooter>
              <DrawerClose>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
