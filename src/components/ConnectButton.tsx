import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'

export function ConnectButton() {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-solar-warm-white text-sm">
          {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
        </span>
        <button
          onClick={() => disconnect()}
          className="solar-button text-sm"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button onClick={() => open()} className="solar-button">
      Connect Wallet
    </button>
  )
}
