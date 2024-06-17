"use client"
import React, { useEffect, useState } from 'react'
import { trpc } from "../../app/_trpc/client";
import Link from 'next/link';
import Navbar from '../../components/navbar';

type UserScore = {
    name: string
    score: number
    username: string
}

type gameData = {
    name: string
    score: number
    username: string
}
type numberGameScores = {
    score: number,
    index: number
}
const page = () => {

    let userScores: any[] = [];
    let numberGameScores: any[][] = []
    let aiQuizScores: any[][] = []
    let weeklyQuizScores: any[][] = []
    let nameQuizScores: any [][] = []

    const [allUsers, setAllUsers] = useState<any[]>([
        {
            name: "Me",
            username: "Me",
            game: [
                {
                usage: 1,
                score: 40,
                name: "NumberGame"
                },
                {
                usage: 2,
                score: 15,
                name: "aiQuiz"
                },
                {
                usage: 3,
                score: 20,
                name: "weeklyQuiz"
                },
                {
                usage: 4,
                score: 45,
                name: "nameQuiz"
                }
            ]
        },
        {
            name: "User 2",
            username: "user2",
            game: [
                {
                usage: 1,
                score: 20,
                name: "NumberGame"
                },
                {
                usage: 2,
                score: 14,
                name: "aiQuiz"
                },
                {
                usage: 3,
                score: 20,
                name: "weeklyQuiz"
                },
                {
                usage: 4,
                score: 30,
                name: "nameQuiz"
                }
            ]
        },
        {
            name: "User 3",
            username: "user3",
            game: [
                {
                usage: 1,
                score: 10,
                name: "NumberGame"
                },
                {
                usage: 2,
                score: 30,
                name: "aiQuiz"
                },
                {
                usage: 3,
                score: 19,
                name: "weeklyQuiz"
                },
                {
                usage: 4,
                score: 10,
                name: "nameQuiz"
                }
            ]
        },
        {
            name: "User 4",
            username: "user4",
            game: [
                {
                usage: 1,
                score: 7,
                name: "NumberGame"
                },
                {
                usage: 2,
                score: 35,
                name: "aiQuiz"
                },
                {
                usage: 3,
                score: 10,
                name: "weeklyQuiz"
                },
                {
                usage: 4,
                score: 50,
                name: "nameQuiz"
                }
            ]
        },
        {
            name: "User 5",
            username: "user5",
            game: [
                {
                usage: 1,
                score: 12,
                name: "NumberGame"
                },
                {
                usage: 2,
                score: 14,
                name: "aiQuiz"
                },
                {
                usage: 3,
                score: 20,
                name: "weeklyQuiz"
                },
                {
                usage: 4,
                score: 35,
                name: "nameQuiz"
                }
            ]
        }
    ])

    if (allUsers) {
        allUsers.forEach((user) => {
            if (user.game) {
                user.game.forEach((game: any) => {
                    const gameData: { name: string, score: number, username: string } = {
                        name: game.name.toString(),
                        score: Number(game.score),
                        username: user.username.toString()
                    }
                    userScores.push(gameData)
                })
            }
        })

        userScores?.forEach((game, index) => {
            if (game?.name === "NumberGame") {
                if (game?.score <= 0) {
                    return
                }
                let numberGameArr: any[] = [game?.score, index, game?.username];
                numberGameScores.push(numberGameArr);
            } else if (game?.name === "aiQuiz") {
                if (game?.score <= 0) {
                    return
                }
                let aiQuizArr = [game?.score, index, game?.username];
                aiQuizScores.push(aiQuizArr);
            } else if (game?.name === "weeklyQuiz") {
                if (game?.score <= 0) {
                    return
                }
                let weeklyQuizArr = [game?.score, index, game?.username];
                weeklyQuizScores.push(weeklyQuizArr);
            } else if(game?.name === "nameQuiz") {
                if (game?.score <= 0) {
                    return
                }
                let nameQuizArr = [game?.score, index, game?.username];
                nameQuizScores.push(nameQuizArr);
            }
        });
    }
    // sort scores low to high
    numberGameScores.sort((a, b) => a[0] - b[0]);
    aiQuizScores.sort((a, b) => b[0] - a[0]);
    // sort scores high to low
    weeklyQuizScores.sort((a, b) => b[0] - a[0]);
    nameQuizScores.sort((a, b) => b[0] - a[0]);

    // Calculate average rank for each user
    let usersWithRank = userScores.map((userScore) => {
        if (userScore.score > 0) {
        const numberGameRank = numberGameScores.findIndex((score) => score[2] === userScore.username) + 1;
        const aiQuizRank = aiQuizScores.findIndex((score) => score[2] === userScore.username) + 1;
        const weeklyQuizRank = weeklyQuizScores.findIndex((score) => score[2] === userScore.username) + 1;
        const nameQuizRank = nameQuizScores.findIndex((score) => score[2] === userScore.username) + 1;

        const totalRanks = [numberGameRank, aiQuizRank, weeklyQuizRank, nameQuizRank].filter(rank => rank > 0);
        const averageRank = totalRanks.length > 0 ? totalRanks.reduce((acc, val) => acc + val, 0) / totalRanks.length : 0;

        return { ...userScore, averageRank };
        } else {
            return
        }
    });
    // Sort users based on average rank
    usersWithRank.sort((a, b) => a.averageRank + b.averageRank);

    // Remove duplicate usernames

    let uniqueUsernamesArray: any[] = [];

    for (let i = 0; i < usersWithRank.length; i++) {
        const username = usersWithRank[i]?.username;
        if(usersWithRank[i] == undefined) {
            continue
        }
        if (!uniqueUsernamesArray.includes(username) ) {
            uniqueUsernamesArray.push(username);
        } 
        
    }
   
    // let rank: number = 0;
    // useEffect(() => {
    //     if(allUsers){
    //         rank = uniqueUsernamesArray.indexOf(allUsers[0].username.toString()) + 1;
    //    }
    // }, [allUsers])  

    return (
        <><div className='w-full m-4'>
            <Navbar></Navbar>
        </div><div className='m-20'>

                <div className="h-fit w-fill ring-4 ring-[#E29D65] m-12 rounded-lg bg-gradient-to-br from-[#08605F] via-[#74AA8D] to-[#08605F] text-center flex flex-col items-center justify-center py-10 shadow-xl">
                    <h1 className='text-3xl p-4 text-[#292929] bg-gradient-to-br from-[#FAF2F0] via-[#E29D65] to-[#E29D65] rounded-xl'>LEADERBOARD</h1>
                    {uniqueUsernamesArray.map((user, index) => (
                        <div key={index} className='w-2/3 flex flex-row justify-between border-b-2 border-[#E29D65] border-dashed  px-4 pt-6 pb-1'>
                            <p className='text-3xl bg-[#292929] text-[#FAF2F0] rounded-lg py-1 px-3'>{index + 1}</p>
                            <p className="text-3xl bg-[#FAF2F0] text-[#292929] rounded-lg py-1 px-2">{user}</p>
                        </div>
                    ))}
                </div>
                <div className="h-fit w-fill m-12 rounded-lg bg-gradient-to-br from-[#74AA8D] via-[#08605F] to-[#08605F] text-center flex flex-col items-center justify-center py-10 shadow-xl ">

                    <h1 className='text-2xl p-2 rounded-lg text-[#292929] bg-gradient-to-br from-[#FAF2F0] via-[#E29D65] to-[#E29D65]'>NUMBER GAME</h1>


                    {numberGameScores.map((score, index) => {
                        return (
                            <div key={index} className='w-2/3 flex flex-row justify-between border-b-2 border-[#E29D65] border-dashed  px-4 pt-6 pb-1'>

                                <p className='text-2xl bg-[#292929] text-[#FAF2F0] rounded-lg py-1 px-3'>SCORE: {score[0]}</p>
                                <p className='text-2xl bg-[#FAF2F0] text-[#292929] rounded-lg py-1 px-3'>{score[2].toUpperCase()}</p>
                            </div>
                        );
                    })}
                    <Link href="/NumberGame/game"><button className='text-xl bg-[#292929] text-[#FAF2F0] rounded-lg mt-6 py-1 px-3'>PLAY NOW</button></Link>
                </div>
                <div className="h-fit w-fill m-12 rounded-lg bg-gradient-to-br from-[#74AA8D] via-[#08605F] to-[#08605F] text-center flex flex-col items-center justify-center py-10 shadow-xl"><h1 className='text-2xl p-2 rounded-lg text-[#292929] bg-gradient-to-br from-[#FAF2F0] via-[#E29D65] to-[#E29D65]'>GENERAL KNOWLEDGE QUIZ</h1>
                    {aiQuizScores.map((score, index) => {
                        return (
                            <div key={index} className='w-2/3 flex flex-row justify-between border-b-2 border-[#E29D65] border-dashed  px-4 pt-6 pb-1'>

                                <p className='text-2xl bg-[#292929] text-[#FAF2F0] rounded-lg py-1 px-3'>SCORE: {score[0]}</p>
                                <p className='text-2xl bg-[#FAF2F0] text-[#292929] rounded-lg py-1 px-3'>{score[2].toUpperCase()}</p>
                            </div>
                        );
                    })}
                    <Link href="/Quiz"><button className='text-xl bg-[#292929] text-[#FAF2F0] rounded-lg mt-6 py-1 px-3'>PLAY NOW</button></Link>
                </div>
                <div className="h-fit w-fill m-12 rounded-lg bg-gradient-to-br from-[#74AA8D] via-[#08605F] to-[#08605F] text-center flex flex-col items-center justify-center py-10 shadow-xl"><h1 className='text-2xl p-2 rounded-lg text-[#292929] bg-gradient-to-br from-[#FAF2F0] via-[#E29D65] to-[#E29D65]'>BIG FAT QUIZ OF THE WEEK</h1>
                    {weeklyQuizScores.map((score, index) => {
                        return (
                            <div key={index} className='w-2/3 flex flex-row justify-between border-b-2 border-[#E29D65] border-dashed  px-4 pt-6 pb-1'>

                                <p className='text-2xl bg-[#292929] text-[#FAF2F0] rounded-lg py-1 px-3'>SCORE: {score[0]}</p>
                                <p className='text-2xl bg-[#FAF2F0] text-[#292929] rounded-lg py-1 px-3'>{score[2].toUpperCase()}</p>
                            </div>
                        );
                    })}
                    <Link href="/weeklyquiz"><button className='text-xl bg-[#292929] text-[#FAF2F0] rounded-lg mt-6 py-1 px-3'>PLAY NOW</button></Link>
                </div>
                <div className="h-fit w-fill m-12 rounded-lg bg-gradient-to-br from-[#74AA8D] via-[#08605F] to-[#08605F] text-center flex flex-col items-center justify-center py-10 shadow-xl"><h1 className='text-2xl p-2 rounded-lg text-[#292929] bg-gradient-to-br from-[#FAF2F0] via-[#E29D65] to-[#E29D65]'>NAME QUIZ</h1>
                    {nameQuizScores.map((score, index) => {
                        return (
                            <div key={index} className='w-2/3 flex flex-row justify-between border-b-2 border-[#E29D65] border-dashed  px-4 pt-6 pb-1'>

                                <p className='text-2xl bg-[#292929] text-[#FAF2F0] rounded-lg py-1 px-3'>SCORE: {score[0]}</p>
                                <p className='text-2xl bg-[#FAF2F0] text-[#292929] rounded-lg py-1 px-3'>{score[2].toUpperCase()}</p>
                            </div>
                        );
                    })}
                    <Link href="/weeklyquiz"><button className='text-xl bg-[#292929] text-[#FAF2F0] rounded-lg mt-6 py-1 px-3'>PLAY NOW</button></Link>
                </div>


            </div></>
    )
}


export default page