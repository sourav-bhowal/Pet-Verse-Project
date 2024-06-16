import { getServerSession } from "next-auth";
import { PetModel } from "@/models/Pet.models";
import { DBConnect } from "@/lib/DbConnect";
import { authOptions } from "../auth/[...nextauth]/options";

// Sell pet route
export async function POST(request: Request) {
    // Get user session
    const session = await getServerSession(authOptions);

    // Check if user is logged in
    const owner = session?.user._id;
    const ownerName = session?.user.username;

    if (!session || !owner) {
        return Response.json(
            { message: "Unauthorized", success: false },
            { status: 401 }
        );
    }

    // Connect to DB
    await DBConnect();

    try {
        // Get request json data
        const { name, breed, age, description, image, price } =
            await request.json();

        // Create new pet object
        const newPet = new PetModel({
            name,
            breed,
            age,
            description,
            image,
            price,
            owner,
            ownerName,
        });

        if (!newPet) {
            return Response.json(
                { message: "Pet not listed", success: false },
                { status: 404 }
            );
        }

        // Save pet to DB
        const savedPet = await newPet.save();

        // Return saved pet
        return Response.json(
            {
                message: "Pet listed successfully",
                data: savedPet,
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            { message: "Pet not listed", success: false },
            { status: 500 }
        );
    }
}
