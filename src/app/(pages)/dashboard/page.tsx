import { trpc } from '@/app/_trpc/client'
import React from 'react'

const page = () => {

  
  return (
    <div className="grid grid-cols-6">
        <div className='grid h-screen bg-slate-400 col-span-1'>KettleOn</div>
        
        

        
        <div className='bg-slate-100  col-span-5'>
        <div className='flex ml-10 mt-6 w-full-screen mr-10 shadow-xl rounded-xl  h-16 bg-white'> 
                <div className='my-auto'>
                <div className='text-xs font-light pr-2'>User1</div>
                <div className='text-xs font-semibold pr-2'>sophia.w@gmail.com</div>
                </div>
                <img className="my-auto rounded-full h-10" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png">  
                

                </img> 
            

            
        </div>
        <div className='ml-10 mt-6 shadow-xl rounded-xl w-full-screen mr-10 h-96 p-4 bg-white'>
        <div className='text-center font-semibold mb-6'>Add a new member to your team</div>
            <form>
            
                <input className="mx-auto my-auto block bg-slate-100 rounded-xl text-sm text-center h-10 w-1/2 mb-2" placeholder="First name" type="text" />
            

            
                <input className="mx-auto my-auto block bg-slate-100 rounded-xl text-sm text-center h-10 w-1/2 mb-2" placeholder="Surname" type="text" />
            

            
                <input className="mx-auto my-auto block bg-slate-100 rounded-xl text-sm text-center h-10 w-1/2 mb-2" placeholder="Email" type="text" />
            

            
                <input className="mx-auto my-auto block bg-slate-100 rounded-xl text-sm text-center h-10 w-1/2 mb-2" placeholder="Company" type="text" />
            

            
                <input className="mx-auto my-auto block bg-slate-100 rounded-xl text-sm  text-center h-10 w-1/2 mb-6" placeholder="Role" type="text" />
                <input className="mx-auto  my-auto block bg-white hover:bg-gray-100 text-slate-600 font-semibold py-2 px-4 border border-gray-400 w-1/2 rounded-full" type="button" value="Add" />
            </form>



        </div>
        


        <div className='pt-2 flex flex-wrap '>
        <div className="bg-white h-52 w-72 shadow-xl rounded-xl mt-10 ml-10">
                <div className="text-center pt-6">Team Name</div>
                <div className="mt-6 text-center text-lg font-extrabold">Accounts Department</div>
                <div className="mt-6 text-center text-base font-light">Sheffield - UK</div>

            </div>
        
        
        
            <div className="bg-white shadow-xl h-52 w-72 rounded-xl mt-10 ml-10 pt-6 text-center">Team Members
            <div className='pt-6 text-5xl font-bold'>4</div>
            </div>

           
            <div className="bg-white shadow-xl h-52 w-72 rounded-xl mt-10 ml-10">
                <div className='text-center pt-6 mb-2'>Current Users</div>
                <div className="text-center mt-4 text-sm font-semibold">sophia.w@gmail.com</div>
                <div className="text-center text-sm font-semibold">sophia.w@gmail.com</div>
                <div className="text-center text-sm font-semibold">sophia.w@gmail.com</div>
                <div className="text-center text-sm font-semibold">sophia.w@gmail.com</div>
                </div>
            <div className="bg-white h-52 shadow-xl w-72 rounded-xl mt-10 ml-10">
                <div className="text-center pt-6">Weeks High Scorer</div>
                <div className="mt-6 text-center text-lg font-extrabold">sophia.w@gmail.com</div>

            </div>
            
            </div>
        </div>
        

    </div>
  )
}

export default page