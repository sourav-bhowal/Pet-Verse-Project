import { UserModel } from "@/models/User.models";
import bcrypt from "bcryptjs";
import { DBConnect } from "@/lib/DbConnect";

// Sign up route
export async function POST(request: Request) {

    // Connect to DB
    await DBConnect();

    // Sign up logic
    try {
        // Get request json data
        const { username, name, email, password, razorpayId, razorpaySecret } = await request.json();
    
        // Checking if user already exists
        const existingUser = await UserModel.findOne({ username });
    
        if (existingUser) {
            return Response.json({ message: "User already exists", success: false }, { status: 400 });
        }

        // Hashing password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating new user object
        const newUser = new UserModel({
            username,
            name,
            email,
            password: hashedPassword,
            razorpayId,
            razorpaySecret
        });

        // Saving user to DB
        const savedUser = await newUser.save();

        // Sending response to client
        return Response.json({ message: "User created successfully", success: true, data: savedUser }, { status: 201 });
    
    } 
    catch (error: any) {
        // Logging error
        console.log("Error while signing up: ", error);

        // Sending error response to client
        return Response.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
};