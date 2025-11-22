import '@rainbow-me/rainbowkit/styles.css';
import { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WalletButton } from '@/components/WalletButton';
import { EventLog, LogEntry } from '@/components/EventLog';
import { BotAPIDemo } from '@/components/BotAPIDemo';
import { AboutSection } from '@/components/AboutSection';
import { config } from '@/config/wagmi';
import { Bot, Code2, Info } from 'lucide-react';
import { ContractAddress } from '@/components/ContractAddress';
import { PAYMENT_ROUTER_ADDRESS, COST_SPLITTER_ADDRESS } from '@/config/contracts';

const queryClient = new QueryClient();

const Index = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (log: LogEntry) => {
    setLogs(prev => [log, ...prev].slice(0, 20));
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="min-h-screen bg-background">
            {/* Neo-brutalist Header */}
            <header className="border-b-4 border-foreground py-6 px-4 md:px-8">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h1 className="text-3xl md:text-5xl font-black mb-2 bg-gradient-full bg-clip-text text-transparent">
                    AGENTSWARM
                  </h1>
                  <p className="text-sm md:text-base font-bold">Autonomous Payment Infrastructure on Arbitrum Stylus</p>
                </div>
                <WalletButton />
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
              {/* Contract Addresses Banner */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <ContractAddress 
                  address={PAYMENT_ROUTER_ADDRESS}
                  label="Payment Router"
                  variant="primary"
                />
                <ContractAddress 
                  address={COST_SPLITTER_ADDRESS}
                  label="Cost Splitter"
                  variant="secondary"
                />
              </div>

              {/* Tabs */}
              <Tabs defaultValue="demo" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 p-1 border-4 border-foreground bg-muted h-auto">
                  <TabsTrigger 
                    value="demo" 
                    className="neo-border-sm data-[state=active]:gradient-electric data-[state=active]:text-white font-black py-3"
                  >
                    <Bot className="mr-2 h-5 w-5" />
                    <span className="hidden sm:inline">BOT</span> DEMO
                  </TabsTrigger>
                  <TabsTrigger 
                    value="contracts"
                    className="neo-border-sm data-[state=active]:gradient-fire data-[state=active]:text-white font-black py-3"
                  >
                    <Code2 className="mr-2 h-5 w-5" />
                    <span className="hidden sm:inline">LIVE</span> CONTRACTS
                  </TabsTrigger>
                  <TabsTrigger 
                    value="about"
                    className="neo-border-sm data-[state=active]:gradient-sunset data-[state=active]:text-white font-black py-3"
                  >
                    <Info className="mr-2 h-5 w-5" />
                    ABOUT
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="demo" className="space-y-6">
                  <BotAPIDemo onLog={addLog} />
                </TabsContent>

                <TabsContent value="contracts" className="space-y-6">
                  <div className="neo-card p-8 text-center gradient-full">
                    <div className="bg-background/95 backdrop-blur p-8 border-4 border-foreground">
                      <h2 className="text-3xl font-black mb-4">🚧 LIVE CONTRACT INTERACTIONS</h2>
                      <p className="text-lg mb-6">
                                Connect your wallet to interact with live contracts on Arbitrum Sepolia
                      </p>
                      <div className="space-y-4 text-left max-w-2xl mx-auto">
                        <div className="border-l-4 border-secondary pl-4">
                          <strong>Payment Router:</strong> Deposit ETH, authorize agents, initiate payments, and withdraw funds
                        </div>
                        <div className="border-l-4 border-accent pl-4">
                          <strong>Cost Splitter:</strong> Create split agreements and contribute funds for multi-agent collaboration
                        </div>
                        <div className="border-l-4 border-primary pl-4">
                          <strong>Note:</strong> You'll need Arbitrum Sepolia testnet ETH. Get it from the{' '}
                          <a 
                            href="https://www.alchemy.com/faucets/arbitrum-sepolia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary underline hover:no-underline"
                          >
                            Alchemy faucet
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="about">
                  <AboutSection />
                </TabsContent>
              </Tabs>

              {/* Event Log */}
              <div className="mt-8">
                <EventLog logs={logs} />
              </div>
            </main>

            {/* Footer */}
            <footer className="border-t-4 border-foreground mt-16 py-8 px-4 md:px-8">
              <div className="max-w-7xl mx-auto text-center">
                <p className="font-bold mb-2">Built with Arbitrum Stylus (Rust) + React + wagmi</p>
                <p className="text-sm text-muted-foreground">
                  Powering the future of autonomous agent economies • Arbitrum Sepolia Testnet
                </p>
              </div>
            </footer>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Index;
