"use client"
import { toast } from "@/components/ui/use-toast";
import { IPet } from "@/models/Pet.models";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react"
import Image from "next/image";
import Link from "next/link";


const BuyPetPage = () => {

    const [loading, setLoading] = useState(false);
    const [pets, setPets] = useState([]);

    // fetch pets from server
    useEffect(() => {
        setLoading(true);
        const fetchPets = async() =>  {
            try {
                const response = await axios.get("/api/all-pets");
                if (response) {
                    setPets(response.data.data);
                    setLoading(false);
                }
            } 
            catch (error) {
                // handle error
                const AxiosError = error as AxiosError<any>;
                let errorMessage = AxiosError.response?.data.message ?? "An error occurred. Please try again.";

                toast({
                    variant: "destructive",
                    title: "Unable to fetch pets",
                    description: errorMessage,
                });

                setLoading(false);
            }
        }
        fetchPets();
    }, [])



  return (
    <div className="flex min-h-screen flex-col items-center justify-between lg:p-8 p-4 w-full bg-black">
      <div className="w-full">
        
        <div className="flex flex-col justify-center items-center gap-2 text-white">
            <h1 className="lg:text-5xl text-3xl font-bold uppercase">Buy a pet</h1>
            <p className="lg:text-3xl text-lg font-semibold">See all pets and buy one for yourself</p>
        </div>

        <div className="flex flex-col items-center justify-center mt-10 p-2 w-full">
            {
                loading ? 
                <button disabled type="button" className="text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    Loading...
                </button> 
                : 
                <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-10 w-full">
                    {
                        pets.map((pet: IPet) => {
                            return (
                                <div key={pet._id as string | number} 
                                    className="flex flex-col justify-center items-center gap-6 bg-orange-500 p-5 text-white rounded-xl shadow-lg shadow-orange-500/70 lg:hover:scale-105">
                                    <Image 
                                        src={
                                            pet.image ? pet.image : "https://th.bing.com/th/id/OIP.OXAnFMe7dzTHRHcaK1SQcQHaFj?w=263&h=197&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                                        } 
                                        width={400} 
                                        height={400} 
                                        alt={pet.name}
                                        className="rounded-xl border-2 border-black"
                                    />
                                    <div className="text-xl font-semibold flex flex-col items-start w-full">
                                        <h3>Name: {pet.name}</h3> 
                                        <p>Age: {pet.age}</p>
                                        <p>Owner: {pet.ownerName}</p>
                                    </div>
                                    <div className="flex gap-4 items-center justify-center w-auto">
                                        <p className=" bg-black px-4 py-2 rounded-lg">₹ {pet.price}</p>
                                        <button className={`bg-white text-orange-500 px-4 py-2 rounded hover:bg-black ${pet.soldOut ? "cursor-not-allowed text-red-500 font-bold hover:bg-gray-500" : ""}`}>
                                            {
                                                pet.soldOut ? "Sold Out" : 
                                                <Link href={`/pet/${pet._id}`}>See Details</Link>
                                            }
                                        </button>
                                    </div> 
                                </div>
                            )
                        })
                    }
                </div>
            }

            {
               !loading && pets.length === 0 && <p className="text-center text-white">No pets found</p>
            }
        </div>

      </div>
    </div>
  )
}

export default BuyPetPage