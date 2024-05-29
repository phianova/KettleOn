import { trpc } from "../../_trpc/client";
export const dynamic = 'force-dynamic';

export default async function handler(req, res) {
    const { mutate: teamUsageReset } = trpc.teamUsageReset.useMutation();
    console.log('Usage endpoint called by cron job');
    
    try {
        await teamUsageReset();
        res.status(200).json({ message: 'Usage data reset successfully' });
    } 
    catch (error) {
        console.error('Error resetting score:', error);
        res.status(500).json({ message: 'Failed to reset usage data' });
    }
  
  }
  