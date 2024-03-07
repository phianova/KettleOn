import { publicProcedure, router } from "./trpc";
import dbConnect from "../lib/mongo";
import {z} from "zod"
import userSchema, { TUser } from "../models/user";


export const appRouter = router({
    apiTest: publicProcedure.query( async () => { 
        await dbConnect();
        console.log("db connected");
        return "apiTest";
    }),
    addUser: publicProcedure.input(
        z.object({
            email: z.string(), //from kinde
            username: z.string(), //given_name + family_name from kinde
            team: z.string(), //from kinde
            company: z.string(), //entered by manager
            role: z.string(), //entered by manager
            image: z.string(), //will be empty on initialisation
            bio: z.string(), //will be empty on initialisation
            prompt: z.string(), //will be empty on initialisation
            answer: z.string() //will be empty on initialisation
        })
    ).mutation( async (params) => { 
        console.log("got to index.ts")
        await dbConnect();
        //add a user to the users collection in the database using the users model
        const user: TUser = await userSchema.create({
            ...params.input
        })
        return {user};
    }),
});


export type AppRouter = typeof appRouter;
