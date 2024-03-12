import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, privateProcedure, router } from "./trpc";
import dbConnect from "../../lib/mongo";
import { z } from "zod"
import userModel, { TUser } from "../../models/user";
import { TRPCError } from "@trpc/server";
import { NextResponse } from "next/server";

const clientId = process.env.NEXT_PUBLIC_KINDE_CLIENT_M2M_ID
const clientSecret = process.env.NEXT_PUBLIC_KINDE_CLIENT_M2M_SECRET


export const appRouter = router({
    // apiTest: publicProcedure.query(async () => {
    //     await dbConnect();
    //     console.log("db connected");
    //     return "apiTest";
    // }),
    authCallback: publicProcedure.query(async () => {
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
        const foundUser = await userModel.findOne({ email: user.email });
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
            given_name: z.string(),
            family_name: z.string(),
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
    ).mutation<Promise<any>>(async ({ ctx, input }) => {
        const url = 'https://kettleon.kinde.com/oauth2/token';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: `${clientId}`,
                client_secret: `${clientSecret}`,
                audience: 'https://kettleon.kinde.com/api'
            })
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("token", data.access_token)
        const accessToken = data.access_token
        const authString = "Bearer " + accessToken
        const inputBody = {
            profile: {
                given_name: input.given_name,
                family_name: input.family_name,
            },
            organization_code: input.team,
            identities: [
                {
                    type: "email",
                    details: {
                        email: input.email
                    }
                }
            ]
        };
        const headers = {
            'Content-Type' :'application/json',
            'Accept' : "application/json",
            'Authorization' : authString,
            'audience': "https://kettleon.kinde.com/api"
        };

          await fetch('https://kettleon.kinde.com/api/v1/user',
          {
            method: 'POST',
            body: JSON.stringify(inputBody),
            headers: headers
          })
          .then(function(res) {
              return res.json();
          }).then(function(body) {
              console.log(body);
          });

        try {
            const { userEmail } = ctx;
            await dbConnect();
            const foundUser = await userModel.findOne({ email: userEmail });
            if (!foundUser) throw new TRPCError({ code: "UNAUTHORIZED" })
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
            return { user: user as any, status: 200, success: true };
        } catch (err) {
            console.log(err)
            return { status: 500, success: false };
        }
    }),
    getUsers: privateProcedure
    .query(async ({ ctx }) => {
        try{
            const { userEmail } = ctx;
            await dbConnect();
            const foundUser = await userModel.findOne({ email: userEmail });
            if (!foundUser) throw new TRPCError({ code: "UNAUTHORIZED" })
            
            const users =  await userModel.find<TUser>({ team: foundUser.team });
    
            // console.log("backend data: ", users)
            // console.log(typeof users)

            // return {
            //     users: users, status: 200, success: true
            // };
            console.log(users)

            return { data: users, status: 200, success: true};
        } catch (err) {
            console.log("there's an error")
            console.log(err)
            return { data: [], status: 500, success: false };
        }
    })
});


export type AppRouter = typeof appRouter;
