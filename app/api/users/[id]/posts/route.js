import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";


export const GET = async (request, { params }) => {
    try {
        await connectDB();
        console.log("incoming")
        const prompts = await Prompt.find({ creator: params.id }).populate('creator')

        return new Response(JSON.stringify({ prompts }), { status: 200 })


    } catch (error) {

        return new Response(JSON.stringify({
            message: "Failed to fetch all prompts"
        }), { status: 500 })
    }
} 