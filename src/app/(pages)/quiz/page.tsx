
"use client"

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { trpc } from "../../_trpc/client";
import { useToast } from "../../../components/shadcn/use-toast";
import Navbar from '../../../components/navbar';
import Spinner from '../../../components/Spinner';


export default function App() {
    const { toast } = useToast();
    const questions = [
        {
            questionText: 'Which planet is known as the Red Planet?',
            answerOptions: [
                { answerText: 'Mars', isCorrect: true },
                { answerText: 'Venus', isCorrect: false },
                { answerText: 'Jupiter', isCorrect: false },
                { answerText: 'Mercury', isCorrect: false },
            ],
        },
        {
            questionText: 'Who wrote the famous play "Romeo and Juliet"?',
            answerOptions: [
                { answerText: 'William Shakespeare', isCorrect: true },
                { answerText: 'Jane Austen', isCorrect: false },
                { answerText: 'Charles Dickens', isCorrect: false },
                { answerText: 'Mark Twain', isCorrect: false },
            ],
        },
        {
            questionText: 'What is the chemical symbol for water?',
            answerOptions: [
                { answerText: 'H2O', isCorrect: true },
                { answerText: 'CO2', isCorrect: false },
                { answerText: 'NaCl', isCorrect: false },
                { answerText: 'O2', isCorrect: false },
            ],
        },
        {
            questionText: 'Which country is known as the Land of the Rising Sun?',
            answerOptions: [
                { answerText: 'China', isCorrect: false },
                { answerText: 'Japan', isCorrect: true },
                { answerText: 'South Korea', isCorrect: false },
                { answerText: 'India', isCorrect: false },
            ],
        },
        {
            questionText: 'What is the largest mammal in the world?',
            answerOptions: [
                { answerText: 'Elephant', isCorrect: false },
                { answerText: 'Blue Whale', isCorrect: true },
                { answerText: 'Giraffe', isCorrect: false },
                { answerText: 'Hippopotamus', isCorrect: false },
            ],
        },
        {
            questionText: 'Who painted the Mona Lisa?',
            answerOptions: [
                { answerText: 'Leonardo da Vinci', isCorrect: true },
                { answerText: 'Pablo Picasso', isCorrect: false },
                { answerText: 'Vincent van Gogh', isCorrect: false },
                { answerText: 'Michelangelo', isCorrect: false },
            ],
        },
        {
            questionText: 'What is the currency of Japan?',
            answerOptions: [
                { answerText: 'Yuan', isCorrect: false },
                { answerText: 'Euro', isCorrect: false },
                { answerText: 'Dollar', isCorrect: false },
                { answerText: 'Yen', isCorrect: true },
            ],
        },
        {
            questionText: 'Who was the first man to walk on the moon?',
            answerOptions: [
                { answerText: 'Neil Armstrong', isCorrect: true },
                { answerText: 'Buzz Aldrin', isCorrect: false },
                { answerText: 'Yuri Gagarin', isCorrect: false },
                { answerText: 'Alan Shepard', isCorrect: false },
            ],
        },
        {
            questionText: 'Which element does "O" represent on the periodic table?',
            answerOptions: [
                { answerText: 'Oxygen', isCorrect: true },
                { answerText: 'Osmium', isCorrect: false },
                { answerText: 'Osmium', isCorrect: false },
                { answerText: 'Oganesson', isCorrect: false },
            ],
        },
        {
            questionText: 'In which year did World War II end?',
            answerOptions: [
                { answerText: '1945', isCorrect: true },
                { answerText: '1939', isCorrect: false },
                { answerText: '1941', isCorrect: false },
                { answerText: '1943', isCorrect: false },
            ],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [topic, setTopic] = useState("");
    const [showScore, setShowScore] = useState(false);
    const [currentScore, setCurrentScore] = useState(0);
    const [questionState, setQuestionState] = useState(questions);
    const [useAi, setUseAi] = useState(false);
    const [limitGameplay, setLimitGameplay] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const apiKey = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;

    const url = 'https://api.openai.com/v1/chat/completions';

    const { data: aiQuizData } = trpc.aiQuizData.useQuery()
    const { mutate: aiQuizScore } = trpc.aiQuizScore.useMutation({
        onError: (error) => {
            if (error) {
                toast({
                    title: "Error!",
                    description: "Could not update score.",
                    variant: "destructive",
                })
            }
        }
    })
    const { mutate: aiQuizUsage } = trpc.aiQuizUsage.useMutation({
        onError: (error) => {
            if (error) {
                toast({
                    title: "Error!",
                    description: "Could not update usage.",
                    variant: "destructive",
                })
            }
        }
    })

    const quizUsage = aiQuizData?.data?.usage
    console.log(quizUsage)


    //     useEffect(() => {
    //         if(currentUsage !== undefined) {
    //           setIsLoading(false)
    //         }


    //         if (currentUsage >= 3) {
    //           setCompleted(true);
    //         } else {
    //           setCompleted(false);
    //         }   

    //   }, [currentUsage]);

    useEffect(() => {
        if (quizUsage !== undefined) {
            setIsLoading(false)
        }
        console.log(quizUsage)
        if (quizUsage >= 3) {

            console.log(quizUsage)
            setLimitGameplay(true)

        }

    }, [quizUsage])

    useEffect(() => {
        if (currentScore > 0) {
            const scoreObj = { score: currentScore }
            aiQuizScore(scoreObj)
        }
    }, [showScore])

    const callChatGPT = async () => {
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
            // console.log(data);
            console.log(data.choices[0].message.content);
            const quizArray = JSON.parse(data.choices[0].message.content);
            console.log(typeof quizArray)

            setQuestionState(quizArray)
            toast({
                title: "Success!",
                description: "New questions loaded!",
            })

        } catch (error) {
            toast({
                title: "Error!",
                description: "Could not load new questions.",
                variant: "destructive",
            })
            console.error('Request failed:', error);
        }
    }






    const handleAnswerButtonClick = (isCorrect: boolean) => {

        if (isCorrect === true) {

            setCurrentScore(currentScore + 1)
            console.log(currentScore)
            toast({
                title: "Correct!",
                description: "Nice work!",
            })

        } else {
            toast({
                title: "Wrong!",
                description: "Answer is incorrect.",
            })
        }
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {

            setCurrentQuestion(nextQuestion)
        } else {

            setShowScore(true)
        }

    }

    const handleChangeTopic = (event: any) => {
        setTopic(event.target.value);
    }

    const handleSubmitTopic = (event: any) => {
        callChatGPT()
        console.log({ topic })
        console.log(ChatGPTquestion)
        event.preventDefault();
    }

    const handleReset = () => {
        console.log("reset reached")
        // setCurrentQuestion(0);
        // setCurrentScore(0);
        // setShowScore(false);
        window.location.reload();

        if (quizUsage >= 3) {
            console.log("more than or equal to 3", quizUsage)
            setLimitGameplay(true)

        }
        console.log(quizUsage)
        const newUsage = quizUsage + 1;
        const usageObj = { usage: newUsage }
        aiQuizUsage(usageObj)

    }


    const questionsString = JSON.stringify(questions);
    const ChatGPTquestion = "write 10 easy questions about " + topic + " in the format of " + questionsString;


    //     useEffect(() => {
    //         window.location.reload();
    //    }, [questionState])



    return (
        <>
            {!isLoading ? (
                <div className="bg-[#FAF2F0] mx-10 my-6 pt-6 pb-16 rounded-xl shadow-xl">
                    <Navbar></Navbar>

                    <div className='ml-auto mr-auto mt-10 bg-slate-200 w-96 app rounded-xl'>


                        {limitGameplay ? (
                            <div className="mx-auto text-center">
                                <div className='w-72 h-72 p-4 font-sm'>You have reached the daily limit of attempts for today. Please come back tomorrow to play again, or play another game.</div>
                            </div>
                        ) : (<>



                            {showScore ? (
                                <div className='mx-auto text-center w-72 h-72 p-4 score-section'><p className='mt-4 mb-8'>Congratulations!</p> You scored {currentScore} out of {questions.length}

                                    <button className="mx-auto mt-20 bg-transparent border w-full border-slate-300 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-full mb-2" onClick={() => handleReset()}>
                                        Reset
                                    </button>
                                </div>
                                // 
                            ) : (
                                <>

                                    <div className=' question-section'>
                                        <div className='ml-4 font-bold mb-6 pt-4 question-count'>
                                            <span>Break Room Question {currentQuestion + 1}</span>/{questionState.length}
                                        </div>

                                        <div className="flex">
                                            <div className='mx-4 w-3/5 text-base question-text'>{questionState[currentQuestion].questionText}</div>

                                            <div className='pr-2 answer-section'>
                                                {questionState[currentQuestion].answerOptions.map(answerOption =>
                                                    <button key={answerOption.answerText} onClick={() => handleAnswerButtonClick(answerOption.isCorrect)} className="bg-transparent border w-full border-slate-300 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-full mb-2">
                                                        {answerOption.answerText}
                                                    </button>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-12 border m-6 rounded">

                                        <div onClick={() => setUseAi(!useAi)} className="text-xs">Turn On AI mode

                                            <div className={classNames("flex w-8 rounded-full h-4", { "bg-green-600": useAi, })}>

                                                <div className={classNames("h-4 w-4 bg-white rounded-full", { "ml-4": useAi, })}></div>

                                            </div>
                                        </div>
                                    </div>

                            
                    {useAi ? (
                        <div className=" p-4">
                            <p className=" text-sm mb-2">Use AI to create bespoke questions</p>
                            <form onSubmit={handleSubmitTopic}>
                                <label>
                                    {/* Topic: */}
                                    <input placeholder="Topic" className="bg-white border w-full mb-2 border-slate-300 hover:bg-slate-300 text-slate-500s font-base py-2 px-4 rounded-full" type="text" value={topic} onChange={handleChangeTopic} />
                                </label>
                                <input className="bg-transparent border w-full border-slate-300 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-full" type="submit" value="Generate" />
                            </form>
                        </div>
                    ) : null}

                </>
            )}

        </>)
        }
        </div>
		</div >
        ) : (<Spinner></Spinner>)}
        </>
    );

}
