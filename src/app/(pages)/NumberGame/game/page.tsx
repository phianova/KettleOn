"use client"
import React, { useEffect } from 'react'
import Link from 'next/link';
import { useState } from 'react';
import Keypad from '@/components/ui/Keypad';
const NumberGame = () => {
const [target, setTarget] = useState(0);
const [numArr, setNumArr] = useState([]);
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

    // Function to handle key presses from the keypad
 

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-teal-400 via-sky-200 to-emerald-300">
            <div className='w-2/3 h-2/3 bg-teal-100 rounded opacity-80 border border-teal-400 text-center grid col-span-1 content-evenly'>
                <h1 className=" text-4xl font-bold text-teal-700">NUMBERS GAME</h1>
                {/* target number */}
                <div className='h-1/3 w-fit mx-auto'>
                    <h1 className="text-6xl font-bold text-teal-600 border border-teal-800 px-10 py-2">{target}</h1>
                </div>
                {/* grid of boxes */}
                <div className=''>
                <h2 className='mt-2'>Number Selection:</h2>
                <div className='w-full grid grid-rows-2 place-content-evenly'>
                    <div className=' grid grid-cols-2 gap-10 content-evenly'>
                        <section onClick={generateHighNumber} className="bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-700"><p>Higher</p></section>
                        <section onClick={generateLowNumber} className="bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-700"><p>Lower</p></section>
                    </div>
                    <div className='grid grid-cols-6 mt-6 mb-2 gap-2'>
                    {numArr.slice(0, 6).map((num, index) => (
                        
                        <section className="border border-teal-800 text-teal-600 font-bold flex justify-center items-center py-2 px-4 rounded"><p>{num}</p></section>
                    ))}
                    </div>


                </div>
                </div>

                <div className='grid row-span-3'>
                    {/* keypad */}
                   
                {/* input screen */}
                <div></div>
                {/* mathematical symbols */}

                <div>
                    <textarea type="number" className="h-full bg-teal-200 w-fit mx-auto font-bold py-2 px-4 rounded text-md" placeholder="Enter your guess"/>
                </div>
                </div>
                
                

                <Link href="/NumberGame/start"><button className="h-full bg-teal-600 text-white w-fit mx-auto font-bold py-2 px-4 rounded text-md hover:bg-teal-700">Submit</button></Link>
            </div>
        </div>
      )
}


export default NumberGame
