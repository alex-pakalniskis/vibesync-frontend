'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet';
import shows from '../../data/shows.json';

export default function ShowDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const show = shows.find((s) => s.id.toString() === params.id);
  const [showTicketInfo, setShowTicketInfo] = useState(false);
  const [proceedToVibe, setProceedToVibe] = useState(false);
  const [confirmPurchase, setConfirmPurchase] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [vibe, setVibe] = useState('');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Fetch wallet address on load
  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        if (typeof window !== 'undefined' && window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching wallet:', error);
      }
    };

    fetchWalletAddress();
  }, []);

  const mockNFT = {
    id: "0x1A4CeB775616a53E6a1BB7F701E6a2dA9e02E6b1",
    price: "25.00 USDC",
    network: "Base",
    imageUrl: "/images/vibesync-nft.png",
  };

  const handleMintNFT = async () => {
    // Simulate a transaction hash (Replace with real minting logic)
    const fakeTransactionHash = "0x9c...f9c5";
    setTransactionHash(fakeTransactionHash);
    setMintSuccess(true);
  };

  if (!show) return <p className="text-white">Show not found</p>;

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center p-6">
      {/* Show Information */}
      {!mintSuccess ? (
        <>
          <h1 className="text-xl font-bold mt-6">{show.name}</h1>
          <p className="text-gray-400 mt-1">{show.date} - {show.venue} - {show.price}</p>
        </>
      ) : null}

      {!showTicketInfo ? (
        // Initial "Get your (NFT) ticket" screen
        <div className="flex flex-col items-center w-full max-w-lg text-center mt-6">
          <button
            className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-white text-lg font-medium"
            onClick={() => setShowTicketInfo(true)}
          >
            Get your (NFT) ticket
          </button>
          <button
            className="mt-3 px-6 py-2 bg-gray-700 rounded-full text-white text-lg font-medium hover:bg-gray-600 transition"
            onClick={() => router.push('/shows')}
          >
            Back to Shows
          </button>
        </div>
      ) : !proceedToVibe ? (
        // "How it works" UI
        <div className="w-full max-w-lg text-center mt-6">
          <h2 className="text-2xl font-bold">How it works</h2>
          <p className="text-gray-400 mt-1">{show.name} - {show.date} - {show.venue} - {show.price}</p>

          {/* Steps */}
          <div className="text-left mt-6 space-y-4">
            <p className="text-lg font-semibold">Buy Your Ticket <span className="text-gray-400 font-normal">– Secure your spot with an NFT ticket.</span></p>
            <p className="text-lg font-semibold">Submit Your Vibe <span className="text-gray-400 font-normal">– Enter your unique vibe phrase, which will shape the night’s music.</span></p>
            <p className="text-lg font-semibold">Experience the Show <span className="text-gray-400 font-normal">– A live setlist co-created by you, the DJ, and AI.</span></p>
            <p className="text-lg font-semibold">Watch your NFT Evolve <span className="text-gray-400 font-normal">– After the show, your NFT evolves with new visuals + a setlist link.</span></p>
          </div>

          {/* Proceed to Input Vibe Button */}
          <button
            className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white text-lg font-medium"
            onClick={() => setProceedToVibe(true)}
          >
            Proceed to Input Vibe
          </button>
        </div>
      ) : !confirmPurchase ? (
        // "Add Your Vibe" UI with Exit Option
        <div className="w-full max-w-lg text-center mt-6">
          <h2 className="text-2xl font-bold">Add your vibe</h2>
          <input
            type="text"
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
            placeholder="Enter your vibe..."
            className="mt-3 w-full px-4 py-3 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full text-white text-lg font-medium hover:bg-blue-600 transition"
            disabled={!vibe}
            onClick={() => setConfirmPurchase(true)}
          >
            Proceed to Purchase
          </button>
        </div>
      ) : !mintSuccess ? (
        // NFT Purchase Confirmation UI
        <div className="w-full max-w-lg text-center mt-6">
          <h2 className="text-2xl font-bold">Purchase NFT Ticket</h2>
          <p className="text-gray-400 mt-2">Request from VibeSync</p>
          <button
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full text-white text-lg font-medium"
            onClick={handleMintNFT}
          >
            Confirm Purchase
          </button>
        </div>
      ) : (
        // NFT Mint Success Screen
        <div className="w-full max-w-lg text-center mt-6 bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold">Congratulations!</h2>
          <p className="text-gray-400 mt-2">Your transaction went through successfully</p>

          <img src={mockNFT.imageUrl} alt="VibeSync NFT" className="mt-4 w-32 h-32 mx-auto rounded-lg" />

          <p className="mt-4 text-gray-400">VS Ticket Factory</p>
          <p className="mt-2 text-green-400">✅ Your transaction was successful</p>

          {transactionHash && (
            <p className="mt-2">
              <a href={`https://basescan.org/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                View transaction: {transactionHash}
              </a>
            </p>
          )}

          <button
            className="mt-6 px-6 py-3 bg-blue-600 rounded-full text-white text-lg font-medium"
            onClick={() => router.push('/')}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
