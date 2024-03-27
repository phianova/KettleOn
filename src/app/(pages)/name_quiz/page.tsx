
"use client"

import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/navbar';
import Spinner from '../../../components/Spinner';
import { trpc } from "../../_trpc/client";
import Link from 'next/link';
import { useToast } from '../../../components/shadcn/use-toast';

// import classNames from 'classnames';

export default function App() {
    const names = ["andy","john", "jane", "bob", "sarah"];
    const { toast } = useToast()

    const [question, setQuestion] = useState("Answer a question about a name in your team");
    const [teamNames, setTeamNames] = useState(names);
    const [score, setScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState("Sorry, that is incorrect");
    const [numberOfPlays, setNumberOfPlays] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [nameSentToChatGPT, setNameSentToChatGPT] = useState(0);

    const [isloading, setIsLoading] = useState(true)
    const [limitGameplay, setLimitGameplay] = useState(true)

    const randomNumber = Math.floor(Math.random() * teamNames.length);

    

    const isAnswerCorrect = false;

    const { data: nameQuizData} = trpc.nameQuizData.useQuery()
    const { mutate: nameQuizScore } = trpc.nameQuizScore.useMutation() 
    const  { mutate: nameQuizUsage } = trpc.nameQuizUsage.useMutation()
 
    const quizUsage = nameQuizData?.data?.usage
    
    const { data: userData } = trpc.getUsers.useQuery();
    if (userData?.success === false) {
        toast({
            title: "Error!",
            description: "Could not obtain user data.",
            variant: "destructive",
        })
    }

    // PICK RANDOM NAME FROM ARRAY

    // useEffect(() => {
    // setUserName(teamNames[randomNumber+1])
    
    //     }, []);

    useEffect(() => {
        let namesArray = []
        let length = Number(userData?.data?.length)
        for (let i=0; i<length; i++) {
            let userNameSplit = userData?.data[i].username.toString().split(" ") || ["",""]
            let userFirstName = userNameSplit[0]
            namesArray.push(userFirstName)
        }
        setTeamNames(namesArray)
    }, [userData])

    useEffect(() => {
        if (quizUsage !== undefined) {
            setIsLoading(false)
            setNumberOfPlays(quizUsage)
        }
        console.log(quizUsage)
        if (quizUsage >= 3) {
            setLimitGameplay(true)

        }

    }, [quizUsage])

        
    // console.log("randomname is "+ teamNames[randomNumber+1])
    const ChatGPTquestion = "write an interesting question about the name " + teamNames[randomNumber] + " for  a quiz, do not include the name in the question";
    console.log(ChatGPTquestion)


    


    // Chat GPT Call =========

    const apiKey=process.env.NEXT_PUBLIC_CHATGPT_API_KEY;
   
    const url = 'https://api.openai.com/v1/chat/completions';

    const callChatGPT = async () => {
        setNameSentToChatGPT(randomNumber)
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ "role": "user", "content": ChatGPTquestion }],
                    max_tokens: 1000,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
    
            const data = await response.json();
            console.log(data);
            console.log(data.choices[0].message.content);
            const question = data.choices[0].message.content;
            setQuestion(question);
            // console.log(typeof quizArray)

            // setQuestionState(quizArray)
           
        } catch (error) {
            console.error('Request failed:', error);
        }
    }

    // ===========
    

    const handleAnswerButtonClick = (index: number) => {
        setIsAnswered(true)
        console.log("button clicked was "+index)

        if(index===nameSentToChatGPT){

            setIsCorrect("Yes, that is correct!")
            const usageObj = {usage: numberOfPlays + 1}
            nameQuizUsage(usageObj)

            setScore(score+5)
            const scoreObj = {score: score}
            nameQuizScore(scoreObj)
            
            // console.log("correct")
        
    } else{
        setIsCorrect("Sorry that is incorrect")
        // 
    }
}



    
    // const questionsString = JSON.stringify(questions);
    // const ChatGPTquestion = "write an interesting fact about the name" + userName + " for  a quiz, do not include the name in the question";
    
    
    
    


    

	return (
        <div className="bg-[#FAF2F0] mx-10 my-6 pt-6 pb-16 rounded-xl shadow-xl">
            <Navbar></Navbar>
		<div className='ml-auto mr-auto mt-10 bg-slate-200 w-96 app items-center rounded-xl shadow-xl'>
            
            <div className="pt-4 text-2xl text-center font-bold">The Name Quiz</div>
			{/* <div>number of plays is {numberOfPlays}</div>
            <div>score is {score}</div> */}
            
            {limitGameplay ? (<div className="mx-auto ml-6 mt-6 text-center">
                                <div className='w-72 h-72 ml-6 text-center font-sm'>You have reached the daily limit of attempts for today. Please come back tomorrow to play again, or play another game.</div>
                            </div>) : (
                
            <>
			{isAnswered ? (
				
                <div>
                    <p className="text-xl text-center font-bold pt-10">{isCorrect}</p>
                <Link href="/home"><button className="w-full mt-10 mb-6 bg-transparent border border-slate-300 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-full" >Back To Home Page</button></Link>
                </div>
                
                // 
			) : (
				<>
					<div className=' question-section'>
						
                        
                        <div className="flex">
                            <div className='mt-20 mx-4 w-3/5 text-center text-base question-text'>{question}<button className="mt-20 bg-transparent border w-full border-slate-300 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-full mb-2" onClick={callChatGPT}>Show Question</button></div>
                            
					
					<div className='mt-10 pr-2 answer-section'>
                        {teamNames.map( (name: string, index: number) => 
                        
                        <button onClick={() => handleAnswerButtonClick(index)} className="bg-transparent border w-full border-slate-300 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-full mb-2">
                        {name}
                        </button>
                        )}
					</div>
                    </div>
                    </div>
                    <div className="p-12 border m-6 rounded">
                    
                   
</div>
            
				</>
			)}
            </>

            )}
		</div>
        </div>
	);
    
                        }
