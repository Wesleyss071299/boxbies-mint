import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { Toaster } from "react-hot-toast";

const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Boxbies Mint',
  projectId: 'bd1aeb6736d4f328438b642ff893b6d2',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning={ true }>
    {typeof window === 'undefined' ? null : (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                border: "1px solid #2e2e2e",
                color: "#FFFFFF",
                backgroundColor: "#000000",
              },
            }}
          />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    )}
  </div>

  ); 
}
