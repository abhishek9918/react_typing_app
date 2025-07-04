import React, { createContext, useEffect, useState, useContext } from "react";

const SpotifyTokenContext = createContext();

export const SpotifyTokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    let intervalId;

    const fetchToken = async () => {
      try {
        const url = "http://localhost:1517/token";
        const res = await fetch(url);
        const data = await res.json();
        if (data.access_token) {
          localStorage.setItem("spotify_access_token", data.access_token);
          setToken(data.access_token);
          if (intervalId) clearInterval(intervalId);
          intervalId = setInterval(fetchToken, 55 * 60 * 1000);
        }
      } catch (err) {
        console.error("Failed to fetch token:", err);
      }
    };

    fetchToken();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <SpotifyTokenContext.Provider value={token}>
      {children}
    </SpotifyTokenContext.Provider>
  );
};

export const useSpotifyToken = () => useContext(SpotifyTokenContext);
