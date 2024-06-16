import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User.models";
import { IPet } from "./Pet.models";

// Type of "Payment" model
export interface IPayment extends Document {
    buyer: IUser["_id"];
    seller: IUser["_id"];
    orderId: string;
    amount: number;
    done: boolean;
    createdAt: Date;
    updatedAt: Date;
    pet?: IPet["_id"];
};

// Schema of "Payment" model
const PaymentSchema: Schema<IPayment> = new Schema({
    pet: {
        type: Schema.Types.ObjectId,
        ref: "Pet",
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    done: {
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

// Exporting "Payment" model
export const PaymentModel = (mongoose.models.Payment as mongoose.Model<IPayment>) || mongoose.model<IPayment>("Payment", PaymentSchema);