"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { trpc } from "../../_trpc/client";
import { useToast } from "../../../components/shadcn/use-toast";

const page = () => {

    type answer = {
        answer: string | undefined
        name: string
    }

    //get user data for team
    let displayName: string | null | undefined
    let currentUser: string | null | undefined;
    let organisation: string | null | undefined;
    let role: string | null | undefined;
    let roleArray: string[] | undefined;

    const router = useRouter()
    const {toast} = useToast()
    const [loading, setLoading] = useState(true)
    const [quizArray, setQuizArray] = useState<any>([{}])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false);
    const [currentScore, setCurrentScore] = useState(0);
    const [limitReached, setLimitReached] = useState(false)
    // const [currentUsage, setCurrentUsage] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);


    const { data: weeklyQuizData } = trpc.weeklyQuizData.useQuery()
    const { mutate: weeklyQuizScore } = trpc.weeklyQuizScore.useMutation({
        onError: (error) => {
            if (error) {
                toast({
                    title: "Error!",
                    description: "Could not update score.",
                })
            }
        }
    })
    const { mutate: weeklyQuizUsage } = trpc.weeklyQuizUsage.useMutation({
        onError: (error) => {
            if (error) {
                toast({
                    title: "Error!",
                    description: "Could not update usage.",
                })
            }
        }
    })
    const currentUsage = weeklyQuizData?.data?.usage

    useEffect(() => {
        if (currentUsage !== undefined) { // Ensure currentUsage is defined before proceeding

            const newUsage = currentUsage + 1;
            const usageObj = { usage: newUsage }
            weeklyQuizUsage(usageObj)
            weeklyQuizScore({ score: currentScore })

            router.refresh()
        } else {
            toast({
                title: "Error!",
                description: "Could not update usage - data is undefined.",
            })
            console.log("currentUsage is undefined");
        }
    }, [showScore])

    const { isAuthenticated, isLoading, user, permissions } = useKindeBrowserClient();
    const kindeUserData = user
    const roleData = permissions

    displayName = (kindeUserData?.given_name ? kindeUserData?.given_name : "") + " " + (kindeUserData?.family_name ? kindeUserData?.family_name : "")
    currentUser = kindeUserData?.email;
    organisation = roleData.orgCode
    roleArray = roleData?.permissions
    role = roleArray ? roleArray[0] : null

    const { data: userData } = trpc.getUsers.useQuery();
    const users = userData?.data || [];
    const usernamesArray = users.map(user => user.username)

    const { data: questions } = trpc.getLastFiveQuestions.useQuery();

    const getQuizQuestions = () => {
        let questionsOnly = questions?.questions || []
        let questionsArray = []
        for (let i = 0; i < questionsOnly.length; i++) {
            let answersArray = []
            for (let j = 0; j < users.length; j++) {
                let questionAnswered = users[j].prompts.find(prompt => prompt.question === questionsOnly[i].question)
                if (questionAnswered?.answer !== undefined) {
                    let answer = questionAnswered?.answer.toString()
                    answersArray.push({ answer: answer, name: users[j].username.toString() })
                }
            }
            let questionObject = {
                question: questionsOnly[i].question,
                answers: answersArray
            }
            questionsArray.push(questionObject)
        }
        console.log(questionsArray)
        return questionsArray;
    }

    useEffect(() => {
        console.log(isLoading)
        if (isLoading === false && isAuthenticated === false) {
            toast({
                title: "Error!",
                description: "You do not have permission to access this page.",
                variant: "destructive"
            })
            console.log("You do not have permission to access this page.")
            setLoading(false)
            router.push('/');
        } else if (isLoading === false) {
            //   setLoading(false)
        }
    }, [isLoading])

    useEffect(() => {
        setQuizArray(getQuizQuestions())
        setLoading(false)
    }, [questions])

    const handleAnswer = (e: any) => {
        e.preventDefault()
        const inputNames = quizArray[currentQuestion].answers.map((ans: answer) => ans.answer?.replace(/\s+/g, ''));
        console.log(inputNames)
        let questionScore = 0
        for (let i = 0; i < inputNames.length; i++) {
            console.log(e.target.elements[inputNames[i]].value)
            console.log(inputNames[i])
            console.log(quizArray[currentQuestion].answers)
            const correct = quizArray[currentQuestion].answers.find((a: answer) => (a.name === e.target.elements[inputNames[i]].value && a.answer?.replace(/\s+/g, '').toString() === inputNames[i])) ? true : false;
            console.log("correct", correct)
            if (correct) {
                questionScore++;
            }
        }
        toast({
            title: "Answers submitted!",
            description: `You got ${questionScore} out of ${inputNames.length}!`,
        })
        setCurrentScore(currentScore + questionScore);
        if (currentQuestion < quizArray.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            setShowScore(true);
        }
        console.log(currentScore)
        e.target.reset();
    }

    useEffect(() => {
        if (currentUsage >= 3) {
            setLimitReached(true)
        }
    }, [currentUsage])

    return (
        <div className="my-5 pb-10 mx-auto w-10/12 h-full bg-[#FAF2F0] text-[#292929] rounded-3xl flex flex-col items-center drop-shadow-lg">
            <h1 className="mt-5 text-3xl md:text-5xl font-bold p-5">Big Fat Quiz of the Week</h1>
            <p className="my-5 p-3 text-xl text-center">Match your teammates with their answers to this week's questions!</p>
            {!quizStarted && <button className="bg-[#08605F] text-[#FAF2F0] text-3xl w-1/3 mx-auto mt-5 font-bold py-5 px-4 rounded-full hover:bg-[#74AA8D] hover:text-[#292929]" onClick={() => setQuizStarted(true)}>Start Quiz</button>}
            {!loading && quizArray.length > 0 && !showScore && !limitReached && quizStarted &&
                <div className="flex flex-col items-center">
                    <p className="font-bold bg-[#08605F]/60 p-5 rounded-lg">Score: {currentScore}</p>
                    <p className="p-3 font-bold text-3xl bg-[#E29D65]/40 rounded-full drop-shadow-md mt-5">Question {currentQuestion + 1}:</p>
                    <p className="p-3 m-2 font-bold text-2xl italic">"{quizArray[currentQuestion].question}"</p>
                    <form onSubmit={handleAnswer} className="flex flex-col items-center">
                        {quizArray[currentQuestion].answers.map((answer: answer, index: number) => (
                            <div key={index} className="mb-10 flex flex-col items-center w-full">
                                <p className="my-3 italic bg-[#E29D65]/40 p-5 rounded-full text-center">"{answer.answer}"</p>
                                {usernamesArray.map((username: any, usernameIndex: number) => (
                                    <div className="flex flex-row justify-start w-full py-2" key={usernameIndex}>
                                        <img src={users[usernameIndex]?.image.toString() || '/user.jpg'} className="w-10 h-10 mx-3 my-auto rounded-full"></img>
                                        <div className="align-middle my-auto">
                                            <label className="p-3">{username}</label>
                                            <input className="p-3" type="radio" name={answer.answer?.replace(/\s+/g, '')} value={username} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button type="submit" className="rounded-full bg-[#E29D65] hover:bg-[#08605F] hover:text-[#FAF2F0] font-bold py-2 px-4 mx-auto">Next</button>
                    </form>
                </div>
            }
            {limitReached && quizStarted &&
                <div className="flex flex-col items-center">
                    <p className="font-bold bg-[#E29D65]/40 p-5 rounded-lg">Plays: {currentUsage}/3</p>
                    <p className="bg-[#E29D65] p-5 rounded-lg mt-10">You have already played this week's quiz three times today.</p>
                    <button onClick={() => router.push('/home')} className="font-bold text-xl text-center mx-auto hover:text-[#E29D65] p-5 rounded-lg">Back to homepage</button>
                </div>}
            {showScore && !limitReached && quizStarted &&
                <div>
                    <p>You scored {currentScore} points!</p>
                    <p className="font-bold bg-[#E29D65]/40 p-5 rounded-lg">Plays: {currentUsage}/3</p>
                    <button onClick={() => {
                        setCurrentScore(0)
                        setCurrentQuestion(0)
                        setShowScore(false)
                        setQuizStarted(false)
                        window.location.reload();
                    }}>Play again</button>
                </div>
            }
                </div>
    )
}

            export default page