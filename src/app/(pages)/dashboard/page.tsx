"use client";
import React, { useEffect, useState } from 'react'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter, redirect } from "next/navigation";
import AddUserForm from '../../../components/AddUserForm';
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { trpc } from "../../_trpc/client";

interface User {
    email: string,
    username: string
    team: string
    teamname: string
    company: string
    role: string
    image: string
    bio: string
    prompt: string
    answer: string
}

const page = () => {

    let displayName: string | null | undefined
    let currentUser: string | null | undefined;
    let organisation: string | null | undefined;
    let role: string | null | undefined;
    let roleArray: string[] | undefined;

    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [isManager, setIsManager] = useState(false)
    const [isEditMode, setEditMode] = useState(false)
    const [isManagerEditMode, setManagerEditMode] = useState(false)

    const { isAuthenticated, isLoading, user, permissions } = useKindeBrowserClient();
    const kindeUserData = user
    const roleData = permissions

    displayName = (kindeUserData?.given_name ? kindeUserData?.given_name : "") + " " + (kindeUserData?.family_name ? kindeUserData?.family_name : "")
    currentUser = kindeUserData?.email;
    organisation = roleData.orgCode
    roleArray = roleData?.permissions
    role = roleArray ? roleArray[0] : null

    const { data: userData } = trpc.getUsers.useQuery();
    const { data: currentUserData} = trpc.getCurrentUserData.useQuery();
    const { mutate: updateTeam } = trpc.updateTeam.useMutation(
        {
          onSuccess: () => {
            router.refresh()
            console.log("success")
          },
          onError: () => {
            console.log("error")
          }
        }
      )
    
      const { mutate: updateUser } = trpc.updateUser.useMutation(
        {
          onSuccess: () => {
            router.refresh()
            console.log("success")
          },
          onError: () => {
            console.log("error")
          }
        }
      )

    const users = userData?.data || [];
    const currentUserProfile = currentUserData?.data;
    const currentUserEmail = currentUserProfile?.email.toString()  
    const currentUserCompany = currentUserProfile?.company.toString()
    const currentUserTeamName = currentUserProfile?.teamname.toString()
    const currentUserBio = currentUserProfile?.bio.toString()
    const currentUserRole = currentUserProfile?.role.toString()

    console.log("email", currentUserEmail)

    useEffect(() => {
        if (isLoading === false && isAuthenticated === false) {
            console.log("You do not have permission to access this page.")
            setLoading(false)
            router.push('/login');
        }
        else if (isLoading === false && roleData && roleData.permissions && roleData.permissions.includes("manager")) {
            setIsManager(true)
            setLoading(false)
        } else if (isLoading === false) {
            setLoading(false)
        }
    }, [isLoading])

    const handleManagerSubmit = async (e: any) => {
        const inputs = {
            teamname: e.target.teamname.value,
            company: e.target.company.value
        }
        updateTeam(inputs)
        setManagerEditMode(false)

    }

    const handleSubmit = async (e: any) => {
        const inputs = {
            role: e.target.role.value,
            // image: e.target.image.value,
            bio: e.target.bio.value
        }
        updateUser(inputs)
        setEditMode(false)
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="grid grid-cols-6">
            <div className='bg-slate-100 col-span-6'>
                <div className='flex ml-10 mt-6 w-full-screen mr-10 shadow-xl rounded-xl  h-1/12 bg-white'>
                    {!isEditMode &&
                    <div className='my-auto p-3 flex flex-row w-full'>
                        <div className="flex flex-col">
                        <div className='text-xs font-semibold pr-2'>{displayName}</div>
                        <div className='text-xs font-light pr-2'>{currentUser}</div>
                        <div className='text-xs font-light pr-2 mt-3'>Role: {currentUserRole}</div>
                        <div className='text-xs font-light pr-2'>Bio: {currentUserBio}</div>
                        </div>
                        <img className="my-auto rounded-full h-10" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png">
                        </img>
                        <button onClick={() => setEditMode(true)} className="my-2 bg-white hover:bg-gray-100 text-slate-600 font-semibold p-2 border border-gray-400 w-2/12 rounded-full text-sm justify-self-end">Edit</button>
                    </div>}
                    {isEditMode &&
                    <form className='my-auto p-3 flex flex-col' onSubmit={(e) => handleSubmit(e)}>
                        <div className='text-xs font-semibold pr-2'>{displayName}</div>
                        <div className='text-xs font-light pr-2'>{currentUser}</div>
                        <input name="role" className='text-xs font-light pr-2' placeholder="Enter role"></input>
                        <input name="bio" className='text-xs font-light pr-2' placeholder="Enter bio"></input>
                        <img className="my-auto rounded-full h-10" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png">
                        </img>
                        <button type="submit" className="mx-auto my-auto block bg-white hover:bg-gray-100 text-slate-600 font-semibold p-2 border border-gray-400 w-1/2 rounded-full">Save</button>
                    </form>
                    }

                </div>

                {isManager &&
                <div className='ml-10 mt-6 shadow-xl rounded-xl w-full-screen mr-10 h-96 p-4 bg-white'>
                    <div className='text-center font-semibold mb-6'>Add a new member to your team</div>
                    <AddUserForm currentUser={currentUserEmail} organisation={organisation} role={role}></AddUserForm>
                </div>}
                <div className='pt-2 flex flex-wrap justify-between mx-10'>
                    {!isManagerEditMode && 
                    <div className="bg-white h-52 w-72 shadow-xl rounded-xl mt-10">
                        <div className="text-center pt-6 text-lg font-extrabold">{currentUserTeamName}</div>
                        <div className="mt-6 text-center ">{currentUserCompany}</div>
                        {/* <div className="mt-6 text-center text-base font-light">Sheffield - UK</div> */}
                        <button onClick={() => setManagerEditMode(true)} className="mx-auto my-5 block bg-white hover:bg-gray-100 text-slate-600 font-semibold py-2 px-4 border border-gray-400 w-4/12 rounded-full text-sm">Edit</button>
                    </div>}

                    {isManagerEditMode && 
                    <form onSubmit={(e) => handleManagerSubmit(e)} className="bg-white h-52 w-72 shadow-xl rounded-xl mt-10">
                        <input name="teamname" className="text-center pt-6" placeholder={currentUserTeamName}></input>
                        <input name="company" className="mt-6 text-center text-lg font-extrabold" placeholder={currentUserCompany}></input>
                        {/* <div name="location" className="mt-6 text-center text-base font-light">Sheffield - UK</div> */}
                        <button type="submit" className="mx-auto  my-auto block bg-white hover:bg-gray-100 text-slate-600 font-semibold py-2 px-4 border border-gray-400 w-1/2 rounded-full">Save changes</button>
                    </form>
                    }

                    <div className="bg-white shadow-xl h-52 w-72 rounded-xl mt-10 pt-6 text-center">Team Members
                        <div className='pt-6 text-5xl font-bold'>{users?.length}</div>
                    </div>

                    <div className="bg-white shadow-xl h-52 w-72 rounded-xl mt-10">
                        <div className='text-center pt-6 mb-2'>Current Users</div>
                        {userData && users?.length !== 0 && users.map((user: any) => (
                            <div className={"flex flex-col items-center"}>
                                {/* <div className={"flex flex-row justify-around w-full"}> */}
                                    <p className="text-center text-sm font-semibold">{user.username}</p>
                                    <span></span>
                                    <p className="text-center text-sm">{user.email}</p>
                                {/* </div> */}
                            </div>
                        ))}
                    </div>
                    <div className="bg-white h-52 shadow-xl w-72 rounded-xl mt-10">
                        <div className="text-center pt-6">Weeks High Scorer</div>
                        <div className="mt-6 text-center text-lg font-extrabold">sophia.w@gmail.com</div>

                    </div>

                </div>
            </div>


        </div>
    )
}

export default page