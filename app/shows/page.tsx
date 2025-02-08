'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SUBGRAPH_URL = "https://api.studio.thegraph.com/query/95666/vibesync-subgraph/version/latest";
const SHOWS_QUERY = `{
  collections(first: 5) {
    id
    showTitle
    djName
    location
    date
  }
}`;

export default function ShowsPage() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await fetch(SUBGRAPH_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: SHOWS_QUERY }),
        });
        const { data } = await response.json();
        setShows(data.collections);
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchShows();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mt-6">Upcoming Shows</h1>
      {loading ? (
        <p className="mt-6">Loading shows...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {shows.map((show) => (
            <div 
              key={show.id} 
              className="p-4 bg-gray-800 rounded-lg text-center cursor-pointer hover:bg-gray-700 transition"
              onClick={() => router.push(`/shows/${show.id}`)}
            >
              <h2 className="text-2xl font-semibold">{show.showTitle}</h2>
              <p className="text-sm text-gray-400">Date: {show.date}</p>
              <p className="text-sm text-gray-400">DJ: {show.djName}</p>
              <p className="text-sm text-gray-400">Location: {show.location}</p>
            </div>
          ))}
        </div>
      )}
      <button 
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-lg font-medium"
      >
        Return Home
      </button>
    </div>
  );
}