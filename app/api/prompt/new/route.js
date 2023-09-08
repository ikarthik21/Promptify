import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";


export const POST = async (req) => {

    const { prompt, userId, tags } = await req.json();

    try {
        
        await connectDB();

        const isPromptPres = await Prompt.findOne({ prompt: prompt })

        if (isPromptPres) {
            return new Response(JSON.stringify({ message: 'Prompt already exists' }), { status: 200 });
        }

        const newPrompt = new Prompt({ creator: userId, prompt, tags: tags });

        await newPrompt.save();

        return new Response(JSON.stringify({ message: 'Prompt posted successfully' }), { status: 201 });


    } catch (error) {
        return new Response(JSON.stringify({ message: error }), { status: 500 });
    }

};