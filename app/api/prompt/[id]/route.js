import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";



export const GET = async (request, { params }) => {
    try {
        await connectDB();

        const prompt = await Prompt.findById(params.id).populate('creator')

        if (!prompt) {
            return new Response(JSON.stringify({ message: "Prompt not found" }), { status: 404 })
        }

        return new Response(JSON.stringify({ prompt }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to fetch all prompts" }), { status: 500 })

    }
}


//patch (UPDATE)


export const PATCH = async (request, { params }) => {
    const { prompt, tags } = await request.json();

    try {
        await connectDB();

        const exisitingPrompt = await Prompt.findById(params.id);

        if (!exisitingPrompt) {
            return new Response(JSON.stringify({ message: "Prompt not found" }), { status: 404 });
        }
        exisitingPrompt.prompt = prompt;
        exisitingPrompt.tags = tags;


        await exisitingPrompt.save();

        return new Response(JSON.stringify({ message: "Prompt Updated" }), { status: 200 });


    } catch (error) {

        return new Response(JSON.stringify({ message: "Failed to update the prompt" }), { status: 500 })
    }
}


// delelte (DELETE)


export const DELETE = async (request, { params }) => {

    try {
        await connectDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response(JSON.stringify({ message: "Prompt Deleted" }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to delete the prompt" }), { status: 500 })
    }
}