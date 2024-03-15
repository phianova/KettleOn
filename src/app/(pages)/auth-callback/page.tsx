"use client"
import React from 'react';
import { useRouter, useSearchParams, redirect } from "next/navigation";
import { trpc } from "../../_trpc/client";
import { Suspense } from 'react';
// import { Loader } from "lucide-react";

const Page = () => {
  const router = useRouter();

  // const searchParams = useSearchParams();
  // const origin = searchParams.get("origin");

  // if (
  //   origin !== "register" 
  // ) {
  //   router.push("/login");
  // }

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        router.push("/home");
      }
    },
    onError: (err) => {
      router.push("/");
    },

    retry: true,
    retryDelay: 5000,
  });

  return (
    <div className="w-full flex justify-center min-h-screen items-center">
      <div className="flex flex-col items-center gap-2">
        {/* <Loader className="w-10 h-10 animate-spin" /> */}
        <h3 className="text-lg font-semibold text-gray-700">
          Please wait while we create your account...
        </h3>
        <p className="text-sm text-gray-500">
          This should only take a few seconds.
        </p>
      </div>
    </div>
  ); 
};

export default Page;