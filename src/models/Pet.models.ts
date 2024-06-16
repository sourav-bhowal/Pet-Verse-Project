import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User.models";

// Type of "Pet" model
export interface IPet extends Document {
    name: string;
    breed: string;
    age: number;
    description: string;
    image: string;
    price: number;
    owner: IUser["_id"];
    createdAt: Date;
    updatedAt: Date;
    ownerName?: IUser["username"];
    soldOut: boolean;
};

// Schema of "Pet" model
const PetSchema: Schema<IPet> = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    breed: {
        type: String,
        required: [true, "Breed is required"],
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: [true, "Image is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Owner is required"],
    },
    ownerName: {
        type: String,
    },
    soldOut: {
        type: Boolean,
        default: false
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

// Export "Pet" model
export const PetModel = (mongoose.models.Pet as mongoose.Model<IPet>) || mongoose.model<IPet>("Pet", PetSchema);