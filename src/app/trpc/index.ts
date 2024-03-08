import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, privateProcedure, router } from "./trpc";
import dbConnect from "../../lib/mongo";
import {z} from "zod"
import userModel, { TUser } from "../../models/user";
import { TRPCError } from "@trpc/server";
import mongoose from "mongoose";



export const appRouter = router({
    apiTest: publicProcedure.query( async () => { 
        await dbConnect();
        console.log("db connected");
        return "apiTest";
    }),
    authCallback: publicProcedure.query( async () => {
        const { getUser, getPermissions } = getKindeServerSession();
        const user = (await getUser()) as any;
        const permissions = (await getPermissions()) as any;
        const organisation = permissions?.orgCode
        if (!user.id || !user.email) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }
        await dbConnect();
        // check if user exists in db collection users
        const foundUser = await userModel.findOne({email: user.email});
        if (!foundUser) {
            await userModel.create({
                email: user.email,
                username: user.given_name + user.family_name,
                team: organisation,
                company: "",
                role: "",
                image: "",
                bio: "",
                prompt: "",
                answer: ""
            })
        }
        return {
            success: true,
        }

    }),
    addUser: privateProcedure.input(
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
    ).mutation<Promise<any>>( async ({ctx, input}) => { 
        console.log("got to index.ts")
        const { userEmail } = ctx;
        await dbConnect();
        const foundUser = await userModel.findOne({email: userEmail});
        if (!foundUser) throw new TRPCError({code: "UNAUTHORIZED"})
        //add a user to the users collection in the database using the users model
        const user: TUser = await userModel.create({
            email: input.email,
            username: input.username,
            team: input.team,
            company: input.company,
            role: input.role,
            image: "",
            bio: "",
            prompt: "",
            answer: ""
        })
        return {success: true};
    }),
});


export type AppRouter = typeof appRouter;
