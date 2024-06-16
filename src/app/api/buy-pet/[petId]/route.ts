import { DBConnect } from "@/lib/DbConnect";
import { PetModel } from "@/models/Pet.models";


export async function GET(request: Request, { params }: { params: { petId: string } }) {

    // Connect to DB
    await DBConnect();

    // Get request json data
    const { petId } = params;

    // Find pet in DB
    try {
        const pet = await PetModel.findById({ _id: petId });
        if (!pet) {
            return Response.json({ message: "Pet not found", success: false }, { status: 404 });
        }
        return Response.json({ message: "Pet found", success: true, data: pet }, { status: 200 });
    } 
    catch (error) {
        return Response.json({ message: "Error fetching pet", success: false }, { status: 500 });
    }
}