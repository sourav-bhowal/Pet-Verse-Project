import { DBConnect } from "@/lib/DbConnect";
import { UserModel } from "@/models/User.models";

export async function GET(request: Request, { params }: { params: { username: string } }) {

    // Connect to DB
    await DBConnect();

    // Get userId from params
    const { username } = params;

    // Find user in DB
    try {
        const userDetails = await UserModel.aggregate([
            {
                $match: {
                    username
                }
            },
            {
                $lookup: {
                    from: "pets",
                    localField: "_id",
                    foreignField: "owner",
                    as: "petOwner"
                }
            },
            {
                $lookup: {
                    from: "payments",
                    localField: "_id",
                    foreignField: "buyer",
                    as: "petBought"
                }
            },
            {
                $project: {
                    username: 1,
                    name: 1,
                    email: 1,
                    petOwner: {
                        $size: "$petOwner"
                    },
                    petBought: 1
                }
            }
        ]);

        if (userDetails) {
            return Response.json({ message: "User fetched successfully", success: true, data: userDetails[0] }, { status: 200 });
        } 
        else {
            return Response.json({ message: "User not found", success: false }, { status: 404 });
        }
    } 
    catch (error) {
        return Response.json({ message: "Error fetching user", success: false }, { status: 500 });
    }
};