'use client';

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const SUBGRAPH_URL = "https://api.studio.thegraph.com/query/95666/vibesync-subgraph/version/latest";

export default function ShowDetailsPage() {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewingDetails, setViewingDetails] = useState(true);
  const [inputVibe, setInputVibe] = useState(false);
  const [vibeText, setVibeText] = useState("");
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    async function fetchShowDetails() {
      const SHOW_DETAILS_QUERY = `{
        collection(id: "${id}") {
          date
          djName
          genre
          location
          showTitle
          startTime
          collectionAddress
        }
      }`;
      try {
        const response = await fetch(SUBGRAPH_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: SHOW_DETAILS_QUERY }),
        });
        const { data } = await response.json();
        setShow(data.collection);
      } catch (error) {
        console.error("Error fetching show details:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchShowDetails();
    }
  }, [id]);

  if (loading) {
    return <p className="mt-6 text-white">Loading show details...</p>;
  }

  if (!show) {
    return <p className="mt-6 text-white">Show not found.</p>;
  }

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-6">
      {viewingDetails ? (
        <div className="p-6 bg-gray-800 rounded-lg text-center w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">{show.showTitle}</h1>
          <p className="text-lg text-gray-400">Date: {show.date}</p>
          <p className="text-lg text-gray-400">Start Time: {show.startTime}</p>
          <p className="text-lg text-gray-400">DJ: {show.djName}</p>
          <p className="text-lg text-gray-400">Genre: {show.genre}</p>
          <p className="text-lg text-gray-400">Location: {show.location}</p>
          <p className="text-lg text-gray-400">Collection Address: {show.collectionAddress}</p>
          
          <button 
            onClick={() => setViewingDetails(false)}
            className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white text-lg font-medium"
          >
            Get Your (NFT) Ticket
          </button>
          <button 
            onClick={() => router.push("/shows")}
            className="mt-6 px-6 py-3 bg-gray-500 hover:bg-gray-600 rounded-lg text-white text-lg font-medium"
          >
            Back to Shows
          </button>
        </div>
      ) : inputVibe ? (
        <div className="p-6 bg-gray-800 rounded-lg text-center w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">Add your vibe</h1>
          <p className="text-gray-400">Desired show vibe</p>
          <input
            type="text"
            className="w-full p-3 mt-3 text-black rounded-md"
            placeholder="Enter your vibe..."
            value={vibeText}
            onChange={(e) => setVibeText(e.target.value)}
          />
          <p className="text-gray-400 mt-2">Your vibe will be combined with other attendees to influence the setlist the DJ plays.</p>
          
          <button 
            onClick={() => router.push(`/shows/${id}/mint-nft`)}
            className={`mt-6 px-6 py-3 rounded-lg text-white text-lg font-medium ${vibeText.length > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 cursor-not-allowed'}`}
            disabled={vibeText.length === 0}
          >
            Mint your NFT Ticket
          </button>
          <button 
            onClick={() => setInputVibe(false)}
            className="mt-6 px-6 py-3 bg-gray-700 hover:bg-gray-800 rounded-lg text-white text-lg font-medium"
          >
            Back to Show Details
          </button>
        </div>
      ) : (
        <div className="p-6 bg-gray-800 rounded-lg text-center w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">How it Works</h1>
          <p className="text-gray-400">Buy Your Ticket - Secure your spot with an NFT ticket.</p>
          <p className="text-gray-400 mt-2">Submit Your Vibe - Enter your unique vibe phrase, which will shape the night's music.</p>
          <p className="text-gray-400 mt-2">Experience the Show - A live setlist co-created by you, the DJ, and AI.</p>
          <p className="text-gray-400 mt-2">Watch your NFT Evolve - After the show, your NFT evolves with new visuals & a setlist link.</p>
          
          <button 
            onClick={() => setViewingDetails(true)}
            className="mt-6 px-6 py-3 bg-gray-700 hover:bg-gray-800 rounded-lg text-white text-lg font-medium"
          >
            Back to Show Details
          </button>
          <button 
            onClick={() => setInputVibe(true)}
            className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-lg font-medium"
          >
            Input Your Vibes
          </button>
          <button 
            onClick={() => router.push("/shows")}
            className="mt-6 px-6 py-3 bg-gray-500 hover:bg-gray-600 rounded-lg text-white text-lg font-medium"
          >
            Back to Shows
          </button>
        </div>
      )}
    </div>
  );
}
