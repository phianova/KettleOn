"use client"
import React, { useEffect } from 'react'
import schedule from 'node-schedule';
import { trpc } from "../../_trpc/client";

 

const page = () => {
    const { mutate: teamUsageReset } = trpc.teamUsageReset.useMutation();
    const { mutate: teamScoreReset } = trpc.teamScoreReset.useMutation();

    useEffect(() => {
        console.log("inside useeffect")
         // node-scheduler that runs at midnight
      schedule.scheduleJob('15 11 * * *', function() {
        console.log('24 hrs passed');
        teamUsageReset()
    });
      schedule.scheduleJob('15 11 * * *', function() {
        console.log('1 week passed');
        teamScoreReset();
      })
      }, [])
  return (
    <div>page</div>
  )
}

export default page