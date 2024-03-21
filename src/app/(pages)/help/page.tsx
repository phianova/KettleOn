import React from 'react'

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