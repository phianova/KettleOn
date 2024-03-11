// import { createContext } from "../../../../trpc/context";
import { appRouter } from '../../../trpc/index'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

// export const maxDuration = 300

const handler = (req: Request) => {
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  })
}

export { handler as GET, handler as POST }