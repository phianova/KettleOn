"use client"
// import Image from "next/image";
// import { serverClient } from "../trpc/server-client";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {useState, useEffect} from "react";


export default async function Home() {
  // const connected = await serverClient.apiTest();
  // const test = {
  //   title: "title",
  //   quote: "description",
  //   name: "image"     
  // }
  
  const [content, setContent] = useState([
    {
      title: "info1.1",
      quote: "info1.2",
      name: "info1.3"     
    },
    {
      title: "info2.1",
      quote: "info2.2",
      name: "info2.3"     
    },
    {
      title: "info3.1",
      quote: "info3.2",
      name: "info3.3"     
    }
  ])
  
  

  // useEffect(() => {
    
  //   setContent(test)
  // }, [])


  
  

  return (
   <><main>
    

        <h1>Main Page</h1>
        <InfiniteMovingCards items={content} className={undefined}/>
        {/* <p>{connected}</p> */}

    </main> </>
  );
}
