import React, { useEffect, useState } from "react";

export default function Player({ token }) {
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    if (!token) return;

    if (!document.getElementById("spotify-sdk")) {
      const script = document.createElement("script");
      script.id = "spotify-sdk";
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      script.onload = () => {
        if (!window.Spotify) {
          console.error("Spotify SDK not loaded");
          return;
        }

        const player = new window.Spotify.Player({
          name: "My React Player",
          getOAuthToken: (cb) => cb(token),
          volume: 0.5,
        });

        player.addListener("ready", ({ device_id }) => {
          console.log("Device ID:", device_id);
          setDeviceId(device_id);
        });

        player.connect();
      };

      document.body.appendChild(script);
    }
  }, [token]);

  const playSample = () => {
    if (!deviceId) return alert("Player not ready");

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: ["spotify:track:3n3Ppam7vgaVa1iaRUc9Lp"] }),
    });
  };

  return (
    <div>
      <button onClick={playSample} disabled={!deviceId}>
        Play Sample
      </button>
      {!deviceId && <p>Loading Player...</p>}
    </div>
  );
}
