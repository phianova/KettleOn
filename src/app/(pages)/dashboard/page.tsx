"use client";
import React, { useEffect, useState } from 'react'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter, redirect } from "next/navigation";
import AddUserForm from '../../../components/AddUserForm';
import { trpc } from "../../_trpc/client";
import { CldUploadWidget } from 'next-cloudinary';
import { useToast } from "../../../components/shadcn/use-toast";
import Spinner from '../../../components/Spinner';
import Navbar from '../../../components/navbar';
import Link from 'next/link';

const page = () => {

    const [displayName, setDisplayName] = useState('')
    const [currentUser, setCurrentUser] = useState('')
    const [organisation, setOrganisation] = useState('')
    const [role, setRole] = useState('')
    const [roleArray, setRoleArray] = useState([])
    const [kindeUserData, setKindeUserData] = useState<any>({})
    const [roleData, setRoleData] = useState<any>({})

    const router = useRouter()
    const { toast } = useToast();
    const [loading, setLoading] = useState(true)
    const [isManager, setIsManager] = useState(false)
    const [isEditMode, setEditMode] = useState(false)
    const [isManagerEditMode, setManagerEditMode] = useState(false)
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const { isAuthenticated, isLoading, user, permissions, getPermissions, getToken} = useKindeBrowserClient();
    
    const {data: refreshed} = trpc.refreshUser.useQuery();
    if (refreshed?.success === false) {
        toast({
            title: "Error!",
            description: "Could not obtain manager data.",
            variant: "destructive",
        })
    }

    useEffect(() => {
        if (!isLoading && refreshed?.success === true) {
            getToken()
            setKindeUserData(user)
            setRoleData(permissions)
            setDisplayName((kindeUserData?.given_name ? kindeUserData?.given_name : "") + " " + (kindeUserData?.family_name ? kindeUserData?.family_name : ""));
            setCurrentUser(kindeUserData?.email);
            setOrganisation(roleData.orgCode)
            setRoleArray(roleData?.permissions)
            setRole(roleArray ? roleArray[0] : "")
        }
    }, [refreshed, isLoading, user, permissions])


    useEffect(() => {
        if (isLoading === false && isAuthenticated === false) {
            toast({
                title: "You are not logged in.",
                description: "Redirecting you to landing page...",
            })
            setLoading(false)
            router.push('/');
        }
        else if (isLoading === false && refreshed && roleData && roleData.permissions && roleData.permissions.includes("manager")) {
            setIsManager(true)
            setLoading(false)
        } else if (isLoading === false) {
            setLoading(false)
        }
    }, [isLoading, refreshed])



    const { data: userData } = trpc.getUsers.useQuery();
    if (userData?.success === false) {
        toast({
            title: "Error!",
            description: "Could not obtain user data.",
            variant: "destructive",
        })
    }

    const { data: currentUserData } = trpc.getCurrentUserData.useQuery();
    if (currentUserData?.success === false) {
        toast({
            title: "Error!",
            description: "Could not obtain user data.",
            variant: "destructive",
        })
    }

    const { mutate: updateTeam } = trpc.updateTeam.useMutation({
        onSuccess: async (success) => {
            if (success) {
                toast({
                    title: "Success!",
                    description: "Team updated successfully.",
                    duration: 2000
                })
                setLoading(true)
                await delay(2000);
                window.location.reload();
                setLoading(false)

            }
        },
        onError: async (error) => {
            if (error) {
                toast({
                    title: "Error!",
                    description: "Could not update team.",
                    variant: "destructive",
                    duration: 2000
                })
                setLoading(true)
                await delay(2000);
                window.location.reload();
                setLoading(false)

            }
        }
    })


    const { mutate: updateUser } = trpc.updateUser.useMutation({
        onSuccess: async (success) => {
            if (success) {
                toast({
                    title: "Success!",
                    description: "User updated successfully.",
                    duration: 2000
                }
                )
                setLoading(true)
                await delay(2000);
                window.location.reload();
                setLoading(false)
            }
        },
        onError: async (error) => {
            if (error) {
                toast({
                    title: "Error!",
                    description: "Could not update user.",
                    variant: "destructive",
                    duration: 2000
                })
                setLoading(true)
                await delay(2000);
                window.location.reload();
                setLoading(false)

            }
        }
    })

    const { mutate: updateImage } = trpc.updateImage.useMutation({
        onSuccess: async (success) => {
            if (success) {
                toast({
                    title: "Success!",
                    description: "Profile picture updated successfully.",
                    duration: 2000
                })
                setLoading(true)
                await delay(2000);
                window.location.reload();
                setLoading(false)
            }
        },
        onError: async (error) => {
            if (error) {
                toast({
                    title: "Error!",
                    description: "Could not update profile picture.",
                    variant: "destructive",
                    duration: 2000
                })
                setLoading(true)
                await delay(2000);
                window.location.reload();
                setLoading(false)
            }
        }
    })

    const users = userData?.data || [];
    const firstPlaceUser = users.find(user => user.rank === 1)
    const firstPlaceName = firstPlaceUser?.username.toString()
    const currentUserProfile = currentUserData?.data;
    const currentUserEmail = currentUserProfile?.email.toString()
    const currentUserCompany = currentUserProfile?.company.toString()
    const currentUserTeamName = currentUserProfile?.teamname.toString()
    const currentUserBio = currentUserProfile?.bio.toString()
    const currentUserRole = currentUserProfile?.role.toString()
    const currentUserImage = currentUserProfile?.image.toString()


    const handleManagerSubmit = async (e: any) => {
        e.preventDefault()
        const inputs = {
            teamname: (e.target.teamname.value !== undefined && e.target.teamname.value !== "" && e.target.teamname.value !== null) ? e.target.teamname.value : currentUserTeamName,
            company: (e.target.company.value !== undefined && e.target.company.value !== "" && e.target.company.value !== null) ? e.target.company.value : currentUserCompany
        }
        updateTeam(inputs)
        setManagerEditMode(false)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const inputs = {
            role: (e.target.role.value !== undefined && e.target.role.value !== "" && e.target.role.value !== null) ? e.target.role.value : currentUserRole,
            bio: (e.target.bio.value !== undefined && e.target.role.value !== "") ? e.target.bio.value : currentUserBio
        }
        updateUser(inputs)
        setEditMode(false)
    }

    if (loading) return <Spinner></Spinner>

    return (
        <div className="grid grid-cols-6 text-[#292929]">
            <div className='col-span-6'>
                <div className='mx-10 mt-6 pt-6 w-auto shadow-xl rounded-xl bg-[#FAF2F0] text-[#292929]'>
                    <Navbar></Navbar>
                    <div className='text-2xl sm:text-3xl text-center w-full mb-2'>{displayName}'s dashboard</div>
                    <div className='flex mx-auto w-9/12'>

                        {!isEditMode &&
                            <div className='my-auto p-3 flex flex-col sm:flex-row w-full justify-between items-center'>
                                <div className="flex flex-col mb-3">
                                    <div className='text-lg lg:text-xl font-light pr-2 flex flex-row items-baseline'>Email: <p className="text-base lg:text-lg px-2 mx-2 bg-[#E29D65]/50 rounded-lg">{currentUser}</p></div>
                                    <div className='text-lg lg:text-xl font-light pr-2 flex flex-row items-baseline'>Role: <p className="text-base lg:text-lg px-2 mx-2 bg-[#E29D65]/50 rounded-lg">{currentUserRole}</p></div>
                                    <div className='text-lg lg:text-xl font-light pr-2 flex flex-row items-baseline'>Bio: <p className="text-base lg:text-lg px-2 mx-2 bg-[#E29D65]/50 rounded-lg">{currentUserBio}</p></div>
                                </div>
                                <img className="my-auto rounded-full h-16 w-16 lg:h-24 lg:w-24" src={currentUserImage}>
                                </img>
                                <span></span>
                                <span></span>
                                <span></span>
                                <button onClick={() => setEditMode(true)} className="my-4 mx-3 bg-[#FAF2F0] hover:bg-[#E29D65] text-[#292929] p-2 border border-[#292929] border-opacity-60 w-1/2 sm:w-2/12 rounded-full text-lg lg:text-xl justify-self-end">Edit</button>
                                <a href="/merchandise" className="my-4 mx-3 bg-[#FAF2F0] hover:bg-[#E29D65] text-[#292929] p-2 border border-[#292929] border-opacity-60 w-1/2 sm:w-2/12 rounded-full text-lg lg:text-xl justify-self-end text-center">Get merch!</a>
                            </div>}
                        {isEditMode &&
                            <div className="flex flex-col sm:flex-row w-full items-center">
                                <form className='my-auto p-3 flex flex-col sm:flex-row w-full justify-between items-center' onSubmit={(e) => handleSubmit(e)}>
                                    <div className="flex flex-col">
                                        <div className='text-lg lg:text-xl font-light pr-2 flex flex-row items-baseline'>Email: <p className="text-base lg:text-lg px-2">{currentUser}</p></div>
                                        <div className='text-lg lg:text-xl font-light pr-2 flex flex-row items-baseline'>Role: <input name="role" className='text-lg font-light p-1 my-1 ml-2 rounded-xl text-[#292929] placeholder-[#E29D65] placeholder-opacity-60 w-full' placeholder="Enter role"></input></div>
                                        <div className='text-lg lg:text-xl font-light pr-2 flex flex-row items-baseline'>Bio: <input name="bio" className='text-lg font-light p-1 ml-2 rounded-xl text-[#292929] placeholder-[#E29D65] placeholder-opacity-60 w-full' placeholder="Enter bio"></input></div>
                                    </div>
                                    <img className="my-5 sm:my-auto rounded-full h-16 w-16 lg:h-24 lg:w-24 sm:ml-10" src={currentUserImage}>
                                    </img>
                                    <span></span>
                                    <button type="submit" className="mx-10 my-auto block bg-[#FAF2F0] hover:bg-[#E29D65] text-[#292929]  p-2 border border-[#292929] border-opacity-60 w-1/2 sm:w-3/12 rounded-full text-lg lg:text-xl">Save</button>
                                </form>
                                <CldUploadWidget uploadPreset="kettleon"
                                    onSuccess={async (results: any, error) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                        const url = results?.info?.url.toString()
                                        updateImage({ image: url })
                                    }}>
                                    {({ open }) => {
                                        return (
                                            <button className="mx-auto mb-6 sm:my-auto bg-[#FAF2F0] hover:bg-[#E29D65] text-[#292929] p-2 border border-[#292929] border-opacity-60 w-1/2 sm:w-3/12 rounded-full text-lg lg:text-xl" onClick={() => open()}>
                                                Change profile picture
                                            </button>
                                        );
                                    }}
                                </CldUploadWidget>
                            </div>
                        }
                    </div>
                </div>

                {isManager &&
                    <div className='ml-10 mt-6 shadow-xl rounded-xl w-full-screen mr-10 px-4 py-10 bg-[#FAF2F0] text-[#292929]'>
                        <div className='text-center text-2xl mb-6'>Add a new member to your team</div>
                        <AddUserForm currentUser={currentUserEmail} organisation={organisation} role={role}></AddUserForm>
                    </div>}
                <div className='pt-2 flex flex-wrap justify-center sm:justify-between mx-10'>
                    {!isManagerEditMode &&
                        <div className="bg-[#FAF2F0] h-auto w-72 shadow-xl rounded-xl my-5 text-[#292929] flex flex-col justify-center">
                            <div className="text-center pt-6 text-2xl lg:text-3xl text-[#292929]">{currentUserTeamName}</div>
                            <div className="mt-6 text-center text-xl">{currentUserCompany}</div>
                            {/* <div className="mt-6 text-center text-xl lg:text-2xl font-light">Sheffield - UK</div> */}
                            {isManager && <button onClick={() => setManagerEditMode(true)} className="mx-auto my-5 block bg-[#FAF2F0] hover:bg-[#E29D65] text-[#292929]  py-2 px-4 border border-[#292929] border-opacity-60 w-4/12 rounded-full text-lg lg:text-xl">Edit</button>}
                        </div>}

                    {isManagerEditMode &&
                        <form onSubmit={(e) => handleManagerSubmit(e)} className="bg-[#FAF2F0] h-auto w-72 shadow-xl rounded-xl my-5 flex flex-col justify-center items-center text-[#292929] py-6 ">
                            <input name="teamname" className="text-center mt-6 text-2xl lg:text-3xl rounded-xl p-1 text-[#292929] placeholder-[#E29D65] placeholder-opacity-60" placeholder={currentUserTeamName}></input>
                            <input name="company" className="mt-6 text-xl text-center rounded-xl p-1 text-[#292929] placeholder-[#E29D65] placeholder-opacity-60" placeholder={currentUserCompany}></input>
                            <button type="submit" className="mx-auto my-5 bg-[#FAF2F0] hover:bg-[#E29D65] text-[#292929] px-4 border border-[#292929] border-opacity-60 w-1/2 rounded-full">Save changes</button>
                        </form>
                    }

                    <div className="bg-[#FAF2F0] shadow-xl h-auto w-72 rounded-xl my-5 py-6 text-center text-[#292929] text-2xl flex flex-col justify-center">
                        <p className='text-center pb-6 mb-2 text-2xl underline'>Team Members</p>
                        <div className='text-5xl'>{users?.length}</div>
                    </div>

                    <div className="bg-[#FAF2F0] shadow-xl h-auto w-72 rounded-xl my-5 overflow-y-scroll py-6 text-[#292929] flex flex-col justify-center">
                        <div className='text-center pb-6 mb-2 text-2xl underline'>Current Users</div>
                        {userData && users?.length !== 0 && users.map((user: any, index) => (
                            <div key={index} className={"flex flex-col items-center"}>
                                {/* <div className={"flex flex-row justify-around w-full"}> */}
                                <p className="text-center text-lg lg:text-xl">{user.username}</p>
                                {/* </div> */}
                            </div>
                        ))}
                    </div>
                    <div className="bg-[#FAF2F0] h-auto shadow-xl w-72 rounded-xl my-5 py-6 flex flex-col justify-center">
                        <div className="text-center pb-6 text-2xl underline">Week's High Scorer</div>
                        <div className="my-3 sm:mt-6 text-center text-xl  text-[#292929]">{firstPlaceName ? firstPlaceName : (
                            <Link href="/scoreboard"><button className='mx-auto block bg-[#FAF2F0] hover:bg-[#E29D65] text-[#292929]  py-2 px-4 border border-[#292929] border-opacity-60 w-4/12 rounded-full text-lg lg:text-xl'>View Scoreboard</button></Link>
                        )}</div>

                    </div>

                </div>
            </div>


        </div>
    )
}

export default page