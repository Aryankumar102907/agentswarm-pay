import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrumSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'AgentSwarm Payment System',
  projectId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', // Demo project ID
  chains: [arbitrumSepolia],
  ssr: false,
});
