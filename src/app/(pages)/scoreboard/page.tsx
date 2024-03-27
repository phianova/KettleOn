"use client"
import React, { useEffect, useState } from 'react'
import { trpc } from "../../_trpc/client";
import Link from 'next/link';
import Navbar from '../../../components/navbar';

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


    const { mutate: userRank } = trpc.userRank.useMutation();
    const { data: getCurrentUserData } = trpc.getCurrentUserData.useQuery();
    const currentUser: any = getCurrentUserData?.data;
console.log(currentUser)
    // fetch score data from all users in the team - total score of each game for each user

    const { data: getUsers } = trpc.getUsers.useQuery()
    console.log(getUsers?.data)

    let allUsers = getUsers?.data;
    console.log(allUsers)
    // type of userscore
    let userScores: any[] = [];


    // arr of just score (and index)
    let numberGameScores: any[][] = []
    let aiQuizScores: any[][] = []
    let weeklyQuizScores: any[][] = []


    if (allUsers) {
        allUsers.forEach((user) => {
            if (user.game) {
                user.game.forEach((game) => {

                    const gameData: { name: string, score: number, username: string } = {
                        name: game.name.toString(),
                        score: Number(game.score),
                        username: user.username.toString()
                    }
                    userScores.push(gameData)
                    console.log(typeof gameData.name)
                    console.log(userScores)

                })
            }
        })

        console.log(userScores[0]?.name)

        userScores?.forEach((game, index) => {
            if (game?.name === "NumberGame") {
                if (game?.score <= 0) {
                    return
                }
                let numberGameArr: any[] = [game?.score, index, game?.username];
                numberGameScores.push(numberGameArr);
                console.log(game)
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
            }

            console.log(numberGameScores)

        });
    }
    // sort scores low to high
    console.log(numberGameScores)
    numberGameScores.sort((a, b) => a[0] - b[0]);
    console.log(numberGameScores)
    aiQuizScores.sort((a, b) => b[0] - a[0]);
    console.log(aiQuizScores)
    // sort scores high to low
    weeklyQuizScores.sort((a, b) => b[0] - a[0]);
    console.log(weeklyQuizScores)

    // Calculate average rank for each user
    let usersWithRank = userScores.map((userScore) => {
        if (userScore.score > 0) {
        const numberGameRank = numberGameScores.findIndex((score) => score[2] === userScore.username) + 1;
        const aiQuizRank = aiQuizScores.findIndex((score) => score[2] === userScore.username) + 1;
        const weeklyQuizRank = weeklyQuizScores.findIndex((score) => score[2] === userScore.username) + 1;
        const averageRank = (numberGameRank + aiQuizRank) / 2;
        return { ...userScore, averageRank };
        } else {
            return { ...userScore, averageRank: 0 };
        }
    });

    // Sort users based on average rank
    usersWithRank.sort((a, b) => a.averageRank - b.averageRank);
    console.log("Final ranking:", usersWithRank)

    // Remove duplicate usernames

    let uniqueUsernamesArray: (number | string)[] = [];

    

    for (let i = 0; i < usersWithRank.length; i++) {
        const username = usersWithRank[i].username;
        if (!uniqueUsernamesArray.includes(username)) {
            uniqueUsernamesArray.push(username);
        } 
        
    }
   

    

    
    // userRank causing infinite loop - fix 

    let rank: number = 0;
    useEffect(() => {
        if(currentUser){
            rank = uniqueUsernamesArray.indexOf(currentUser?.username) + 1;
            console.log(rank)
       }
   
           if(rank > 0) {
               const rankObj: {rank: number} = {
                   rank: rank
               }
               console.log("rankObj", rankObj)
               userRank(rankObj)
               }
          
    }, [currentUser])

    
        
        
    
        // console.log(rank)
  


    console.log("Final Final Ranking:", uniqueUsernamesArray)


    return (
        <><div className='w-full m-4'>
            <Navbar></Navbar>
        </div><div className='m-20'>

                <div className="h-fit w-fill ring-4 ring-[#E29D65] m-12 rounded-lg bg-gradient-to-br from-[#08605F] via-[#74AA8D] to-[#08605F] text-center flex flex-col items-center justify-center py-10 shadow-xl">
                    <h1 className='text-3xl p-4 text-[#292929] bg-gradient-to-br from-[#FAF2F0] via-[#E29D65] to-[#E29D65] rounded-xl'>LEADERBOARD</h1>
                    {uniqueUsernamesArray.map((user, index) => (
                        <div key={index} className='w-2/3 flex flex-row justify-between border-b-2 border-[#E29D65] border-dashed  px-4 pt-6 pb-1'>
                            <p className='text-3xl bg-[#292929] text-[#FAF2F0] rounded-lg py-1 px-3'>{index + 1}</p>
                            <p className="text-3xl bg-[#FAF2F0] text-[#292929] rounded-lg py-1 px-2">{user.toString().toUpperCase()}</p>
                            {/* <p>{user.averageRank}</p> */}
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
                <div className="h-fit w-fill m-12 rounded-lg bg-gradient-to-br from-[#74AA8D] via-[#08605F] to-[#08605F] text-center flex flex-col items-center justify-center py-10 shadow-xl"><h1 className='text-2xl p-2 rounded-lg text-[#292929] bg-gradient-to-br from-[#FAF2F0] via-[#E29D65] to-[#E29D65]'>TEAM QUIZ</h1>
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


            </div></>
    )
}


export default page