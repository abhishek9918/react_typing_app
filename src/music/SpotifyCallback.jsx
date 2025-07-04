import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.replace("#", "?")).get(
      "access_token"
    );

    if (token) {
      localStorage.setItem("spotify_token", token);
      navigate("/"); // Go back to main player
    }
  }, []);

  return <div>Logging in...</div>;
};

export default SpotifyCallback;
