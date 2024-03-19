"use client"
import React from 'react'
import { trpc } from "../../_trpc/client";

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

    // fetch score data from all users in the team - total score of each game for each user

    const { data: getUsers } = trpc.getUsers.useQuery()
    console.log(getUsers?.data)
    
    let allUsers = getUsers?.data;
    console.log(allUsers)
    // type of userscore
    let userScores: UserScore[] = [];
    
    
    // arr of just score (and index)
    let numberGameScores: number[][] = []
    let aiQuizScores = []
    

    if(allUsers){
        allUsers.forEach((user) => {
            if(user.game){
                user.game.forEach((game) => {
                    
                    const gameData = {
                        name: game.name,
                        score: game.score,
                        username: user.username
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
            let numberGameArr = [game?.score, index, game?.username];
            numberGameScores.push(numberGameArr);
            console.log(game)
        } else if (game?.name === "aiQuiz") {
            let aiQuizArr = [game?.score, index, game?.username];
            aiQuizScores.push(aiQuizArr);
        }

        console.log(numberGameScores)
        
    });
    }
    
    numberGameScores.sort((a, b) => a[0] - b[0]);
    aiQuizScores.sort((a, b) => b[0] - a[0]);





    // console.log(numberGameArr)
    // for(let i=0; i<numberGameArr.length; i++){
    //     if(numberGameArr[i].score){
    //         numberGameScores.push(numberGameArr[i].score, indexOf(numberGameArr[i]))
    //         console.log(numberGameScores)
    //     }
    // }

  return (
    <div className='flex flex-col gap-12'>
        <div><h1>Number Game</h1>
        {numberGameScores.map((score, index) => {
            return (
                <div key={index} className='flex flex-row gap-12'>
                    <p>{index + 1}</p>
                    <p>{score[0]}</p>
                    <p>{score[2]}</p>
                </div>
            )
        })}
        </div>
        <div><h1>Quiz</h1>
        {aiQuizScores.map((score, index) => {
            return (
                <div key={index} className='flex flex-row gap-12'>
                    <p>{index + 1}</p>
                    <p>{score[0]}</p>
                    <p>{score[2]}</p>
                </div>
            )
        })}
        </div>

    </div>
  )
}

export default page