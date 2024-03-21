import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, privateProcedure, router } from "./trpc";
import dbConnect from "../../lib/mongo";
import { z } from "zod"
import UserSchema, { TUser } from "../../models/user";
import QuestionSchema, { TQuestion } from "../../models/question";
import { TRPCError } from "@trpc/server";
import { NextResponse } from "next/server";
import { trpc } from "../_trpc/client";

const clientId = process.env.NEXT_PUBLIC_KINDE_CLIENT_M2M_ID
const clientSecret = process.env.NEXT_PUBLIC_KINDE_CLIENT_M2M_SECRET

export type Game = {
    name: string,
    score: number,
    usage: number,
}

export const appRouter = router({
    // apiTest: publicProcedure.query(async ({ ctx, input }) => {
    //     await dbConnect();
    //     console.log("db connected");
    //     return {data: "apiTest"};
    // }),
    authCallback: publicProcedure.query(async ({ ctx, input }) => {
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
        const foundUser = await UserSchema.findOne({ email: user.email });
        console.log("founduser", foundUser)
        if (!foundUser) {
            await UserSchema.create({
                email: user.email,
                username: user.given_name + " " + user.family_name,
                team: organisation,
                teamname: "Your team name",
                company: "Your company",
                role: "Team Leader",
                image: "",
                bio: "",
                prompts: [{}],
                game: [{}],
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
            teamname: z.string(), //entered by manager
            company: z.string(), //entered by manager
            role: z.string(), //entered by manager
            image: z.string(), //will be empty on initialisation
            bio: z.string(), //will be empty on initialisation

            prompts: z.array(
                z.object({
                    question: z.string(), //will be empty on initialisation
                    answer: z.string() //will be empty on initialisation
                })),
          
            game: z.array(
                z.object({
                    usage: z.number(),
                    score: z.number(),
                    name: z.string(),
                })
            )

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
            ],
            roles: [

            ]
        };
        const headers = {
            'Content-Type': 'application/json',
            'Accept': "application/json",
            'Authorization': authString,
            'audience': "https://kettleon.kinde.com/api"
        };

        let userId;

        await fetch('https://kettleon.kinde.com/api/v1/user',
            {
                method: 'POST',
                body: JSON.stringify(inputBody),
                headers: headers
            })
            .then(function (res) {
                return res.json();
            }).then(function (body) {
                console.log(body);
                userId = body.id
            });

        const removeManagerURL = `https://kettleon.kinde.com/api/v1/organizations/${input.team}/users/${userId}/roles/018e147c-ad06-60cf-1ee5-5bf5e290b9df`;

        await fetch(removeManagerURL,
            {
                method: 'DELETE',
                headers: headers
            })
            .then(function (res) {
                return res.json();
            }).then(function (body) {
                console.log(body);
            });

        try {
            const { userEmail } = ctx;
            await dbConnect();
            const foundUser = await UserSchema.findOne({ email: userEmail });
            if (!foundUser) throw new TRPCError({ code: "UNAUTHORIZED" })
            //add a user to the users collection in the database using the users model
            const teamName = foundUser.teamname
            const company = foundUser.company
            const user: TUser = await UserSchema.create({
                email: input.email,
                username: input.username,
                team: input.team,
                teamname: teamName,
                company: company,
                role: input.role,
                image: "",
                bio: "",
                prompts: [{}],
                answer: "",
                game: [
                    {
                        name: "NumberGame",
                        score: 0,
                        usage: 0
                    },
                    {
                        name: "aiQuiz",
                        score: 0,
                        usage: 0
                    },
                ]
            })
            return { user: user as any, status: 200, success: true };
        } catch (err) {
            console.log(err)
            return { status: 500, success: false };
        }
    }),
    getUsers: privateProcedure
        .query(async ({ ctx, input }) => {
            try {
                const { userEmail } = ctx;
                await dbConnect();
                const foundUser = await UserSchema.findOne({ email: userEmail });
                if (!foundUser) throw new TRPCError({ code: "UNAUTHORIZED" })

                const users = await UserSchema.find<TUser>({ team: foundUser.team });

                let usersArray = []

                for (let i = 0; i < users.length; i++) {
                    const newUser = {
                        email: users[i].email,
                        username: users[i].username,
                        team: users[i].team,
                        teamname: users[i].teamname,
                        company: users[i].company,
                        role: users[i].role,
                        image: users[i].image,
                        bio: users[i].bio,
                        prompts: users[i].prompts,
                        game: users[i].game
                    }
                    usersArray.push(newUser)
                }

                return { data: usersArray, status: 200, success: true };
            } catch (err) {
                console.log("there's an error")
                console.log(err)
                return { data: [], status: 500, success: false };
            }
        }),
    getCurrentUserData: privateProcedure
        .query(async ({ ctx, input }) => {
            try {
                const { userEmail } = ctx;

                await dbConnect();
                const foundUser = await UserSchema.findOne<TUser>({ email: userEmail });
                if (!foundUser) throw new TRPCError({ code: "UNAUTHORIZED" })

                const currentUserData = {
                    email: foundUser.email,
                    username: foundUser.username,
                    team: foundUser.team,
                    teamname: foundUser.teamname,
                    company: foundUser.company,
                    role: foundUser.role,
                    image: foundUser.image,
                    bio: foundUser.bio,
                    prompts: foundUser.prompts,
                    game: foundUser.game
                }

                console.log(currentUserData)

                return { data: currentUserData, status: 200, success: true };
            } catch (err) {
                console.log("there's an error")
                console.log(err)
                const emptyUser = {
                    email: "",
                    username: "",
                    team: "",
                    teamname: "",
                    company: "",
                    role: "",
                    image: "",
                    bio: "",
                    prompts: [{}],
                    game: [{}]
                }
                return { data: emptyUser, status: 500, success: false };
            }
        }),
         
   numberGameData: privateProcedure
   .query(async ({ ctx, input }) => {
       try {
           const { userEmail } = ctx;
           if(!userEmail) throw new TRPCError({ code: "UNAUTHORIZED" })
           await dbConnect();
           const foundUser = await UserSchema.findOne({ email: userEmail });
           if (!foundUser) throw new TRPCError({ code: "NOT_FOUND" })
           
           const gameData = foundUser.game.find((game : Game) => game.name === "NumberGame");
           return { data: gameData, status: 200, success: true };
       } catch (err) {
           console.log(err)
           return { data: [], status: 500, success: false };
       }
   }), 

   numberGameUsage: privateProcedure.input(z.object({
       usage: z.number(),
   })
   ).mutation<Promise<any>>(async ({ ctx, input }) => {
       try {
           const { userEmail } = ctx;
           if(!userEmail) throw new TRPCError({ code: "UNAUTHORIZED" })
           await dbConnect();
           const foundUser = await UserSchema.findOne({ email: userEmail });
           if (!foundUser) throw new TRPCError({ code: "NOT_FOUND" })
           
           const gameIndex = foundUser.game.findIndex((game : Game) => game.name === "NumberGame");
            if (gameIndex === -1) throw new TRPCError({ code: "NOT_FOUND" });

            // Update the usage of the found game
            foundUser.game[gameIndex].usage = input.usage;



            await foundUser.save();
            return { status: 200, success: true };
       } catch (err) {
           console.log(err)
           return { status: 500, success: false };
       }
   }),
    
   numberGameScore: privateProcedure.input(z.object({
       score: z.number(),
   })
   ).mutation<Promise<any>>(async ({ ctx, input }) => {
    console.log("score", input.score)
       try {
           const { userEmail } = ctx;
           console.log("email", userEmail)
           if(!userEmail) throw new TRPCError({ code: "UNAUTHORIZED" })
           await dbConnect();
           const foundUser = await UserSchema.findOne({ email: userEmail });
           if (!foundUser) throw new TRPCError({ code: "NOT_FOUND" })
           
           const gameIndex = foundUser.game.findIndex((game : Game) => game.name === "NumberGame");
            if (gameIndex === -1) throw new TRPCError({ code: "NOT_FOUND" });

            
            // add input.score to the current score
            foundUser.game[gameIndex].score += input.score;
            // foundUser.game[gameIndex].score = input.score;
            await foundUser.save();
            return { status: 200, success: true };
   } catch (err) {
    console.log(err)
    return { status: 500, success: false };
}
   }),

   aiQuizScore: privateProcedure.input(z.object({
    score: z.number(),
})
).mutation<Promise<any>>(async ({ ctx, input }) => {
 console.log("score", input.score)
    try {
        const { userEmail } = ctx;
        console.log("email", userEmail)
        if(!userEmail) throw new TRPCError({ code: "UNAUTHORIZED" })
        await dbConnect();
        const foundUser = await UserSchema.findOne({ email: userEmail });
        if (!foundUser) throw new TRPCError({ code: "NOT_FOUND" })
        
        const gameIndex = foundUser.game.findIndex((game : Game) => game.name === "aiQuiz");
         if (gameIndex === -1) throw new TRPCError({ code: "NOT_FOUND" });

         
         // add input.score to the current score
         foundUser.game[gameIndex].score += input.score;
         // foundUser.game[gameIndex].score = input.score;
         await foundUser.save();
         return { status: 200, success: true };
} catch (err) {
 console.log(err)
 return { status: 500, success: false };
}
}),

aiQuizData: privateProcedure
   .query(async ({ ctx, input }) => {
       try {
           const { userEmail } = ctx;
           if(!userEmail) throw new TRPCError({ code: "UNAUTHORIZED" })
           await dbConnect();
           const foundUser = await UserSchema.findOne({ email: userEmail });
           if (!foundUser) throw new TRPCError({ code: "NOT_FOUND" })
           
           const gameData = foundUser.game.find((game : Game) => game.name === "aiQuiz");
           return { data: gameData, status: 200, success: true };
       } catch (err) {
           console.log(err)
           return { data: [], status: 500, success: false };
       }
   }), 

aiQuizUsage: privateProcedure.input(z.object({
    usage: z.number(),
})
).mutation<Promise<any>>(async ({ ctx, input }) => {
    try {
        const { userEmail } = ctx;
        if(!userEmail) throw new TRPCError({ code: "UNAUTHORIZED" })
        await dbConnect();
        const foundUser = await UserSchema.findOne({ email: userEmail });
        if (!foundUser) throw new TRPCError({ code: "NOT_FOUND" })
        
        const gameIndex = foundUser.game.findIndex((game : Game) => game.name === "aiQuiz");
         if (gameIndex === -1) throw new TRPCError({ code: "NOT_FOUND" });

     // Update the usage of the found game
     foundUser.game[gameIndex].usage = input.usage;

       
         
         await foundUser.save();
         return { status: 200, success: true };
    } catch (err) {
        console.log(err)
        return { status: 500, success: false };
    }
}),

   updateUser: privateProcedure.input(
        z.object({
            role: z.string(),
            bio: z.string()
        })
    ).mutation<Promise<any>>(async ({ ctx, input }) => {
        try {
            const { userEmail } = ctx;
            await dbConnect();
            const foundUser = await UserSchema.findOne({ email: userEmail });
            if (!foundUser) throw new TRPCError({ code: "UNAUTHORIZED" })

            const user = await UserSchema.findOneAndUpdate({ email: userEmail }, { role: input.role, bio: input.bio });

            return { user: user as any, status: 200, success: true };
        } catch (err) {
            console.log(err)
            return { status: 500, success: false };
        }
    }),
    updateImage: privateProcedure.input(
        z.object({
            image: z.string()
        })
    ).mutation<Promise<any>>(async ({ ctx, input }) => {
        try {
            const { userEmail } = ctx;
            await dbConnect();
            const foundUser = await UserSchema.findOne({ email: userEmail });
            if (!foundUser) throw new TRPCError({ code: "UNAUTHORIZED" })

            const user = await UserSchema.findOneAndUpdate({ email: userEmail }, { image: input.image });

            return { user: user as any, status: 200, success: true };
        } catch (err) {
            console.log(err)
            return { status: 500, success: false };
        }
    }),
    updateTeam: privateProcedure.input(
        z.object({
            teamname: z.string(),
            company: z.string()
        })
    ).mutation<Promise<any>>(async ({ ctx, input }) => {
        try {
            const { userEmail } = ctx;
            await dbConnect();
            const foundUser = await UserSchema.findOne({ email: userEmail });
            if (!foundUser) throw new TRPCError({ code: "UNAUTHORIZED" })
            const user = await UserSchema.updateMany({ team: foundUser.team }, { teamname: input.teamname, company: input.company });

            return { user: user as any, status: 200, success: true };
        } catch (err) {
            console.log(err)
            return { status: 500, success: false };
        }
    }),
    askQuestion: privateProcedure.query(async ({ ctx }) => {
        try {
            const { userEmail } = ctx;
            await dbConnect();
            const foundUser = await UserSchema.findOne({ email: userEmail });
            if (!foundUser) throw new TRPCError({ code: "UNAUTHORIZED" })

            //find question where asked date is most recent
            const question = await QuestionSchema.findOne().sort({ asked: -1 });
            console.log(question)
            //determine if asked date is more than 24h ago
            const now = new Date();
            console.log("now", now)
            const asked = question?.asked as Date;
            console.log("asked", asked)
            const diff = now.getTime() - asked.getTime();
            const diffHours = diff / (1000 * 60 * 60);

            // check if user has answered the question
            const alreadyAsked = foundUser.prompts.find((q : any) => q.question === question?.question) ? true : false;
            console.log(alreadyAsked)
            //if more than 24h, return next question
            if (diffHours >= 24) {
                //find next question in database after question above
                const newQuestion = await QuestionSchema.findOne({ _id: { $gt: question?._id } }).sort({ asked: 1 });
                const alreadyAsked = foundUser.prompts.find((q : any) => q.question === newQuestion?.question) ? true : false;
                console.log(alreadyAsked)

                const askQuestion = newQuestion?.question
                return { data: { askQuestion, alreadyAsked }, status: 200, success: true };
            } else {
                const alreadyAsked = foundUser.prompts.find((q : any) => q.question === question?.question) ? true : false;
                console.log(alreadyAsked)

                const askQuestion = question.question
                return { data: { askQuestion, alreadyAsked }, status: 200, success: true };
            }
        } catch (err) {
            console.log(err)
            return { data: { askQuestion: null, alreadyAsked: false }, status: 500, success: false };
        }
    }),
    submitAnswer: privateProcedure.input(
        z.object({
            question: z.string(),
            answer: z.string()
        })
    ).mutation(async ({ ctx, input }) => {
        try {
            const { userEmail } = ctx;
            await dbConnect();
            const foundUser = await UserSchema.findOne({ email: userEmail });
            if (!foundUser) throw new TRPCError({ code: "UNAUTHORIZED" })
            const newPromptsArray = foundUser.prompts
            newPromptsArray.push({ question: input.question, answer: input.answer })
            const user = await UserSchema.findOneAndUpdate({ email: userEmail }, { prompts: newPromptsArray });
            const question = await QuestionSchema.findOneAndUpdate({ question: input.question }, { asked: new Date() });
            return { user: user as any, question: question as any, status: 200, success: true };
        } catch (err) {
            console.log(err)
            return { status: 500, success: false };
        }
    }),
    getLastFiveQuestions: privateProcedure.query(async ({ ctx }) => {
        try {
            const { userEmail } = ctx;
            await dbConnect();
            const foundUser = await UserSchema.findOne({ email: userEmail });
            if (!foundUser) throw new TRPCError({ code: "UNAUTHORIZED" })
            const questions = await QuestionSchema.find().sort({ asked: -1 }).limit(5);
            return { questions: questions, status: 200, success: true };
        } catch (err) {
            console.log(err)
            return { questions: [],status: 500, success: false };
        }
    }),
    weeklyQuizScore: privateProcedure.input(z.object({
        score: z.number(),
    })
    ).mutation<Promise<any>>(async ({ ctx, input }) => {
     console.log("score", input.score)
        try {
            const { userEmail } = ctx;
            console.log("email", userEmail)
            if(!userEmail) throw new TRPCError({ code: "UNAUTHORIZED" })
            await dbConnect();
            const foundUser = await UserSchema.findOne({ email: userEmail });
            if (!foundUser) throw new TRPCError({ code: "NOT_FOUND" })
            
            const gameIndex = foundUser.game.findIndex((game : Game) => game.name === "weeklyQuiz");
             if (gameIndex === -1) throw new TRPCError({ code: "NOT_FOUND" });
    
             
             // add input.score to the current score
             foundUser.game[gameIndex].score += input.score;
             // foundUser.game[gameIndex].score = input.score;
             await foundUser.save();
             return { status: 200, success: true };
    } catch (err) {
     console.log(err)
     return { status: 500, success: false };
    }
    }),
    weeklyQuizData: privateProcedure
   .query(async ({ ctx, input }) => {
       try {
           const { userEmail } = ctx;
           if(!userEmail) throw new TRPCError({ code: "UNAUTHORIZED" })
           await dbConnect();
           const foundUser = await UserSchema.findOne({ email: userEmail });
           if (!foundUser) throw new TRPCError({ code: "NOT_FOUND" })
           
           const gameData = foundUser.game.find((game : Game) => game.name === "weeklyQuiz");
           return { data: gameData, status: 200, success: true };
       } catch (err) {
           console.log(err)
           return { data: [], status: 500, success: false };
       }
   }), 

weeklyQuizUsage: privateProcedure.input(z.object({
    usage: z.number(),
})
).mutation<Promise<any>>(async ({ ctx, input }) => {
    try {
        const { userEmail } = ctx;
        if(!userEmail) throw new TRPCError({ code: "UNAUTHORIZED" })
        await dbConnect();
        const foundUser = await UserSchema.findOne({ email: userEmail });
        if (!foundUser) throw new TRPCError({ code: "NOT_FOUND" })
        
        const gameIndex = foundUser.game.findIndex((game : Game) => game.name === "weeklyQuiz");
         if (gameIndex === -1) throw new TRPCError({ code: "NOT_FOUND" });

     // Update the usage of the found game
     foundUser.game[gameIndex].usage = input.usage;

       
         
         await foundUser.save();
         return { status: 200, success: true };
    } catch (err) {
        console.log(err)
        return { status: 500, success: false };
    }
}),

});


export type AppRouter = typeof appRouter;
