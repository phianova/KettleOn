"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { trpc } from "../../_trpc/client";

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
    const [loading, setLoading] = useState(true)
    const [quizArray, setQuizArray] = useState<any>([{}])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false);
    const [currentScore, setCurrentScore] = useState(0);


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
    //questions as an array of strings

    const getQuizQuestions = () => {
        let questionsOnly = questions?.questions || []
        let questionsArray = []
        for (let i = 0; i < questionsOnly.length; i++) {
            let answersArray = []
            for (let j = 0; j < users.length; j++) {
                let questionAnswered = users[j].prompts.find(prompt => prompt.question === questionsOnly[i].question)
                if (questionAnswered?.answer === undefined) {
                    // answersArray.push({ answer: `Not answered ${[j]}`, name: users[j].username.toString() })
                } else {
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
                //toast(correct)
            }
        } 
        setCurrentScore(currentScore + questionScore);
        if (currentQuestion < quizArray.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            setShowScore(true);
            //push score to database
        }
        console.log(currentScore)
        e.target.reset();
    }



    return (
        <div className="my-5 pb-10 mx-auto w-10/12 h-full bg-[#FAF2F0] text-[#292929] rounded-3xl flex flex-col items-center drop-shadow-lg">
            <h1 className="mt-5 text-3xl font-bold p-5">Big Fat Quiz of the Week</h1>
            <p className="mb-5 p-3 text-xl text-center">Match your teammates with their answers to this week's questions!</p>
            {!loading && quizArray.length > 0 && !showScore &&
                <div>
                    <p className="p-3 font-bold">Question {currentQuestion + 1}: {quizArray[currentQuestion].question}</p>
                    <form onSubmit={handleAnswer} className="flex flex-col items-center">
                        {quizArray[currentQuestion].answers.map((answer: answer, index: number) => (
                            <div key={index} className="mb-10">
                                <p className="">Who do you think answered:</p>
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
            {showScore &&
                <p>You scored {currentScore} points!</p>
            }
        </div>
    )
}

export default page