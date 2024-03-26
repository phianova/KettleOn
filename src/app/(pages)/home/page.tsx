"use client"
// import Image from "next/image";
// import { serverClient } from "../trpc/server-client";
import Navbar from '@/components/navbar';
import React from 'react';
import { InfiniteMovingCards } from "../../../components/ui/infinite-moving-cards";
import { AnimatedTooltip } from "../../../components/ui/animated-tooltip";
import { useState, useEffect } from "react";
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from "next/navigation";
import { trpc } from "../../_trpc/client";
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
} from "../../../components/shadcn/drawer"
import Spinner from "../../../components/Spinner"
import { useToast } from "../../../components/shadcn/use-toast";


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

  const { isAuthenticated, isLoading, user, permissions } = useKindeBrowserClient();
  const kindeUserData = user
  const roleData = permissions

  displayName = (kindeUserData?.given_name ? kindeUserData?.given_name : "") + " " + (kindeUserData?.family_name ? kindeUserData?.family_name : "")
  currentUser = kindeUserData?.email;
  organisation = roleData.orgCode
  roleArray = roleData?.permissions
  role = roleArray ? roleArray[0] : null

  const { data: userData } = trpc.getUsers.useQuery();
  const { data: currentUserData } = trpc.getCurrentUserData.useQuery();

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
    if (userData) {
      const userArray = userData?.data
      const usersMapped = userArray?.map((user, index) => {
        const imagePlaceholder = (user.image !== "") ? user.image.toString() : "/user.jpg"
        return { id: index, name: user.username.toString(), designation: user.role.toString(), image: imagePlaceholder }
      })
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
    if (isLoading === false && isAuthenticated === false) {
      toast({
        title: "Error!",
        description: "You do not have permission to access this page.",
        variant: "destructive",
      })
      console.log("You do not have permission to access this page.")
      setLoading(false)
      router.push('/');
    } else if (isLoading === false) {
      setLoading(false)
    }
  }, [isLoading])

  const currentUserPromptsLength = currentUserProfile?.prompts.length || 0
  const currentUserPrompts = currentUserProfile?.prompts as any
  if (currentUserPromptsLength > 0) {
    currentUserPrompt = currentUserPrompts[currentUserPromptsLength - 1].question.toString()
    currentUserAnswer = currentUserPrompts[currentUserPromptsLength - 1].answer.toString()
  }

  const [drawerOpen, setDrawerOpen] = useState(false)
  const { data: questionData } = trpc.askQuestion.useQuery()
  const question = questionData?.data.askQuestion;
  const asked = questionData?.data.alreadyAsked;

  useEffect(() => {
    if (asked === true) {
      setDrawerOpen(false)
    } else if (!isLoading && asked === false) {
      setDrawerOpen(true)
    }
  }, [questionData])

  const { mutate: submitAnswer } = trpc.submitAnswer.useMutation({
    onSuccess: (success) => {
      if (success) {
        toast({
          title: "Success!",
          description: "Answer submitted successfully."
        })
      }
    },
    onError: (error) => {
      if (error) {
        toast({
          title: "Error!",
          description: "Could not submit answer.",
          variant: "destructive",
        })
      }
    }
  })

  const submitAnswerCall = (e: any) => {
    e.preventDefault();
    const inputs = {
      question: question,
      answer: e.target.answer.value
    }
    submitAnswer(inputs)
    window.location.reload();
  }

  if (loading) {
    return <div>
      <Spinner></Spinner>
    </div>
  }

  return (
    <div className="h-full w-full">


      <main className="bg-[#FAF2F0] w-11/12 rounded-xl mx-auto py-5 my-10">

        <Navbar />
        {/* <!--     <button onClick={() => run.refetch()} className='text-6xl'>Test</button> --> */}
        <h1 className="teamTitle text-center mx-auto mb-10 text-6xl ">{currentUserTeamName}</h1>

        <div className="flex flex-col items-center">
          <InfiniteMovingCards items={content} className={undefined} />
          <div className="flex flex-row items-center justify-center my-10 w-full">
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
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Before you start, please answer our team question of the week</DrawerTitle>
              <DrawerDescription className='mt-2'>{question}

              </DrawerDescription>

            </DrawerHeader>
            <form onSubmit={(e) => submitAnswerCall(e)}>
              <label>
                <input placeholder="Enter your answer here" className='pl-4 w-full h-10 rounded-xl max-w-sm bg-slate-200'
                  type="text" name="answer"
                />
                <button className="w-full mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow" type="submit">Submit answer</button>
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
