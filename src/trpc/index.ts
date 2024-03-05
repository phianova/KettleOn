import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    apiTest: publicProcedure.query(() => { return "apiTest"}),
});


export type AppRouter = typeof appRouter;
