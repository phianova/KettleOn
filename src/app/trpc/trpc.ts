import { initTRPC } from "@trpc/server";
import superjson from "superjson";
// import { createContext } from "./context";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// const t = initTRPC.context<typeof createContext>().create({
//     transformer: superjson,
// });

const t = initTRPC.create()


const isAuth = t.middleware(async(opts) => {
    const { getUser } = getKindeServerSession() 
    console.log("got to isAuth")
    const user = (await getUser()) as any
    
    if (!user || !user.email) {
        throw new Error("Unauthorized")
    }

    return opts.next({
        ctx: {
            userEmail: user.email,
            user
        }
    })
})

export const router = t.router;
export const publicProcedure = t.procedure;
// export const createCallerFactory = t.createCallerFactory;
export const privateProcedure = t.procedure.use(isAuth)