"use client"
import React, { useEffect } from 'react'
import Link from 'next/link';
import { useState, useRef } from 'react';
import { trpc } from "../../../_trpc/client";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import numberGame from '../start/page';



export default function NumberGame() {
const [target, setTarget] = useState(0);
const [numArr, setNumArr] = useState<number[]>([]);
const [subNumArr, setSubNumArr] = useState<number[]>([]);
const [subArrFull, setSubArrFull] = useState(false);
const [invalid, setInvalid] = useState(false);
const [win, setWin] = useState(false);
const [completed, setCompleted] = useState(false);
const [score, setScore] = useState(0);

const [seconds, setSeconds] = useState(0);

    useEffect(() => {
      console.log("numArr", numArr)
      if(numArr.length >= 6 && !win){
        const interval = timer();
        return () => clearInterval(interval);
      } else if (win) {
        setScore(seconds);
      }
    }, [numArr, win]);

const timer = () => {
  console.log("timer reached")
        
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
       console.log(seconds);
  }, 1000);

  return interval;
}


const { data: gameData} = trpc.numberGameData.useQuery();
const currentGameData = gameData?.data;
// console.log("from number game data:", currentGameData)
const currentUsage = currentGameData?.usage;


useEffect(() => {
  const fetchData = async () => {
      try {
          const { data: gameData } = await trpc.numberGameData.useQuery();
          const currentGameData = gameData?.data;
          const currentUsage = currentGameData?.usage;

          // Do your state updates based on fetched data
          setNumArr([]);
          setSubNumArr([]);
          setInvalid(false);
          setWin(false);
          setScore(0);
          
          
          if (currentUsage >= 3) {
              setCompleted(true);
          }
      } catch (error) {
          console.error('Error fetching game data:', error);
      }
  };

  fetchData();
}, []);

const { mutate: numberGameUsage } = trpc.numberGameUsage.useMutation()

const { mutate: numberGameScore } = trpc.numberGameScore.useMutation(
  
  )
useEffect(() => {
  console.log("score", score)
  console.log("win", win)
  if(win && score > 0) {
    const scoreObj = {score: score}
    console.log(scoreObj)
    numberGameScore(scoreObj)
  }
}, [win, score]);




// update this - setCompleted(true) needs to be in t
  useEffect(() => {
    if (currentUsage !== undefined) { // Ensure currentUsage is defined before proceeding
        console.log("currentUsage", currentUsage);
        const newUsage = currentUsage + 1;
        const usageObj = {usage: newUsage}
        numberGameUsage(usageObj)
        console.log("Mutation successful. New usage:", newUsage);

        // // also check current games usage
        // if (newUsage >= 3) {
        //     setCompleted(true);
        // }
            
    } else {
        console.log("currentUsage is undefined"); 
    }         
    
}, [win]); // Include currentUsage in the dependencies array
    

