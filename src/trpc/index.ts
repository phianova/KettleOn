import { publicProcedure, router } from "./trpc";
import dbConnect from "../lib/mongo";


export const appRouter = router({
    apiTest: publicProcedure.query( async () => { 
        await dbConnect();
        console.log("db connected");
        return "apiTest";
    }),
});


export type AppRouter = typeof appRouter;
