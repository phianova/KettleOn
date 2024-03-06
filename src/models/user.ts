import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    organisation: String,
    team: String,
    role: String,
    username: String,
    image: String,
    bio: String,
    prompt: String,
    answer: String
});

export default mongoose.model("User", userSchema);