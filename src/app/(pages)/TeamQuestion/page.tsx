"use client"
import React, { useEffect, useState } from 'react'
import { trpc } from "../../_trpc/client";
import { useRouter } from "next/navigation";

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
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const page = () => {
  let displayName: string | null | undefined
  let currentUser: string | null | undefined;
  let organisation: string | null | undefined;
  let role: string | null | undefined;
  let roleArray: string[] | undefined;
  let currentUserPrompt: string | null | undefined;
  let currentUserAnswer: string | null | undefined;

  const { isAuthenticated, isLoading, user, permissions } = useKindeBrowserClient();
  const kindeUserData = user
  const roleData = permissions

  displayName = (kindeUserData?.given_name ? kindeUserData?.given_name : "") + " " + (kindeUserData?.family_name ? kindeUserData?.family_name : "")
  currentUser = kindeUserData?.email;
  organisation = roleData.orgCode
  roleArray = roleData?.permissions
  role = roleArray ? roleArray[0] : null

  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { data: currentUserData } = trpc.getCurrentUserData.useQuery();
  console.log("currentUserData", currentUserData)

    const currentUserProfile = currentUserData?.data;
    const currentUserPromptsLength = currentUserProfile?.prompts.length || 0
    const currentUserPrompts = currentUserProfile?.prompts as any
    if (currentUserPromptsLength > 0) {
      currentUserPrompt = currentUserPrompts[currentUserPromptsLength - 1].question.toString()
      currentUserAnswer = currentUserPrompts[currentUserPromptsLength - 1].answer.toString()
    }


  const [drawerOpen, setDrawerOpen] = useState(true)
  console.log("where's my question?")
  const { data: questionData } = trpc.askQuestion.useQuery()
  console.log("questionData", questionData)
  const question = questionData?.data.askQuestion;
  const asked = questionData?.data.alreadyAsked;

  useEffect(() => { if (asked === true) {
    setDrawerOpen(false)
  }}, [asked])

  //submitAnswer function
  const { mutate: submitAnswer } = trpc.submitAnswer.useMutation()

  const submitAnswerCall = (e: any) => {
    e.preventDefault();
    const inputs = {
      question: question,
      answer: e.target.answer.value
    }
    submitAnswer(inputs)
    window.location.reload();
  }

  useEffect(() => {
    console.log(isLoading)
      if (isLoading === false && isAuthenticated === false) {
          console.log("You do not have permission to access this page.")
          setLoading(false)
          router.push('/');
      } else if (isLoading === false) {
          setLoading(false)
      }
  }, [isLoading])

  return (
    <div>
      <div>
        <p>{question}</p>
        <p>{currentUserPrompt}</p>
        <p>{currentUserAnswer}</p>
      </div>
      <Drawer open={drawerOpen}>
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
  )
}

export default page