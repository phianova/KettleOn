"use client"
import React from 'react'
import { trpc } from "../../_trpc/client";
import Link from 'next/link';

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
            if(game?.score <= 0){
                return
            }
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

    // Calculate average rank for each user
let usersWithRank = userScores.map((userScore) => {
    const numberGameRank = numberGameScores.findIndex((score) => score.username === userScore.username) + 1;
    const aiQuizRank = aiQuizScores.findIndex((score) => score.username === userScore.username) + 1;
    const averageRank = (numberGameRank + aiQuizRank) / 2;
    return { ...userScore, averageRank };
});

// Sort users based on average rank
usersWithRank.sort((a, b) => a.averageRank - b.averageRank);
console.log("Final ranking:",usersWithRank)

let uniqueUsernamesArray: ( number | string )[]  = [];
for (let i = 0; i < usersWithRank.length; i++) {
    const username = usersWithRank[i].username;
    if (!uniqueUsernamesArray.includes(username)) {
        uniqueUsernamesArray.push(username);
        // uniqueUsersWithRank.push(usersWithRank[i]);
    }
}

console.log("Final Final Ranking:", uniqueUsernamesArray)
    




    // console.log(numberGameArr)
    // for(let i=0; i<numberGameArr.length; i++){
    //     if(numberGameArr[i].score){
    //         numberGameScores.push(numberGameArr[i].score, indexOf(numberGameArr[i]))
    //         console.log(numberGameScores)
    //     }
    // }

  return (
    
        <div >
        <Link href='/' className="text-3xl absolute top-0 left-0">Back</Link>
        <div className="h-fit w-fill m-12 rounded-lg bg-[#08605F] text-center flex flex-col items-center justify-center py-10 shadow-xl">
          <h1 className='text-3xl p-4 text-[#292929] bg-[#E29D65] rounded-lg'>LEADERBOARD</h1>
          {uniqueUsernamesArray.map((user, index) => (
              <div key={index} className='w-2/3 flex flex-row justify-between border-b-2 border-[#E29D65] border-dashed  px-4 pt-6 pb-1'>
                  <p className='text-3xl bg-[#74AA8D] text-[#FAF2F0] rounded-lg py-1 px-3'>{index + 1}</p>
                  <p className="text-3xl bg-[#74AA8D] text-[#FAF2F0] rounded-lg py-1 px-2">{user.toUpperCase()}</p>
                  {/* <p>{user.averageRank}</p> */}
              </div>
          ))}
      </div>
              <div className="h-fit w-fill m-12 rounded-lg bg-[#08605F] text-center flex flex-col items-center justify-center py-10 shadow-xl "><h1 className='text-2xl p-2 rounded-lg text-[#292929] bg-[#E29D65]'>NUMBER GAME</h1>
                  {numberGameScores.map((score, index) => {
                      return (
                          <div key={index} className='w-2/3 flex flex-row justify-between border-b-2 border-[#E29D65] border-dashed  px-4 pt-6 pb-1'>
                              
                              <p className='text-2xl bg-[#74AA8D] text-[#FAF2F0] rounded-lg py-1 px-3'>SCORE: {score[0]}</p>
                              <p className='text-2xl bg-[#74AA8D] text-[#FAF2F0] rounded-lg py-1 px-3'>{score[2].toUpperCase()}</p>
                          </div>
                      );
                  })}
              </div>
              <div className="h-fit w-fill m-12 rounded-lg bg-[#08605F] text-center flex flex-col items-center justify-center py-10 shadow-xl"><h1 className='text-2xl p-2 rounded-lg text-[#292929] bg-[#E29D65]'>QUIZ</h1>
                  {aiQuizScores.map((score, index) => {
                      return (
                          <div key={index} className='w-2/3 flex flex-row justify-between border-b-2 border-[#E29D65] border-dashed  px-4 pt-6 pb-1'>
                              
                              <p className='text-2xl bg-[#74AA8D] text-[#FAF2F0] rounded-lg py-1 px-3'>SCORE: {score[0]}</p>
                              <p className='text-2xl bg-[#74AA8D] text-[#FAF2F0] rounded-lg py-1 px-3'>{score[2].toUpperCase()}</p>
                          </div>
                      );
                  })}
              </div>


         </div>
  )
}

export default page