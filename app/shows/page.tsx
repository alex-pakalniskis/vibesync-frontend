'use client';

import { useRouter } from 'next/navigation';
import shows from '../data/shows.json';

export default function ShowsList() {
  const router = useRouter();

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center p-6">
      <h2 className="text-lg font-semibold mt-10">Upcoming Shows</h2>

      <div className="w-full max-w-lg space-y-4 mt-4">
        {shows.map((show) => (
          <div
            key={show.id}
            className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl p-4 cursor-pointer hover:bg-gray-800 transition shadow-lg"
            onClick={() => router.push(`/shows/${show.id}`)}
          >
            <div className="flex items-center space-x-3">
              {/* Show Icon */}
              <div className="text-2xl">{show.icon}</div>

              {/* Show Details */}
              <div>
                <h3 className="text-white font-semibold">{show.name}</h3>
                <p className="text-gray-400 text-sm">{show.date} - {show.venue} - {show.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <button
        className="mt-6 px-6 py-2 bg-gray-700 rounded-full text-white text-lg font-medium hover:bg-gray-600 transition"
        onClick={() => router.push('/')}
      >
        Back to Home
      </button>
    </div>
  );
}
