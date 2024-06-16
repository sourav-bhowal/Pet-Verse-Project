import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { PaymentModel } from "@/models/Payment.models";
import { UserModel } from "@/models/User.models";
import { DBConnect } from "@/lib/DbConnect";
import { PetModel } from "@/models/Pet.models";

// Route for verifying payment
export async function POST(request: Request) {

    // Connect to DB
    await DBConnect();

    // Get request json data
    const formData = await request.formData();
    const body = Object.fromEntries(formData);
    
    // Verify payment
    let razorpayOrderId = await PaymentModel.findOne({ orderId: body.razorpay_order_id });

    if (!razorpayOrderId) {
        return NextResponse.json({ message: "Order not found", success: false }, { status: 404 });
    }

    // Find seller Razorpay secret
    const seller = await UserModel.findOne({ _id: razorpayOrderId.seller });
    const sellerRazorpaySecret = seller?.razorpaySecret;

    // Validate payment
    const isPaymentValid = validatePaymentVerification({
        "order_id": String(body.razorpay_order_id),
        "payment_id": String(body.razorpay_payment_id),
        },
        body.razorpay_signature.toString(),
        sellerRazorpaySecret!
    );

    if (!isPaymentValid) {
        return NextResponse.json({ message: "Payment verification failed", success: false }, { status: 400 });
    }
    else {
        // Update payment
        const updatedPayment = await PaymentModel.findOneAndUpdate({ orderId: body.razorpay_order_id }, { done: true });

        if (updatedPayment) {
            // Send success response and redirect to payment success page
            await PetModel.findByIdAndUpdate(updatedPayment.pet, { soldOut: true });

            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/buy-pet`);
        }
    }
};