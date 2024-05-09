import { trpc } from "../../_trpc/client";
export const dynamic = 'force-dynamic';

export default function handler(req, res) {
    const { mutate: teamUsageReset } = trpc.teamUsageReset.useMutation();
    const { mutate: teamScoreReset } = trpc.teamScoreReset.useMutation();
    console.log('Usage endpoint called by cron job');
    
    teamScoreReset();
    teamUsageReset();
  
    // response to indicate the operation was successful
    res.status(200).json({ message: 'Usage data reset successfully' });
  }
  