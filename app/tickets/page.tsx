'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SUBGRAPH_URL = "https://api.studio.thegraph.com/query/95666/vibesync-subgraph/version/latest";
const MINTER_ADDRESS = "0xB2e13CaF7086E24B1bD88d036a4354f948b4a9ba";
const NFTS_QUERY = `{
  nfts(where: {minter: "${MINTER_ADDRESS}"}, first: 3 orderDirection: asc) {
    id
    collection {
      date
      collectionAddress
      djName
      genre
      id
      location
      name
      showTitle
      startTime
    }
    tokenURI
  }
}`;

export default function TicketsPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch(SUBGRAPH_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: NFTS_QUERY }),
        });
        const { data } = await response.json();
        setTickets(data.nfts);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mt-6">My Tickets</h1>
      {loading ? (
        <p className="mt-6">Loading tickets...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-4 bg-gray-800 rounded-lg text-center">
              <h2 className="text-2xl font-semibold">{ticket.collection.showTitle}</h2>
              <p className="text-sm text-gray-400">Date: {ticket.collection.date}</p>
              <p className="text-sm text-gray-400">DJ: {ticket.collection.djName}</p>
              <p className="text-sm text-gray-400">Location: {ticket.collection.location}</p>
              <p className="text-sm text-gray-400">Token URI: {ticket.tokenURI}</p>
            </div>
          ))}
        </div>
      )}
      <button 
            onClick={() => router.push("/shows")}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-white text-lg font-medium hover:shadow-lg hover:opacity-90 transition ease-in-out duration-300"
          >
            Back to Shows
          </button>
          <button 
            onClick={() => router.push("/")}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-white text-lg font-medium hover:shadow-lg hover:opacity-90 transition ease-in-out duration-300"
        >
            Return Home
      </button>
    </div>
  );
}
