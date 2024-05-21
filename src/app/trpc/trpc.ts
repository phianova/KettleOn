import { initTRPC } from "@trpc/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

const t = initTRPC.create()

const isAuth = t.middleware(async(opts) => {
    const { getUser } = getKindeServerSession() 
    const user = (await getUser()) as KindeUser | null;
    
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
export const privateProcedure = t.procedure.use(isAuth)