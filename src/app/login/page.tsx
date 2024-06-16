"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { LoginSchema } from "@/schemas/LoginSchema";
import { signIn } from "next-auth/react";


// "Login" client component
const LoginPage = () => {

    // hooks
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    
    // form validation
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    // submit form
    async function onSubmit(data: z.infer<typeof LoginSchema>) {
        setIsSubmitting(true);

        try {
            // send data to server
            const response = await signIn("credentials", {
                username: data.username,
                password: data.password,
                redirect: false,
            });

            // handle response
            if (response?.url) {
                toast({
                    title: "Login successful",
                    description: "You are now logged in.",
                    variant: "default",
                });
                router.replace("/");
                setIsSubmitting(false);
            }

            // handle error
            if (response?.error) {
                toast({
                    title: "Login failed",
                    description: "Invalid username or password.",
                    variant: "destructive",
                });
                setIsSubmitting(false);
            }
        } 
        catch (error) {
            // handle error
            console.log("Error logging in:", error);
            setIsSubmitting(false);
        }
    }
    


  return (
    <div className="flex justify-center items-center min-h-screen bg-black lg:p-8 p-4 w-full">
        <div className="lg:w-[60%] w-full p-8 space-y-8 bg-white rounded-lg shadow-2xl border-orange-500 border-4">

            <div className="text-center">
                <h1 className="text-3xl font-bold lg:text-5xl lg:mb-6 mb-2">Welcome Back to Pet World</h1>
                <p className="mb-4 lg:text-3xl text-xl font-semibold">Login to your account</p>
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
                                <Input placeholder = "Enter your username" {...field} />
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
                                <Input placeholder = "Enter your password" type="password" {...field} />
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
                        ) : "Log In"
                       }
                    </Button>

                </form>
            </Form>

            <div className="text-center mt-4">
                <p className="text-medium lg:text-lg text-sm text-gray-600">Don&apos;t have an account? 
                    <Link href="/signup" className="text-blue-500 underline"> Sign up</Link>
                </p>
            </div>

        </div>
    </div>
  )
}

export default LoginPage