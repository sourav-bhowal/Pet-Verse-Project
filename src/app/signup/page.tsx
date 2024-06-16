"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { SignUpSchema } from "@/schemas/SignUpSchema";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";


// "SignUp" client page
const SignUpPage = () => {

    // hooks
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // form validation
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            username: "",
            name: "",
            email: "",
            password: "",
            razorpayId: "",
            razorpaySecret: "",
        },
    });

    // submit form
    const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {

        setIsSubmitting(true);

        try {
            // send data to server
            const response = await axios.post("/api/sign-up", data);
            
            if (response) {
                toast({
                    title: "Account created successfully",
                    description: "We've created your account for you.",
                    variant: "default",
                });
                router.push("/login");

                setIsSubmitting(false);
            }
        }
        catch (error) {
            // handle error
            const AxiosError = error as AxiosError<any>;
            let errorMessage = AxiosError.response?.data.message ?? "An error occurred. Please try again.";

            toast({
                variant: "destructive",
                title: "Sign up failed",
                description: errorMessage,
            });

            setIsSubmitting(false);
        }
    };




  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-500 to-orange-500 w-full lg:p-8 p-3">
        <div className="lg:w-[60%] p-8 space-y-8 bg-white rounded-xl shadow-2xl w-full border-black border-2">

            <div className="text-center">
                <h1 className="text-2xl font-bold lg:text-5xl lg:mb-6 mb-3">Welcome to Pet World</h1>
                <p className="mb-4 lg:text-3xl text-xl font-semibold">Sign up to continue</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><span className="text-red-500">*</span>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><span className="text-red-500">*</span>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><span className="text-red-500">*</span>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="razorpayId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><span className="text-red-500">*</span>Razorpay Id</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your Razorpay Id" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="razorpaySecret"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><span className="text-red-500">*</span>Razorpay Secret</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your Razorpay Secret" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <p className= "text-red-500 text-xs">* Are required fields</p>

                    <Button type="submit" disabled={isSubmitting} className="bg-orange-500 hover:bg-orange-600">
                        {
                            isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin">
                                    Please wait
                                </Loader2>
                            ) : "Sign up"
                        }
                    </Button>

                </form>
            </Form>

            <div className="text-center mt-4">
                <p className="text-medium lg:text-lg text-sm text-gray-600">Already have an account? 
                    <Link href="/login" className="text-blue-500 underline"> Log in</Link>
                </p>
            </div>

        </div>
    </div>
  )
}

export default SignUpPage