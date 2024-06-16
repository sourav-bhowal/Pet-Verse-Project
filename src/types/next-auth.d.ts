import "next-auth"
import { DefaultSession } from "next-auth";

// Modifying the module JWT, User, Session as per our need
declare module "next-auth" {
    interface User {
        _id?: string;
        username?: string;
        email?: string;
        razorpayId?: string;
        razorpaySecret?: string;
    }

    interface Session {
        user: {
            _id?: string;
            username?: string;
            email?: string;
            razorpayId?: string;
            razorpaySecret?: string;
        } & DefaultSession["user"];
    }
};


declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
        email?: string;
        username?: string;
        razorpayId?: string;
        razorpaySecret?: string;
    }
};