import mongoose, {Schema, model, models} from "mongoose";

// one to many relationship from user to prompts
const PromptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    }
}, {
    timestamps: true // Add createdAt and updatedAt fields
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;