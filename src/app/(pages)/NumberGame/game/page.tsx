"use client"
import React, { useEffect } from 'react'
import Link from 'next/link';
import { useState, useRef } from 'react';
import { trpc } from "../../../_trpc/client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import numberGame from '../start/page';
import Spinner from '@/components/Spinner';
import { useToast } from '../../../../components/shadcn/use-toast';



export default function NumberGame() {
  const { toast } = useToast();
  const [target, setTarget] = useState(0);
  const [numArr, setNumArr] = useState<number[]>([]);
  const [subNumArr, setSubNumArr] = useState<number[]>([]);
  const [subArrFull, setSubArrFull] = useState(false);
  const [invalid, setInvalid] = useState(true);
  const [win, setWin] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [seconds, setSeconds] = useState(0);

  // score logic
  useEffect(() => {
    console.log("numArr", numArr)
    if (numArr.length >= 6 && !win) {
      const interval = timer();
      return () => clearInterval(interval);
    } else if (win) {
      setScore(seconds);
    }
  }, [numArr, win]);

  // timer logic
  const timer = () => {
    console.log("timer reached")
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return interval;
  }

  // initialising trpc backend functions to fetch and mutate data
  const { data: gameData } = trpc.numberGameData.useQuery();
  const currentGameData = gameData?.data;

  const currentUsage = currentGameData?.usage;


  // initial state and checking usage (usage check not currently working)
  useEffect(() => {
    if (currentUsage !== undefined) {
      setIsLoading(false)
    }


    if (currentUsage >= 3) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }

  }, [currentUsage]);
  // initialising trpc backend functions to fetch and mutate dat
  const { mutate: numberGameUsage } = trpc.numberGameUsage.useMutation({
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
  const { mutate: numberGameScore } = trpc.numberGameScore.useMutation({
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

  // calling trpc function to set new score on
  useEffect(() => {
    console.log("score", score)
    console.log("win", win)
    if (win && score > 0) {
      const scoreObj = { score: score }
      console.log(scoreObj)
      numberGameScore(scoreObj)
    }
  }, [win, score]);


  // update this - setCompleted(true) needs to be in t
  useEffect(() => {
    if (currentUsage !== undefined) { // Ensure currentUsage is defined before proceeding
      console.log("currentUsage", currentUsage);
      const newUsage = currentUsage + 1;
      const usageObj = { usage: newUsage }
      numberGameUsage(usageObj)
      console.log("Mutation successful. New usage:", newUsage);

    } else {
      console.log("currentUsage is undefined");
    }

  }, [win]);


  // random number generator from 100 - 999
  useEffect(() => {
    setTarget(Math.floor(Math.random() * 900) + 100);
  }, []);

  // generate high number between 25-100
  const generateHighNumber = () => {
    const highNumber = (Math.floor(Math.random() * 75) + 25);
    setNumArr([...numArr, highNumber]);
    console.log(highNumber);
  }
  useEffect(() => {
    console.log(numArr);
  }, [numArr]);
  // generate low number between 1-10 
  const generateLowNumber = () => {
    const lowNumber = (Math.floor(Math.random() * 9) + 1);
    setNumArr([...numArr, lowNumber]);
    console.log(lowNumber);
  }



  // keypad logic 

  const [inputValue, setInputValue] = useState("");
  const [equation, setEquation] = useState("");

  const handleKeyPress = (number: number) => {

    setInputValue((prevValue) => prevValue + number);
    setEquation((prevEquation) => prevEquation + number);
    console.log(equation);

  };


  const handleClear = () => {
    setInputValue("");
    setEquation("");
  };

  const handleMathSymbolClick = (symbol: string) => {
    if (symbol !== "=") {
      setInputValue((prevValue) => prevValue + symbol);
      setEquation((prevEquation) => prevEquation + symbol);
    }
  };

  // validcheck gets called onclick of = which calls this if the strings (numbers) are valid
  const handleEquation = () => {
    console.log("got to handleEquation");



    const result = eval(equation.toString());
    console.log(typeof result);
    setInputValue(result);
    setTimeout(() => {
      setInputValue("");
    }, 1500)
    setSubNumArr([...subNumArr, result]);
    console.log(subNumArr);

    setEquation("");
    resultCheck(result);

  }

  const resultCheck = (result: number) => {
    if (target === result) {
      setWin(true);
      console.log("correct");

    }
  }

  const handlePlayAgain = async () => {
    if (currentUsage !== undefined) { // Ensure currentUsage is defined before proceeding
      console.log("currentUsage", currentUsage);
      const newUsage = currentUsage + 1;
      const usageObj = { usage: newUsage }
      numberGameUsage(usageObj)
      console.log("Mutation successful. New usage:", newUsage);
      window.location.reload();

    } else {
      console.log("currentUsage is undefined");
      window.location.reload();
    }

  }

  const validCheck = () => {
    // Extracting numbers and operator from the equation
    console.log("equation", equation);
    const expression = equation.split(/([\+\-\*\/])/);
    console.log("expression", expression);

    // Checking if all numbers used in the calculation exist in numArr
    for (let i = 0; i < expression.length; i++) {
      if (/[\+\-\*\/]/.test(expression[i])) {
        continue;
      }
      if (expression[i] === "" || !numArr.includes(parseInt(expression[i])) && !subNumArr.includes(parseInt(expression[i]))) {
        setInvalid(true);
        setInputValue("Invalid expression");
        setTimeout(() => {
          setInputValue("");
          setEquation("");
        }, 2000);
        break;
      } else {
        setInvalid(false);
        handleEquation();

        return;
      }
    }
  };




  return (
    <>

      {!isLoading ? (
        !completed ? (
          <div className="w-screen h-screen flex justify-center items-center">

            <div className="h-10/12 w-10/12 flex justify-center items-center bg-gradient-to-br from-[#08605F] via- to-[#74AA8D] rounded-xl">
              <h1 className="absolute top-6 text-4xl font-bold text-teal-700">NUMBERS GAME</h1>

              {/* <button  className="absolute text-4xl font-bold text-teal-600 top-6 right-6 border-2 border-teal-600 px-3 rounded-full">I</button> */}
              <h1 className="absolute text-4xl font-bold text-teal-600 top-6 right-6 border-2 border-teal-600 px-3 rounded-full">{currentUsage}/3</h1>
              <div className='w-2/3 h-fit p-10 bg-[#FAF2F0] rounded opacity-80 shadow-xl text-center grid col-span-1 content-evenly'>

                {/* target number */}
                {numArr.length >= 6 ?
                  <div className='relative'>
                    <div className='h-1/3 w-fit bg-[#E29D65] opacity-80 mx-auto'>
                      <h1 className=" text-4xl font-bold text-[#292929] pb-2">TARGET</h1>
                      <h1 className="text-6xl font-bold text-teal-600 border border-teal-800 px-10 py-2">{target}</h1>
                    </div>
                    <div className='flex flex-col'>
                      <h2 className="text-5xl font-bold text-teal-600 absolute top-0 left-0 border border-teal-800 px-2 py-2 rounded-full">{seconds}</h2>

                    </div>
                  </div>

                  : null}

                {/* grid of boxes */}
                <div className=''>
                  <h2 className='mt-6 mb-2 text-2xl font-bold text-[#292929]'>Select your numbers:</h2>
                  <div className='w-full grid grid-rows-2 place-content-evenly'>
                    <div className=' grid grid-cols-2 gap-10 content-evenly'>
                      <section onClick={generateHighNumber} className="bg-[#74AA8D] text-xl text-white font-bold py-2 px-4 rounded hover:bg-[#587A68] transition duration-100"><p>Higher</p></section>
                      <section onClick={generateLowNumber} className=" text-xl text-white font-bold py-2 px-4 rounded bg-[#74AA8D] hover:bg-[#587A68] transition duration-100"><p>Lower</p></section>
                    </div>
                    <div className='grid grid-cols-6 mt-4 mb-2 gap-2 md:gap-4'>
                      {numArr.slice(0, 6).map((num, index) => (

                        <section className="border border-teal-800 bg-teal-800 text-xl text-yellow-500 font-bold flex justify-center items-center py-2 px-4 rounded"><p>{num}</p></section>
                      ))}
                    </div>

                    <div className='grid grid-cols-6 grid-rows-2 mt-4 mb-4 gap-2'>
                      {subNumArr.slice(0, 12).map((num, index) => (
                        <section className="border border-yellow-500 bg-yellow-500 text-teal-800 text-xl font-bold flex justify-center items-center py-2 px-4 rounded"><p>{num}</p></section>
                      ))}
                    </div>

                  </div>
                </div>


                {/* Keypad and input */}
                {numArr.length >= 6 ? (
                  <div className='grid row-span-3 animate fadeIn-down'>

                    <div className="flex flex-col items-center">
                      <div className="grid grid-cols-3 gap-4">
                        {/* Number Keypad */}
                        <div className="col-span-1">
                          <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
                              <button
                                key={number}
                                onClick={() => handleKeyPress(number)}
                                className="bg-[#08605F] text-[#FAF2F0] text-bold text-xl p-2 rounded focus:scale-95 focus:bg-[#E29D65] transition duration-300 "
                              >
                                {number}
                              </button>
                            ))}

                          </div>
                        </div>
                        {/* Input Box */}
                        <div className="col-span-1 h-full">
                          <input
                            type="text"
                            value={inputValue}
                            readOnly
                            className="border border-gray-300 p-2 mb-4 w-full text-center"
                          />
                          <button onClick={handleClear} className="bg-[#D85E65] text-white p-2 w-fit rounded col-span-3">
                            Clear
                          </button>
                        </div>
                        {/* Math Symbols Keypad */}
                        <div className="col-span-1">
                          <div className="grid grid-cols-2 gap-2">
                            {["+", "-", "*", "÷"].map((symbol) => (
                              <button
                                key={symbol}
                                onClick={() => handleMathSymbolClick(symbol)}
                                className="bg-[#08605F] text-[#FAF2F0] text-2xl font-bold p-2 rounded focus:scale-95 focus:bg-[#E29D65] transition duration-300"
                              >
                                {symbol}
                              </button>
                            ))}
                            <button
                              onClick={() => validCheck()}
                              className="bg-[#D85E65] text-white text-2xl p-2 rounded"
                            >
                              =
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>) : (
                  <div className="flex flex-col p-4 mb-4 w-fit mx-auto justify-center items-center bg-[#E29D65] rounded">
                    <h2 className='text-3xl font-bold animate-pulse pb-2'>Select 6 Numbers To Start The Game</h2>
                    <h3 className='text-xl'>Higher (25 - 99) or Lower (1 - 9)</h3>
                  </div>
                )}
                {win ? (
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <h1 className="text-4xl md:text-7xl font-bold text-teal-600 animate-pulse">YOU WIN</h1>
                    <h1>Score: {score}</h1>
                    <button onClick={handlePlayAgain} className="h-full bg-teal-600 text-white w-fit mx-auto font-bold py-2 px-4 rounded text-md hover:bg-teal-700 transition duration-200">Play Again</button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <button onClick={handlePlayAgain} className="h-full text-white w-fit mx-auto font-bold py-2 px-4 rounded text-md bg-[#74AA8D] hover:bg-[#587A68] transition duration-200">Play Again</button>
                  </div>
                )}


              </div>
            </div>

          </div>


        ) : (
          <div className='w-screen h-screen flex flex-col justify-center items-center text-[#FAF2F0]'>
            <div className="p-10 bg-[#08605F] w-2/3 h-fit rounded opacity-80 border-4 border-[#74AA8D] text-center ">
              <h1 className='text-3xl font-bold mb-4 '>Play limit reached for the day</h1>
              <h2 className='text-2xl '>Test your skills with another activity or come back tomorrow!</h2>
            </div>
            <div className="flex flex-row gap-4 mt-2 ">
              <Link href="/home"><button className="bg-[#E29D65] text-white md:text-xl mx-auto font-bold py-2 px-4 rounded hover:bg-[#08605F] transition duration-300">Home</button></Link>
              <Link href="/scoreboard"><button className="bg-[#E29D65] text-white md:text-xl mx-auto font-bold py-2 px-4 rounded hover:bg-[#08605F] transition duration-300">Leaderboard</button></Link>

            </div>
          </div>
        )) : (<Spinner></Spinner>)}
    </>
  )
}