// random number generator from 100 - 999
    useEffect(() => {
        setTarget(Math.floor(Math.random() * 900) + 100);
    }, []);

   // generate high number between 25-100
   const generateHighNumber = () => {
    const highNumber = (Math.floor(Math.random() * 75) + 25);
    setNumArr([...numArr,highNumber]);
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

const handleKeyPress = (number : number) => {
  setInputValue((prevValue) => prevValue + number);
  setEquation((prevEquation) => prevEquation + number);
  console.log(equation);
};


const handleClear = () => {
  setInputValue("");
  setEquation("");
};

const handleMathSymbolClick = (symbol : string) => {
  if(symbol !== "=") {
    setInputValue((prevValue) => prevValue + symbol);
    setEquation((prevEquation) => prevEquation + symbol);
  }
};

// onclick of = will take the current line (equation) and evaluate it
const handleEquation = () => {
  
  
    const result = eval(equation.toString());
  console.log(result);
  setInputValue(result);
  setTimeout(() => {
    setInputValue("");
  }, 1500)
  setSubNumArr([...subNumArr, result]);
  
  setEquation("");
  validCheck();
  resultCheck(result);
}

const resultCheck = (result : number) => {
  if (target === result) {
    setWin(true);
    console.log("correct");

  }
}

const handlePlayAgain = () => {
  if(currentUsage >= 3) {
    setCompleted(true);
  } else {
    setNumArr([]);
    setSubNumArr([]);
    setInvalid(false);
    setWin(false);
    setScore(0);
    setSeconds(0);
  }

}

const validCheck = () => {
    // Extracting numbers and operator from the equation
    const expression = equation.split(/([\+\-\*\/])/);
    let isValid = true;
    console.log("expression", expression);

    // Checking if all numbers used in the calculation exist in numArr
    for (let i = 0; i < expression.length; i++) {   
      if (/[\+\-\*\/]/.test(expression[i])) {
        continue;
      }
      if (expression[i] === "" || !numArr.includes(parseInt(expression[i])) && !subNumArr.includes(parseInt(expression[i]))) {
        isValid = false;
        break;
      } 
    }

    if (!isValid) {
    //   setInputValue("Invalid expression");
    console.log("Invalid expression");
    setInvalid(true);  
    // set timeout on invalid expression, and turn into empty toString
    
    setInputValue("Invalid expression");
    setTimeout(() => {
        setInputValue("");
      }, 2000);
    return;
    }
    isValid = true;
    console.log("equation", equation);
    console.log(typeof equation);
    
    // Calculating the result
    // const result = eval(equation.toString());
    // console.log(result);

    // Updating input value with the result
    // setInputValue(result);
  };


 

    return (
<>
{!completed ? (
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
                        <section onClick={generateHighNumber} className="bg-[#74AA8D] text-xl text-white font-bold py-2 px-4 rounded hover:bg-[#587A68]"><p>Higher</p></section>
                        <section onClick={generateLowNumber} className=" text-xl text-white font-bold py-2 px-4 rounded bg-[#74AA8D] hover:bg-[#587A68]"><p>Lower</p></section>
                    </div>
                    <div className='grid grid-cols-6 mt-4 mb-2 gap-2 md:gap-4'>
                    {numArr.slice(0, 6).map((num, index) => (
                        
                        <section className="border border-teal-800 bg-teal-800 text-xl text-yellow-500 font-bold flex justify-center items-center py-2 px-4 rounded"><p>{num}</p></section>
                    ))}
                    </div>
                    <div className='grid grid-cols-6 mt-4 mb-4 gap-2'>
                    {subNumArr.slice(0, 6).map((num, index) => (
                        
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
                className="bg-[#08605F] text-[#FAF2F0] text-bold text-xl p-2 rounded active:scale-125 transition duration-300 ease-in-out"
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
            {["+", "-", "*", "/"].map((symbol) => (
              <button
                key={symbol}
                onClick={() => handleMathSymbolClick(symbol)}
                className="bg-[#08605F] text-[#FAF2F0] text-xl p-2 rounded"
              >
                {symbol}
              </button>
            ))}
            <button
                
                onClick={() => handleEquation()}
                className="bg-[#D85E65]  text-white text-2xl p-2 rounded"
              >
                =
              </button>
          </div>
        </div>
      </div>
    </div>
                
</div> ) : (
    <div className="flex flex-col p-4 mb-4 w-fit mx-auto justify-center items-center bg-[#E29D65] rounded">
    <h2 className='text-3xl font-bold animate-pulse pb-2'>Select 6 Numbers To Start The Game</h2>
    <h3 className='text-xl'>Higher (25 - 99) or Lower (1 - 9)</h3>
    </div>
)}
                {win ? (
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <h1 className="text-4xl font-bold text-teal-600 animate-pulse">YOU WIN</h1>
                        <h1>Score: {score}</h1>
                        <button onClick={handlePlayAgain} className="h-full bg-teal-600 text-white w-fit mx-auto font-bold py-2 px-4 rounded text-md hover:bg-teal-700">Play Again</button>
                    </div> 
                ): (                
                    <div className="flex flex-col gap-4 justify-center items-center">
                    <button onClick={handlePlayAgain} className="h-full text-white w-fit mx-auto font-bold py-2 px-4 rounded text-md bg-[#74AA8D] hover:bg-[#587A68]">Play Again</button>
                    </div> 
                )}


                
                {/* <Link href="/NumberGame/start"><button className="h-full bg-teal-600 text-white w-fit mx-auto font-bold py-2 px-4 rounded text-md hover:bg-teal-700">Submit</button></Link> */}


            </div>
        </div>

        </div>


        ) : (
            <div className='w-screen h-screen'>
              <div className="p-10 bg-teal-100 rounded opacity-80 border border-teal-400 text-center flex  align-middle">
        <h1>daily limit reached</h1>
        </div>
        <Link href="/home"><button className="bg-teal-600 text-white w-1/3 mx-auto font-bold py-2 px-4 rounded hover:bg-teal-700">Back</button></Link>
        </div>
        )  }
</>
      ) 
}


// export default NumberGame
