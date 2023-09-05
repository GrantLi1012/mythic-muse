import { connectToDB } from "@utils/database";
import User from "@models/user";
import Prompt from "@models/prompt";

export const GET = async (req) => {
    try {
        await connectToDB();
        const getAnyUser = await User.findOne({});
        const prompts = await Prompt.find({}).populate('creator').sort({createdAt: -1});

        return new Response(
            JSON.stringify(prompts),
            {status: 200}
        );
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch all prompts', {status:500});
    }
}