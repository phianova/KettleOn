import Image from "next/image";
import { serverClient } from "../trpc/server-client";


export default async function Home() {
  const connected = await serverClient.apiTest();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Main Page</h1>
        <p>{connected}</p>
    </main>
  );
}
