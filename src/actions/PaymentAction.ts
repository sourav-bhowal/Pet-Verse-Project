"use server"
import { PaymentModel } from "@/models/Payment.models";
import { UserModel } from "@/models/User.models";
import Razorpay from "razorpay";
import { DBConnect } from "@/lib/DbConnect";

// Initiating Razorpay order
export const initateOrder = async (amount: number, ownerName: string, buyer: string, pet: string) => {
    
    // Connect to DB
    await DBConnect();

    // Find seller
    const seller = await UserModel.findOne({ username: ownerName });
  
    // Create new instance of Razorpay
    const instance = new Razorpay({
        key_id: seller?.razorpayId ?? "",
        key_secret: seller?.razorpaySecret ?? ""
    });

    // Define options
    const options = {
        amount: amount,
        currency: "INR",
    };

    // Create order
    let order = await instance.orders.create(options);

    // delete previous payment
    await PaymentModel.deleteMany({ pet: pet, buyer: buyer, seller: seller?._id });

    // Create new payment object
    const newPayment = new PaymentModel({
        pet: pet,
        buyer: buyer,
        seller: seller?._id,
        orderId: order.id,
        amount: amount,
    });

    // Save payment
    await newPayment.save();

    // Return order
    return order;
};