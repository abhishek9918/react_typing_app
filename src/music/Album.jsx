// import React, { useState } from "react";

// function Album({ albumData }) {
//   const [currentAudio, setCurrentAudio] = useState(null);
//   const [playingTrackId, setPlayingTrackId] = useState(null);

//   const playPreview = (track) => {
//     if (!track.preview_url) {
//       alert("No preview available for this track");
//       return;
//     }

//     // Pause previous audio
//     if (currentAudio) {
//       currentAudio.pause();
//     }

//     const audio = new Audio(track.preview_url);
//     audio
//       .play()
//       .then(() => {
//         setCurrentAudio(audio);
//         setPlayingTrackId(track.id);
//       })
//       .catch((err) => {
//         console.error("Playback error:", err);
//         alert("Playback failed. Possibly blocked by browser.");
//       });
//   };

//   return (
//     <div className="p-4">
//       {albumData ? (
//         <>
//           <h2 className="text-2xl font-bold mb-2">{albumData.name}</h2>
//           <p className="text-sm text-gray-500">
//             by {albumData.artists.map((a) => a.name).join(", ")}
//           </p>
//           <img
//             src={albumData.images[0]?.url}
//             alt={albumData.name}
//             className="my-4 w-64"
//           />
//           <h3 className="text-xl font-semibold mb-2">Tracks:</h3>
//           <ul className="ml-6">
//             {albumData.tracks.items.map((track, index) => (
//               <li
//                 key={track.id}
//                 onClick={() => playPreview(track)}
//                 className={`mb-2 p-2 rounded cursor-pointer ${
//                   playingTrackId === track.id
//                     ? "bg-green-200"
//                     : "hover:bg-gray-100"
//                 } ${!track.preview_url && "opacity-50 cursor-not-allowed"}`}
//               >
//                 {index + 1}. {track.name}{" "}
//                 <span className="text-sm text-gray-400">
//                   ({Math.floor(track.duration_ms / 60000)}:
//                   {((track.duration_ms % 60000) / 1000)
//                     .toFixed(0)
//                     .padStart(2, "0")}
//                   )
//                 </span>
//                 <button
//                   onClick={() => playSong(track.uri)}
//                   className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
//                 >
//                   Play
//                 </button>
//                 {!track.preview_url && (
//                   <span className="ml-2 text-red-400 text-xs">
//                     (No Preview)
//                   </span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       ) : (
//         <p>Loading album...</p>
//       )}
//     </div>
//   );
// }

// export default Album;

import React from "react";

function Album({ albumData, playSong }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{albumData.name}</h2>
      <div className="space-y-4">
        {albumData.tracks.items.map((track) => (
          <div
            key={track.id}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
          >
            <div>
              <p className="font-medium">{track.name}</p>
              <p className="text-sm text-gray-400">
                {track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
            <button
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
              onClick={() => playSong(track.uri)}
            >
              ▶️ Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Album;
