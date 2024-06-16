import { PetModel } from "@/models/Pet.models";
import { DBConnect } from "@/lib/DbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request: Request) {

    // Get user session
    const session = await getServerSession(authOptions);

    const owner = session?.user._id;

    // Connect to DB
    await DBConnect();

    try {
        // Get pets from DB
        const pets = (await PetModel.find({})).filter(pet => pet.owner != owner);
    
        // Return response
        return Response.json({message: "Pets fetched successfully", success: true, data: pets}, { status: 200 });
    } 
    catch (error) {
        return Response.json({message: "Error fetching pets", success: false}, { status: 500 });    
    }
};