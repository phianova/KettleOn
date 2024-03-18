"use client";
import React, { useEffect, useState } from 'react'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter, redirect } from "next/navigation";
import AddUserForm from '../../../components/AddUserForm';
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { trpc } from "../../_trpc/client";
import { CldUploadWidget } from 'next-cloudinary';

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
    const { data: currentUserData } = trpc.getCurrentUserData.useQuery();
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

    const { mutate: updateImage } = trpc.updateImage.useMutation(
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
    const currentUserImage = currentUserProfile?.image.toString()
    console.log(currentUserImage)

    useEffect(() => {
        if (isLoading === false && isAuthenticated === false) {
            console.log("You do not have permission to access this page.")
            setLoading(false)
            router.push('/');
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
            teamname: (e.target.teamname.value !== undefined && e.target.teamname.value !== "" && e.target.teamname.value !== null) ? e.target.teamname.value : currentUserTeamName,
            company: (e.target.company.value !== undefined && e.target.company.value !== "" && e.target.company.value !== null) ? e.target.company.value : currentUserCompany
        }
        updateTeam(inputs)
        setManagerEditMode(false)
        window.location.reload();
    }

    const handleSubmit = async (e: any) => {
        const inputs = {
            role: (e.target.role.value !== undefined && e.target.role.value !== "" && e.target.role.value !== null) ? e.target.role.value : currentUserRole,
            // image: e.target.image.value,
            bio: (e.target.bio.value !== undefined && e.target.role.value !== "") ? e.target.bio.value : currentUserBio
        }
        updateUser(inputs)
        setEditMode(false)
        window.location.reload();
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="grid grid-cols-6 text-[#292929]">
            <div className='col-span-6'>
                <div className='flex mx-10 mt-6 w-full-screen mr-10 shadow-xl rounded-xl  h-1/12 bg-[#FAF2F0] text-[#292929]'>
                    {!isEditMode &&
                        <div className='my-auto p-3 flex flex-row w-full justify-between'>
                            <div className="flex flex-col">
                                <div className='text-xs font-semibold pr-2'>{displayName}</div>
                                <div className='text-xs font-light pr-2'>{currentUser}</div>
                                <div className='text-xs font-light pr-2 mt-3'>Role: {currentUserRole}</div>
                                <div className='text-xs font-light pr-2'>Bio: {currentUserBio}</div>
                            </div>
                            <img className="my-auto rounded-full h-16 w-16" src={currentUserImage}>
                            </img>
                            <span></span>
                            <span></span>
                            <span></span>
                            <button onClick={() => setEditMode(true)} className="my-4 mx-2 bg-[#FAF2F0] hover:bg-[#E29D65] text-[#292929] font-semibold border border-[#292929] border-opacity-60 w-2/12 rounded-full text-sm justify-self-end">Edit</button>
                        </div>}
                    {isEditMode &&
                        <div className="flex flex-row w-full justify-between">
                            <form className='my-auto p-3 flex flex-row w-full justify-between' onSubmit={(e) => handleSubmit(e)}>
                                <div className="flex flex-col">
                                <div className='text-xs font-semibold pr-2'>{displayName}</div>
                                <div className='text-xs font-light pr-2'>{currentUser}</div>
                                <input name="role" className='text-xs font-light p-1 my-1 rounded-xl text-[#292929] placeholder-[#E29D65] placeholder-opacity-60' placeholder="Enter role"></input>
                                <input name="bio" className='text-xs font-light p-1 rounded-xl text-[#292929] placeholder-[#E29D65] placeholder-opacity-60' placeholder="Enter bio"></input>
                                </div>
                                <span></span>
                                <img className="my-auto rounded-full h-16 w-16 ml-10" src={currentUserImage}>
                                </img>
                                <span></span>
                                <button type="submit" className="mx-10 my-auto block bg-[#FAF2F0] hover:bg-[#E29D65] text-[#292929] font-semibold p-2 border border-[#292929] border-opacity-60 w-1/2 rounded-full text-sm">Save</button>
                            </form>
                            <CldUploadWidget uploadPreset="kettleon"
                                onSuccess={async (results: any, error) => {
                                    if (error) {
                                        console.log(error);
                                    }
                                    const url = results?.info?.url.toString()
                                    console.log(url)
                                    updateImage({image: url})
                                    window.location.reload();
                                }}>
                                {({ open }) => {
                                    return (
                                        <button className="mx-10 my-auto block bg-[#FAF2F0] hover:bg-[#E29D65] text-[#292929] font-semibold p-2 border border-[#292929] border-opacity-60 w-1/2 rounded-full text-sm" onClick={() => open()}>
                                            Change profile picture
                                        </button>
                                    );
                                }}
                            </CldUploadWidget>
                        </div>
                    }

                </div>

                {isManager &&
                    <div className='ml-10 mt-6 shadow-xl rounded-xl w-full-screen mr-10 px-4 py-10 bg-[#FAF2F0] text-[#292929]'>
                        <div className='text-center font-semibold mb-6'>Add a new member to your team</div>
                        <AddUserForm currentUser={currentUserEmail} organisation={organisation} role={role}></AddUserForm>
                    </div>}
                <div className='pt-2 flex flex-wrap justify-between mx-10'>
                    {!isManagerEditMode &&
                        <div className="bg-[#FAF2F0] h-52 w-72 shadow-xl rounded-xl mt-10 text-[#292929]">
                            <div className="text-center pt-6 text-lg font-extrabold text-[#292929]">{currentUserTeamName}</div>
                            <div className="mt-6 text-center ">{currentUserCompany}</div>
                            {/* <div className="mt-6 text-center text-base font-light">Sheffield - UK</div> */}
                            {isManager && <button onClick={() => setManagerEditMode(true)} className="mx-auto my-5 block bg-[#FAF2F0] hover:bg-[#E29D65] text-[#292929] font-semibold py-2 px-4 border border-[#292929] border-opacity-60 w-4/12 rounded-full text-sm">Edit</button>}
                        </div>}

                    {isManagerEditMode &&
                        <form onSubmit={(e) => handleManagerSubmit(e)} className="bg-[#FAF2F0] h-52 w-72 shadow-xl rounded-xl mt-10 flex flex-col items-center text-[#292929]">
                            <input name="teamname" className="text-center mt-6 text-lg font-extrabold rounded-xl p-1 text-[#292929] placeholder-[#E29D65] placeholder-opacity-60" placeholder={currentUserTeamName}></input>
                            <input name="company" className="mt-6 text-center rounded-xl p-1 text-[#292929] placeholder-[#E29D65] placeholder-opacity-60" placeholder={currentUserCompany}></input>
                            {/* <div name="location" className="mt-6 text-center text-base font-light">Sheffield - UK</div> */}
                            <button type="submit" className="mx-auto  my-auto block bg-[#FAF2F0] hover:bg-[#E29D65] text-[#292929] font-semibold py-2 px-4 border border-[#292929] border-opacity-60 w-1/2 rounded-full">Save changes</button>
                        </form>
                    }

                    <div className="bg-[#FAF2F0] shadow-xl h-52 w-72 rounded-xl mt-10 pt-6 text-center text-[#292929]">Team Members
                        <div className='pt-6 text-5xl font-bold'>{users?.length}</div>
                    </div>

                    <div className="bg-[#FAF2F0] shadow-xl h-52 w-72 rounded-xl mt-10 overflow-y-scroll text-[#292929]">
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
                    <div className="bg-[#FAF2F0] h-52 shadow-xl w-72 rounded-xl my-10">
                        <div className="text-center pt-6">Weeks High Scorer</div>
                        <div className="mt-6 text-center text-lg font-extrabold text-[#292929]">sophia.w@gmail.com</div>

                    </div>

                </div>
            </div>


        </div>
    )
}

export default page