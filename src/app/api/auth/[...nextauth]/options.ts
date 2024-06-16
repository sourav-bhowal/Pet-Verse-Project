import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { DBConnect } from "@/lib/DbConnect";
import { UserModel } from "@/models/User.models";

// NextAuth options
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {  // Credentials used for login
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password", placeholder: "********" },
            },

            // Authenticating user from DB using "authorize" function
            async authorize(credentials: any): Promise<any> {
                
                // Connect to DB
                await DBConnect();

                // Finding user in DB
                try {
                    const user = await UserModel.findOne({ username: credentials.username });

                    if (!user) {
                        throw new Error("User not found");
                    }

                    // Checking password
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (isPasswordCorrect) {
                        return user;
                    }
                    else {
                        throw new Error("Incorrect password");
                    }
                } 
                catch (error: any) {
                    throw new Error(error);
                }
            } 
        })
    ],
    callbacks: {
        // Session callback
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.razorpayId = token.razorpayId;
                session.user.razorpaySecret = token.razorpaySecret;
            }
            return session;
        },

        // JWT callback
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.username = user.username;
                token.email = user.email;
                token.razorpayId = user.razorpayId;
                token.razorpaySecret = user.razorpaySecret;
            }
            return token;
        }
    },
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
};
        
