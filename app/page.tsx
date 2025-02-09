'use client';

// import { useState } from 'react';
import Link from 'next/link';
// import { Wallet, ConnectWallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';

export default function HomePage() {
  // const [walletAddress, setWalletAddress] = useState<string | null>(null);

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-6">
      {/* Logo & Title */}
      <h1 className="text-3xl font-bold mt-6">VibeSync</h1>
      <p className="text-gray-400 mt-2">Your Vibe, Your Sound, Your Night.</p>

      {/* Explore Shows Button */}
      <Link href="/shows">
        <button className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-white text-lg font-medium">
          Explore Shows
        </button>
      </Link>


    </div>
  );
}


      // {/* Wallet Section */}
      // <div className="mt-8 flex flex-col items-center space-y-3">
      //   <Wallet onChange={({ address }) => setWalletAddress(address || null)}>
      //     {walletAddress ? (
      //       <WalletDropdown>
      //         <div className="flex flex-col items-center">
      //           <p className="text-gray-300">Connected Wallet:</p>
      //           <span className="text-white font-semibold">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>

      //           {/* Disconnect Button */}
      //           <WalletDropdownDisconnect onClick={() => setWalletAddress(null)} />
      //         </div>
      //       </WalletDropdown>
      //     ) : (
      //       <ConnectWallet className="mt-6 px-6 py-3 border border-gray-500 rounded-full text-white hover:bg-gray-800 transition" />
      //     )}
      //   </Wallet>
      // </div>