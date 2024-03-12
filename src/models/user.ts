import mongoose from "mongoose";

export interface User {
    email: String,
    username: String,
    team: String,
    company: String,
    role: String,
    image: String,
    bio: String,
    prompt: String,
    answer: String
  }
   
  export interface MongoUser extends User, mongoose.Document {}
   
  export type TUser = {
    email: String,
    username: String,
    team: String,
    company: String,
    role: String,
    image: String,
    bio: String,
    prompt: String,
    answer: String
  };


const UserSchema = new mongoose.Schema<User>({
    email: {type: String, required: true, unique: true}, //from kinde
    username: {type: String, required: true}, //given_name + family_name from kinde
    team: {type: String, required: true}, //from kinde
    company: {type: String}, //entered by manager
    role: {type: String}, //entered by manager
    image: {type: String}, //will be empty on initialisation
    bio: {type: String}, //will be empty on initialisation
    prompt: {type: String}, //will be empty on initialisation
    answer: {type: String} //will be empty on initialisation
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);