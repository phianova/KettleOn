import React from 'react'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const page = () => {
  return (
    <div>

<Drawer>
      <DrawerTrigger>
        Open Drawer
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Before you start, please answer our team question of the week</DrawerTitle>
            <DrawerDescription className='mt-2'>What is your favorite film?
            
            </DrawerDescription>

          </DrawerHeader>
          <form>
      <label>
        <input placeholder="eg Jaws" className='pl-4 w-full h-10 rounded-xl max-w-sm bg-slate-200'
          type="text" 
          // value={name}
          // onChange={(e) => setName(e.target.value)}
        />
        <input className="w-full mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow" type="button" value="Submit Answer" />
      </label>
    </form>
          
          <DrawerFooter>
            
            <DrawerClose>
              
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>

    </div>
  )
}

export default page