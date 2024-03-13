'use client'
import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';

const page = () => {
  return (
    <div>

<CldUploadWidget uploadPreset="kettleon">

{/* onSuccess={async (results, error) => {    
        if (error) {
          console.log(error);
        }
        await client.editUserProfile(results.info.url)
        .then(response => {
          console.log("Profile picture updated successfully!", response.data)
          notify('Profile picture updated successfully!');
          window.location.reload();
        })
        .catch(error => {
          console.error("Error updating profile picture.", error)
          notify("Error updating profile picture. Please try again later.")
        })
        refreshList();
      }}
       */}



  {({ open }) => {
    return (
      <button className="bg-white hover:bg-gray-100 text-gray-600 text-xs font-regular py-1 px-2 border border-gray-400 rounded-xl "onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>

    </div>
  )
}

export default page