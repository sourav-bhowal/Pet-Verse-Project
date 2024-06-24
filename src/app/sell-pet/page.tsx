"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { PetSchema } from "@/schemas/PetSchema";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/shared/ImageUpload";
import { useMutation } from "@tanstack/react-query";


// "SellPetPage" client component
const SellPetPage = () => {

    // hooks
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imgUploaded, setImgUploaded] = useState(false);

    // form validation
    const form = useForm<z.infer<typeof PetSchema>>({
        resolver: zodResolver(PetSchema),
        defaultValues: {
            name: "",
            description: "",
            breed: "",
            age: 0,
            price: 0,
            image: "",
        },
    });

    const { mutate } = useMutation({
        mutationKey: ["sell-pet"],
        mutationFn: async (data: z.infer<typeof PetSchema>) => {
            setIsSubmitting(true);
            // send data to server
            const response = await axios.post("/api/sell-pet", data);
        },
        onSuccess: () => {
            // handle success
            toast({
                title: "Pet added successfully",
                description: "We've added your pet for sale.",
                variant: "default",
            });
            router.push("/");
            setIsSubmitting(false);
        },
        onError: (error) => {
            // handle error
            const AxiosError = error as AxiosError<any>;
            let errorMessage = AxiosError.response?.data.message ?? "An error occurred. Please try again.";
            // toast
            toast({
                variant: "destructive",
                title: "Sell pet failed",
                description: errorMessage,  
            });
            setIsSubmitting(false);
        },
    });

    // handle form submission
    // const handleFormSubmit = async (data: z.infer<typeof PetSchema>) => {
    //     setIsSubmitting(true);
    //     try {
    //         const response = await axios.post("/api/sell-pet", data);

    //         if (response) {
    //             toast({
    //                 title: "Pet added successfully",
    //                 description: "We've added your pet for sale.",
    //                 variant: "default",
    //             });
    //             router.push("/");
    //             setIsSubmitting(false);
    //         }
    //     }
    //     catch (error) {
    //         // handle error
    //         const AxiosError = error as AxiosError<any>;
    //         let errorMessage = AxiosError.response?.data.message ?? "An error occurred. Please try again.";

    //         toast({
    //             variant: "destructive",
    //             title: "Sell pet failed",
    //             description: errorMessage,
    //         });
    //         setIsSubmitting(false);
    //     }
    // }

   return (
    <div className="flex justify-center items-center min-h-screen bg-black w-full lg:p-8 p-3">
        <div className="lg:w-[60%] w-[95%] lg:p-8 p-2 space-y-8 bg-white rounded-xl shadow-2xl border-4 border-orange-500">

            <div className="text-center">
                <h1 className="text-2xl font-bold lg:text-5xl lg:mb-6 mb-2">Welcome to Pet World</h1>
                <p className="mb-4 lg:text-3xl text-xl font-semibold">Sell your pet</p>
            </div>

            <Form {...form}>
                <form onSubmit={(e) => form.handleSubmit(mutate as SubmitHandler<z.infer<typeof PetSchema>>)(e)} 
                className="space-y-6"
                >

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><span className="text-red-500">*</span>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter pet name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><span className="text-red-500">*</span>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter pet description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="breed"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><span className="text-red-500">*</span>Breed</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter pet breed" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div>
                        <FormLabel><span className="text-red-500">*</span>Image</FormLabel>
                        <div className="flex lg:flex-row flex-col lg:items-center gap-3 mt-2">
                        <ImageUpload onUpload={(url) => (
                            form.setValue("image", url),
                            setImgUploaded(true)
                        )} />
                            
                        <p className="text-green-500 font-medium">{imgUploaded ? "Image uploaded successfully." : ""}</p>
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><span className="text-red-500">*</span>Age</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter age" {...field} type="number"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><span className="text-red-500">*</span>Price</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter price" {...field} type="number"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <p className= "text-red-500 text-xs">* Are required fields</p>

                    <Button type="submit" disabled={isSubmitting} className="bg-orange-500 hover:bg-orange-700">
                        {
                            isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin">
                                    Please wait
                                </Loader2>
                            ) : "Submit"
                        }
                    </Button>

                </form>
            </Form>

        </div>
    </div>
   )
}
export default SellPetPage