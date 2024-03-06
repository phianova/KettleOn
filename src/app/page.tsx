// import Image from "next/image";
// import { serverClient } from "../trpc/server-client";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {useState, useEffect} from "react";


export default async function Home() {
  // const connected = await serverClient.apiTest();
  const [content, setContent] = useState({})

  useEffect(() => {
    const test = {
      title: "title",
      quote: "description",
      name: "image"
      
    }
    setContent(test)
  }, [])
  
  
  

  return (
   <><main>
    

        <h1>Main Page</h1>
        <InfiniteMovingCards items={content} className={undefined}/>
        {/* <p>{connected}</p> */}

    </main> </>
  );
}
