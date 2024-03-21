import React from 'react'


const page = () => {
  return (<div>
  <div className="border-left"></div>
    <div className="flex">
        
        <div className="w-500 h-730 absolute left-80">
    <div className="bg-url('fb-game-background.png') w-500 h-580 absolute">
        <div className="bg-url('flappy-bird.png') absolute w-60 h-45 left-220 bottom-100">

        </div>
    </div>
    <div className="bg-url('bottom-background.png') w-500 h-150 absolute top-580 z-10">

    <div className="absolute bottom-0 h-150 bg-repeat-x animation-slideright webkit-animation-slideright w-full z-10"></div>
    </div>


    </div>

    </div>
  )
}

export default page