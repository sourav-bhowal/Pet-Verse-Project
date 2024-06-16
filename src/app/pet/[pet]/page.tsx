"use client"
import { initateOrder } from '@/actions/PaymentAction';
import { toast } from '@/components/ui/use-toast';
import { IPet } from '@/models/Pet.models';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import Image from 'next/image';
// import Razorpay from 'razorpay';


const PetBuy = ({ params }: { params: { pet: string }}) => {

  const [pet, setPet] = useState({} as IPet);

  // Get session
  const { data: session } = useSession();
  // Buyer
  const buyer = session?.user

  // Fetch pet
  useEffect(() => {
    const fetchPet = async() =>  {
      // DB call
      const response = await axios.get(`/api/buy-pet/${params.pet}`);
      if (response) {
        setPet(response.data.data);
      }
      // error
      else {
        toast({
          title: "Pet not found",
          description: "The pet you are looking for does not exist.",
          variant: "destructive",
        })
      }
    }
    fetchPet();
  }, []);


  // Buy pet
  const pay = async(amount: number) => {
    // Implement payment
    let order = await initateOrder(amount, pet.ownerName as string, buyer?._id as string, params.pet as string);

    // Razorpay options
    var options = {
      key_id: buyer?.razorpayId ?? "" , // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Pet World", //your business name
      description: "Buying a new pet",
      image: {
        src: "/public/icons8-p-96.png",},
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: buyer?.username, //your customer's name
        email: buyer?.email,
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  };



  return (
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    <div className='flex min-h-screen flex-col items-center justify-between lg:p-10 p-4 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white'>
      
      <div className='flex flex-col lg:flex-row justify-between bg-black w-full min-h-[70vh] rounded-xl lg:p-16 p-4 border-orange-500 border-4'>
        <div className='lg:w-1/2 flex items-center'>
          <Image src={
            pet.image ? pet.image : "https://th.bing.com/th/id/OIP.OXAnFMe7dzTHRHcaK1SQcQHaFj?w=263&h=197&c=7&r=0&o=5&dpr=1.1&pid=1.7"
          } alt={pet.name} width={500} height={500} priority className='rounded-xl border-4 border-orange-500'/>
        </div>

        <div className='lg:w-1/2 flex flex-col gap-4 justify-center lg:mt-0 mt-5'>
          <div className='space-y-3'>
            <h1 className='text-4xl font-bold capitalize'>Name: {pet.name}</h1>
            <p className='text-xl font-semibold capitalize'>Description: {pet.description}</p>
          </div>

          <div className='text-xl font-medium'>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age}</p>            
            <p>Owner: {pet.ownerName}</p>
          </div>

          <div className='lg:text-2xl text-xl font-bold mt-8 flex lg:gap-20 gap-5'>
            <p className='bg-orange-500 px-4 py-3 rounded-xl'>₹{pet.price}</p>
            <button
            onClick={() => pay(pet.price * 100)}
            className='bg-white text-orange-500 px-4 py-3 rounded-xl hover:bg-orange-500 hover:text-black'>Buy Now</button>
          </div>
          <p className='text-sm text-orange-500'>*Payment secured with Razorpay</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default PetBuy