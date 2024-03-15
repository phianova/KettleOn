"use client"
import React from 'react'
import Link from 'next/link';

const numberGame = () => {


  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-teal-400 via-sky-200 to-emerald-300">
        <div className='w-2/3 h-2/3 bg-white rounded opacity-80 border border-teal-400 text-center grid col-span-1 content-evenly'>
            <h1 className="text-4xl md:text-6xl font-bold text-teal-600">Number Game</h1>
            <p className="py-5 px-14 text-lg md:text-2xl">The Countdown Number Game! Combine given numbers to reach the target before time runs out!</p>
            <Link href="/NumberGame/game"><button className="bg-teal-600 text-white w-1/3 mx-auto font-bold py-2 px-4 rounded hover:bg-teal-700">Play</button></Link>
        </div>
    </div>
  )
};

export default numberGame