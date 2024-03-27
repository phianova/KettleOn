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
        <h1 className="font-bold text-xl">Help</h1>

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="font-semibold">What Is Kettle On?</AccordionTrigger>
    <AccordionContent>
    <div > 
        
        <YouTube className=" mb-6" videoId="BGz2rfQrp_U" 
        opts={{height: '300', width: '400'}} /> 
      </div> 
      Kettle On is a team building platform for remote workers.
Learn more about each other and compete against others in your team to help build a better stronger team even when there may be miles between the members.

    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-10">
    <AccordionTrigger className="font-semibold">Do I need Cookies?</AccordionTrigger>
    <AccordionContent>
    <Image className='mb-4 rounded-lg'
      src="/screen1.png"
      width={300}
      height={200}
      alt="landing page"
    />
      Our system uses cookies to work with your team to make the platform work.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger className="font-semibold">Logging In</AccordionTrigger>
    <AccordionContent>
    <Image className='mb-4 rounded-lg'
      src="/screen1.png"
      width={300}
      height={200}
      alt="landing page"
    />
      Our system uses cookies to work with your team to make the platform work.
    </AccordionContent>
  </AccordionItem>


<AccordionItem value="item-3">
    <AccordionTrigger className="font-semibold">Registering</AccordionTrigger>
    <AccordionContent>
      <Image className='mb-4 rounded-lg'
      src="/screen1.png"
      width={300}
      height={200}
      alt="landing page"
    />
      Our system uses cookies to work with your team to make the platform work.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-4">
    <AccordionTrigger className="font-semibold">Question Of The Day</AccordionTrigger>
    <AccordionContent>
    <Image className='mb-4 rounded-lg'
      src="/screen1.png"
      width={300}
      height={200}
      alt="landing page"
    />
      Every Day you are invited to answer a new question which we use at the end of the week for a team quiz. Learn more about each other in a fun way.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-5">
    <AccordionTrigger className="font-semibold">Playing a Game or Quiz</AccordionTrigger>
    <AccordionContent>
    <Image className='mb-4 rounded-lg'
      src="/screen1.png"
      width={300}
      height={200}
      alt="landing page"
    />
      Simply pick a game or quiz from our main home page, once played your scores will be submitted to the leader board. Only three plays are allowed per day.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-6">
    <AccordionTrigger className="font-semibold">Score Board</AccordionTrigger>
    <AccordionContent>
    <Image className='mb-4 rounded-lg'
      src="/screen1.png"
      width={300}
      height={200}
      alt="landing page"
    />
      The leader scoreboard keeps track of who in your team is winning each week.
    </AccordionContent>
  </AccordionItem>


  <AccordionItem value="item-6">
    <AccordionTrigger className="font-semibold">Merchandise</AccordionTrigger>
    <AccordionContent>
    <Image className='mb-4 rounded-lg'
      src="/screen1.png"
      width={300}
      height={200}
      alt="landing page"
    />
      While a team may be miles apart they can still share a brew remotely using our official Kettle On mug. All secure payments, shipping & handling are looked after by Redbubble.
    </AccordionContent>
  </AccordionItem>
</Accordion>
<Link href={'./home'}><button> <IoReturnDownBack size={30} className="mt-4"/></button></Link>



    </div>


    <div className="mt-10 p-6 mx-auto rounded-xl bg-white w-1/2">
        <h1 className="font-bold text-xl">Meet The Team</h1>
      
        <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
    <AccordionTrigger className="font-semibold">Sophia</AccordionTrigger>
    <AccordionContent>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem quas corporis ducimus ipsa sint laborum amet blanditiis quibusdam maxime nemo nihil officia fugit dolores aliquid, cum labore nisi laudantium.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger className="font-semibold">Phillip</AccordionTrigger>
    <AccordionContent>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem quas corporis ducimus ipsa sint laborum amet blanditiis quibusdam maxime nemo nihil officia fugit dolores aliquid, cum labore nisi laudantium.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger className="font-semibold">Andy</AccordionTrigger>
    <AccordionContent>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem quas corporis ducimus ipsa sint laborum amet blanditiis quibusdam maxime nemo nihil officia fugit dolores aliquid, cum labore nisi laudantium.
    </AccordionContent>
  </AccordionItem>
        </Accordion>  

  
</div>
    </>
  )
}

export default page