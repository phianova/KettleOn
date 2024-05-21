"use client"
import React, {useEffect, useMemo} from 'react';
import { useRouter } from "next/navigation";
import { trpc } from "../../_trpc/client";
import { useToast } from "../../../components/shadcn/use-toast";

const Page = () => {
  const router = useRouter();
  const {toast} = useToast();

  const data = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 5000,
  });

  const isSuccess = useMemo(() => data.data?.success, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success!",
        description: "Taking you to homepage...",
        duration: 2000
      })
      router.push("/home");
    }
  
    if (data.isError) {
      toast({
        title: "Error!",
        description: "Authentication failed. Please try again.",
        variant: "destructive",
        duration: 2000
      })
      router.push("/");
    }
  }, [isSuccess, data.isError, router, toast]);


  return (
    <div className="w-full flex justify-center min-h-screen items-center">
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-2xl text-[#292929]">
          Checking user data...
        </h3>
        <p className="text-lg text-[#292929]/70">
          This should only take a few seconds.
        </p>
      </div>
    </div>
  );
};

export default Page;