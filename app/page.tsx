'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Wallet, ConnectWallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Fetch wallet address when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) setWalletAddress(accounts[0]);
        })
        .catch(console.error);
    }
  }, []);

  const handleChangeWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('Wallet switch failed:', error);
      }
    }
  };

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

      {/* Wallet Section */}
      <div className="mt-8 flex flex-col items-center space-y-3">
        <Wallet onChange={({ address }) => setWalletAddress(address || null)}>
          {walletAddress ? (
            <WalletDropdown>
              <div className="flex flex-col items-center">
                <p className="text-gray-300">Connected Wallet:</p>
                <span className="text-white font-semibold">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                
                {/* Change Wallet Button */}
                <button
                  className="mt-3 px-6 py-2 bg-blue-600 rounded-full text-white text-lg font-medium hover:bg-blue-500 transition"
                  onClick={handleChangeWallet}
                >
                  Change Wallet
                </button>

                {/* Disconnect Button */}
                <WalletDropdownDisconnect onClick={() => setWalletAddress(null)} />
              </div>
            </WalletDropdown>
          ) : (
            <ConnectWallet className="mt-6 px-6 py-3 border border-gray-500 rounded-full text-white hover:bg-gray-800 transition" />
          )}
        </Wallet>
      </div>
    </div>
  );
}
