"use client";
import { initateOrder } from "@/actions/PaymentAction";
import { toast } from "@/components/ui/use-toast";
import { IPet } from "@/models/Pet.models";
import axios from "axios";
import { useSession } from "next-auth/react";
import Script from "next/script";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

const PetBuy = ({ params }: { params: { pet: string } }) => {
    // Get session
    const { data: session } = useSession();
    // Buyer
    const buyer = session?.user;

    // fetch pets from server
    const fetchPet = async () => {
        const response = await axios.get(`/api/buy-pet/${params.pet}`);
        if (response) {
            const data = response.data.data;
            return data;
        }
    };

    // UseQuery
    const {
        data: pet,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["pet", params.pet],
        queryFn: fetchPet,
        staleTime: 10000,
    });

    // Buy pet
    const pay = async (amount: number) => {
        // Implement payment
        let order = await initateOrder(
            amount,
            pet?.ownerName as string,
            buyer?._id as string,
            params.pet as string
        );

        // Razorpay options
        var options = {
            key_id: buyer?.razorpayId ?? "", // Enter the Key ID generated from the Dashboard
            amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Pet World", //your business name
            description: "Buying a new pet",
            image: {
                src: "/public/icons8-p-96.png",
            },
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

    if (isError) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong. Please try again later.",
        });
        return <div className="text-red-500 min-h-screen">Error</div>;
    }

    if (isLoading) {
        <button
            disabled
            type="button"
            className="text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        >
            <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                />
            </svg>
            Loading...
        </button>;
    }
    
    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div className="flex min-h-screen flex-col items-center justify-between lg:p-10 p-3 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white">
                <div className="flex flex-col lg:flex-row justify-between bg-black w-full min-h-[70vh] rounded-xl lg:p-16 p-4 border-orange-500 border-4">
                    <div className="lg:w-1/2 flex items-center">
                        <Image
                            src={
                                pet?.image
                                    ? pet.image
                                    : "https://th.bing.com/th/id/OIP.OXAnFMe7dzTHRHcaK1SQcQHaFj?w=263&h=197&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                            }
                            alt={pet?.name}
                            width={500}
                            height={500}
                            priority
                            className="rounded-xl border-4 border-orange-500"
                        />
                    </div>

                    <div className="lg:w-1/2 flex flex-col gap-4 justify-center lg:mt-0 mt-5">
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold capitalize">
                                Name: {pet?.name}
                            </h1>
                            <p className="text-xl font-semibold capitalize">
                                Description: {pet?.description}
                            </p>
                        </div>

                        <div className="text-xl font-medium">
                            <p>Breed: {pet?.breed}</p>
                            <p>Age: {pet?.age}</p>
                            <p>Owner: {pet?.ownerName}</p>
                        </div>

                        <div className="lg:text-2xl text-xl font-bold mt-8 flex lg:gap-20 gap-5">
                            <p className="bg-orange-500 px-4 py-3 rounded-xl">
                                ₹{pet?.price}
                            </p>
                            {pet?.soldOut ? (
                                <button className="bg-gray-500 text-orange-500 px-4 py-3 rounded-xl cursor-not-allowed">
                                    Sold Out
                                </button>
                            ) : (
                                <button
                                    onClick={() => pay(pet.price * 100)}
                                    className="bg-white text-orange-500 px-4 py-3 rounded-xl hover:bg-orange-500 hover:text-black"
                                >
                                    Buy Now
                                </button>
                            )}
                        </div>
                        <p className="text-sm text-orange-500">
                            *Payment secured with Razorpay
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PetBuy;
