"use client"
import { toast } from '@/components/ui/use-toast';
import { IPayment } from '@/models/Payment.models';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ProfilePage = ({ params }: { params: { username: string }}) => {

  const [userDetails, setUserDetails] = useState({} as any);

  useEffect(() => {
    const fetchUser = async() =>  {
      // DB call
      const response = await axios.get(`/api/user/${params.username}`);
      if (response) {
        setUserDetails(response.data.data);
      }
      // error
      else {
        // toast
        toast({
          title: "User not found",
          description: "The user you are looking for does not exist.",
          variant: "destructive",
        })
      }
    }
    fetchUser();
  }, []);


  return (
    <div className="flex justify-center min-h-screen bg-black w-full lg:p-8 p-4 text-white">

      <div className='flex flex-col mt-10 lg:flex-row bg-gray-900 w-[90vh] h-[60vh] rounded-xl lg:p-16 p-8 border-orange-500 border-4'>

        <div className='flex flex-col gap-10'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold capitalize'>Name: {userDetails.name}</h1>
            <h2 className='text-2xl font-semibold'>Username: {userDetails.username}</h2>
            <p className='text-lg font-semibold'>Email: {userDetails.email}</p>
          </div>

          <div className='text-xl font-medium flex gap-5 lg:flex-row flex-col lg:w-full w-[60%]'>
            <p className='bg-orange-500 px-3 py-3 rounded-xl'>Pets Sold: {userDetails.petOwner}</p>
            <p className='bg-orange-500 px-3 py-3 rounded-xl'>Pets Bought: <span>
              {
                userDetails?.petBought?.filter((pet: IPayment) => pet.done === true).length
              }
              </span>
            </p>
          </div>
          
        </div>
      </div>


    </div>
  )
}

export default ProfilePage