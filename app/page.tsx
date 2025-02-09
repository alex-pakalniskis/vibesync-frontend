'use client';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import {
  Wallet,
  ConnectWallet,
  ConnectWalletText,
  WalletDropdown,
  WalletDropdownDisconnect
} from '@coinbase/onchainkit/wallet';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-6">
      {/* Logo & Title */}
      <Image src="/logo.png" alt="Logo" width={100} height={100} />
      <h1 className="text-3xl font-bold mt-6">VibeSync</h1>
      <p className="text-gray-400 mt-2">Your Vibe, Your Sound, Your Night.</p>

      {/* Explore Shows Button */}
      <Link href="/shows">
        <button className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-white text-lg font-medium hover:shadow-lg hover:opacity-90 transition ease-in-out duration-300">
          Explore Shows
        </button>
      </Link>
      <button 
        onClick={() => router.push("/tickets")}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-white text-lg font-medium hover:shadow-lg hover:opacity-90 transition ease-in-out duration-300"
      >
        View Your Tickets
      </button>

      {/* Wallet Section */}
      <div className="mt-8 flex flex-col items-center space-y-3">
        <Wallet onChange={({ address }) => setWalletAddress(address || null)}>
          <ConnectWallet className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-white text-lg font-medium hover:shadow-lg hover:opacity-90 transition ease-in-out duration-300">
            <ConnectWalletText>Log In</ConnectWalletText>
            <Avatar />
            <Name />
          </ConnectWallet>
          <WalletDropdown>
            <Identity>
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </div>
    </div>
  );
}
