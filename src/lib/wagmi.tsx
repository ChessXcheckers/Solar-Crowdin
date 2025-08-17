import { createWeb3Modal } from '@web3modal/wagmi/react'
import { http, createConfig, WagmiProvider } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { walletConnect, injected } from 'wagmi/connectors'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'YOUR_PROJECT_ID'

// 2. Create wagmiConfig
const metadata = {
  name: 'SolarCrowdIn',
  description: 'A decentralized platform for solar energy investment and trading.',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, sepolia] as const
export const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http()
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
  ],
})

// 3. Create modal immediately after config
createWeb3Modal({
  wagmiConfig,
  projectId,
})

export function Web3ModalProvider({ children }) {

  return (
    <WagmiProvider config={wagmiConfig}>
      {children}
    </WagmiProvider>
  );
}
