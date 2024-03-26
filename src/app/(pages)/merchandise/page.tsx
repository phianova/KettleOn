import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
  return (
    <div>

        
        <div className="mt-10 mx-auto rounded-xl w-72 lg:w-1/2 bg-white mb-">
            
         <div className="flex flex-wrap">   
        <Image
        className=" rounded-xl"
      src="/redbubble.png"
      width={300}
      height={400}
      alt="merch mugs"
    />
    
    <div className="w-72"><div className="text-xl ml-10 mt-6">Team Merchandise</div>
    <div className="text-base font-light ml-10 mr-10 mt-6">
        
     Work remotly with your team. Buy mugs for every member, or the weeks high scorer. Available via our online store on Redbubble. 
    </div>
    <div className="ml-10">£12+p&p</div>

    <Link href="https://www.redbubble.com/i/mug/Kettle-On-Official-Team-mug-by-KettleOn100/159465286.9Q0AD"><button className="ml-10 mt-6 mx-auto bg-orange-300 text-white border w-1/2 border-slate-300 hover:bg-slate-300  font-semibold py-2 px-4 rounded-full mb-2">Buy Now</button></Link>
    
    
    
    </div>
    </div>
    
    </div>

    </div>
  )
}

export default page