"use client"


import React from 'react'


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
    <div> 
        
        <YouTube videoId="BGz2rfQrp_U" 
        opts={{height: '300', width: '400'}} /> 
      </div> ;
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem quas corporis ducimus ipsa sint laborum amet blanditiis quibusdam maxime nemo nihil officia fugit dolores aliquid, cum labore nisi laudantium.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-10">
    <AccordionTrigger className="font-semibold">Do I need Cookies?</AccordionTrigger>
    <AccordionContent>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem quas corporis ducimus ipsa sint laborum amet blanditiis quibusdam maxime nemo nihil officia fugit dolores aliquid, cum labore nisi laudantium.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger className="font-semibold">Logging In</AccordionTrigger>
    <AccordionContent>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem quas corporis ducimus ipsa sint laborum amet blanditiis quibusdam maxime nemo nihil officia fugit dolores aliquid, cum labore nisi laudantium.
    </AccordionContent>
  </AccordionItem>


<AccordionItem value="item-3">
    <AccordionTrigger className="font-semibold">Registering</AccordionTrigger>
    <AccordionContent>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem quas corporis ducimus ipsa sint laborum amet blanditiis quibusdam maxime nemo nihil officia fugit dolores aliquid, cum labore nisi laudantium.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-4">
    <AccordionTrigger className="font-semibold">Question Of The Day</AccordionTrigger>
    <AccordionContent>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem quas corporis ducimus ipsa sint laborum amet blanditiis quibusdam maxime nemo nihil officia fugit dolores aliquid, cum labore nisi laudantium.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-5">
    <AccordionTrigger className="font-semibold">Playing a Game or Quiz</AccordionTrigger>
    <AccordionContent>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem quas corporis ducimus ipsa sint laborum amet blanditiis quibusdam maxime nemo nihil officia fugit dolores aliquid, cum labore nisi laudantium.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-6">
    <AccordionTrigger className="font-semibold">Score Board</AccordionTrigger>
    <AccordionContent>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem quas corporis ducimus ipsa sint laborum amet blanditiis quibusdam maxime nemo nihil officia fugit dolores aliquid, cum labore nisi laudantium.
    </AccordionContent>
  </AccordionItem>
</Accordion>




    </div>


    <div className="mt-10 p-6 mx-auto rounded-xl bg-white w-1/2">
        <h1 className="font-bold text-xl">Meet The Team</h1>
      
        <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
    <AccordionTrigger className="font-semibold">Sophia</AccordionTrigger>
    <AccordionContent>
      <div className="flex flex-row justify-between">
      <p className="pr-3 my-auto">Sophia is a full-stack developer based in London. Her background is in welfare policy and data analysis. She loves solving puzzles and sipping coffee.</p>
      <img src="sophia.png" alt="Sophia" className="w-16 h-16 mx-5 my-auto rounded-full"/>
      </div>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger className="font-semibold">Phillip</AccordionTrigger>
    <AccordionContent>
    <div className="flex flex-row justify-between">
      <p className="pr-3 my-auto">Phillip is...</p>
      <img src="phillip.png" alt="Phillip" className="w-16 h-16 mx-5 my-auto rounded-full"/>
      </div>    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger className="font-semibold">Andy</AccordionTrigger>
    <AccordionContent>
    <div className="flex flex-row justify-between">
      <p className="pr-3 my-auto">Andy is...</p>
      <img src="andy.png" alt="Andy" className="w-16 h-16 mx-5 my-auto rounded-full"/>
      </div>    </AccordionContent>
  </AccordionItem>
        </Accordion>  

  
</div>
    </>
  )
}

export default page