import { PetModel } from "@/models/Pet.models";
import { DBConnect } from "@/lib/DbConnect";

export const getAllPets = async ({ page = 2, limit = 4 }: { page?: number; limit?: number }) => {
    await DBConnect();
    try {
        const pets = await PetModel.find({}).skip((page - 1) * limit).limit(limit);
        // console.log("pets");
        return {pets};        
    } 
    catch (error) {
        console.log(error);
        return { message: "Error fetching pets", success: false };
    }
}