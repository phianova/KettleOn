"use client"


import React from 'react'
import Link from 'next/link';
import { IoReturnDownBack } from "react-icons/io5";
import Image from 'next/image'


import YouTube from "react-youtube"; 
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/shadcn/accordion"

const page = () => {
  return (<>
  
    <div className="mt-10 p-6 mx-auto rounded-xl bg-white w-1/2">
        <h1 className="font-bold text-xl md:text-3xl">Help</h1>

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="font-semibold tracking-wider text-lg md:text-xl">What is KettleOn?</AccordionTrigger>
    <AccordionContent className="text-base md:text-lg">
    <div > 
        
        <YouTube className=" mb-6" videoId="BGz2rfQrp_U" 
        opts={{height: '300', width: '400'}} /> 
      </div> 
      Kettle On is a team building platform for remote workers.
Learn more about each other and compete against others in your team to help build a better, stronger team even when there may be miles between the members.

    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-10">
    <AccordionTrigger className="font-semibold tracking-wider text-lg md:text-xl">Do I need cookies?</AccordionTrigger>
    <AccordionContent className="text-base md:text-lg">
    <Image className='mb-4 rounded-lg'
      src="/screen1.png"
      width={600}
      height={400}
      alt="landing page"
    />
      Our system uses cookies for authentication, fonts, and analytics. You need to accept cookies to be able to use KettleOn.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger className="font-semibold tracking-wider text-lg md:text-xl">Logging in</AccordionTrigger>
    <AccordionContent className="text-base md:text-lg">
    <Image className='mb-4 rounded-lg'
      src="/screenshotkinde.png"
      width={600}
      height={400}
      alt="landing page"
    />
      We use Kinde for authentication. When you log in, you'll be taken to our Kinde login page. You'll enter your email and will be sent a unique code to use each time you login.
      For more information about Kinde, <a href="https://kinde.com/authentication/" target="_blank" className="font-semibold hover:text-[#E29D65]">click here</a>.
    </AccordionContent>
  </AccordionItem>


<AccordionItem value="item-3">
    <AccordionTrigger className="font-semibold tracking-wider text-lg md:text-xl">Registering</AccordionTrigger>
    <AccordionContent className="text-base md:text-lg">
      <Image className='mb-4 rounded-lg'
      src="/screenshotregister.png"
      width={600}
      height={400}
      alt="landing page"
    />
      As a manager or team leader, you can register your team with us via the Kinde registration link on our landing page.
      You can then add users within your team via the dashboard. Your teammates will then be able to log in as normal.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-4">
    <AccordionTrigger className="font-semibold tracking-wider text-lg md:text-xl">Question of the day</AccordionTrigger>
    <AccordionContent className="text-base md:text-lg">
    <Image className='mb-4 rounded-lg'
      src="/screenshotteamq.png"
      width={600}
      height={400}
      alt="landing page"
    />
      Every day you are invited to answer a new icebreaker question, which feeds into a quiz about your team's responses. Learn more about each other in a fun way by guessing who answered what!
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-5">
    <AccordionTrigger className="font-semibold tracking-wider text-lg md:text-xl">Playing a game or quiz</AccordionTrigger>
    <AccordionContent className="text-base md:text-lg">
    <Image className='mb-4 rounded-lg'
      src="/numbergame.png"
      width={600}
      height={400}
      alt="landing page"
    />
      Simply pick a game or quiz from our main home page. Once played, your scores will be submitted to the leaderboard. Only three plays are allowed per game, per day.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-6">
    <AccordionTrigger className="font-semibold tracking-wider text-lg md:text-xl">Scoreboard</AccordionTrigger>
    <AccordionContent className="text-base md:text-lg">
    <Image className='mb-4 rounded-lg'
      src="/screenshotscore.png"
      width={600}
      height={400}
      alt="landing page"
    />
      The scoreboard keeps track of who in your team is winning each week.
    </AccordionContent>
  </AccordionItem>


  <AccordionItem value="item-7">
    <AccordionTrigger className="font-semibold tracking-wider text-lg md:text-xl">Merchandise</AccordionTrigger>
    <AccordionContent className="text-base md:text-lg">
    <Image className='mb-4 rounded-lg'
      src="/helpPageMerch.png"
      width={600}
      height={400}
      alt="landing page"
    />
      While a team may be miles apart, they can still share a brew remotely using our official KettleOn mug. All secure payments, shipping & handling are looked after by <a href="https://www.redbubble.com/" target="_blank" className="font-semibold hover:text-[#E29D65]">Redbubble</a>.
    </AccordionContent>
  </AccordionItem>
</Accordion>
<Link href={'./home'}><button> <IoReturnDownBack size={30} className="mt-4"/></button></Link>



    </div>


    <div className="mt-10 p-6 mx-auto rounded-xl bg-white w-1/2">
        <h1 className="font-bold text-xl md:text-3xl">Meet The Team</h1>
      
        <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
    <AccordionTrigger className="font-semibold tracking-wider text-lg md:text-xl">Sophia</AccordionTrigger>
    <AccordionContent className="text-base md:text-lg">
      <div className="flex flex-row justify-between mb-3">
      <p className="pr-3 my-auto">Sophia is a full-stack developer based in London. Her background is in welfare policy and data analysis. She loves solving puzzles and sipping coffee.</p>
      <img src="sophia.png" alt="Sophia" className="w-16 h-16 mx-5 my-auto rounded-full"/>
      </div>
      <a href="https://phianova.github.io/portfolio" className="hover:text-[#E29D65] tracking-wide font-semibold p-2 border border-[#292929] hover:border-[#E29D65] rounded-xl" target="_blank">Sophia's portfolio</a>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger className="font-semibold tracking-wider text-lg md:text-xl">Phillip</AccordionTrigger>
    <AccordionContent className="text-base md:text-lg">
    <div className="flex flex-row justify-between mb-3">
      <p className="pr-3 my-auto">Phillip is a software developer, he enjoys creating interactive UI experiences for the web. He has been involved in the creative industry for the vast majority of his life.</p>
      <img src="phillip.jpg" alt="Phillip" className="w-16 h-16 mx-5 my-auto rounded-full"/>
      </div>
      <a href="https://www.phillipanthony.co.uk/" className="hover:text-[#E29D65] tracking-wide font-semibold p-2 border border-[#292929] hover:border-[#E29D65] rounded-xl" target="_blank">Phillip's portfolio</a>

      </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger className="font-semibold tracking-wider text-lg md:text-xl">Andy</AccordionTrigger>
    <AccordionContent className="text-base md:text-lg">
    <div className="flex flex-row justify-between mb-3">
      <p className="pr-3 my-auto">Andy is a Frontend developer with a background in music and events.</p>
      <img src="andyProfile.png" alt="Andy" className="w-16 h-16 mx-5 my-auto rounded-full"/>
      </div>    

      <a href="https://github.com/andyhinchliffe/portfolio" className="hover:text-[#E29D65] tracking-wide font-semibold p-2 border border-[#292929] hover:border-[#E29D65] rounded-xl" target="_blank">Andy's portfolio</a>
      </AccordionContent>
  </AccordionItem>
        </Accordion>  

  
</div>
    </>
  )
}

export default page