import mongoose, { Schema, Document } from "mongoose";

// Type of "User" model
export interface IUser extends Document {
    username: string;
    name: string;
    email: string;
    password: string;
    razorpayId: string;
    razorpaySecret: string;
    createdAt: Date;
    updatedAt: Date;
};

// Schema of "User" model
const UserSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    razorpayId: {
        type: String,
        required: [true, "Razorpay ID is required"],
    },
    razorpaySecret: {
        type: String,
        required: [true, "Razorpay Secret is required"],
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// Export "User" model
export const UserModel = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User", UserSchema);