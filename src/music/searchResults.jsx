import React from "react";
import search from "./search.module.css";

const SearchResults = ({ searchResult, setCurrentSong }) => {
  console.log(searchResult);
  return (
    <div className={search["search-results"]}>
      <h1>Search Results</h1>

      <div className={search.section}>
        <h2>Songs</h2>
        {searchResult?.songs?.map((song, index) => (
          <div key={song.id} className={search["result-item"]}>
            <img src={song.image[0].url} alt={song.title} />
            <h3>{song.title}</h3>
            <p>{song.album}</p>
            {}
            <i
              onClick={() => setCurrentSong(song)}
              className="fa  fa-play cursor-pointer"
            ></i>
          </div>
        ))}
      </div>

      <div className={search.section}>
        <h2>Albums</h2>
        {searchResult?.albums?.map((album, index) => (
          <div key={index} className={search["result-item"]}>
            <img src={album.image[0].url} alt={album.title} />
            <h3>{album.title}</h3>
            <p>{album.artist}</p>
            <i
              onClick={() => setCurrentSong(song)}
              className="fa  fa-play cursor-pointer"
            ></i>
          </div>
        ))}
      </div>

      <div className={search.section}>
        <h2>Artists</h2>
        {searchResult?.artists?.map((artist, index) => (
          <div key={index} className={search["result-item"]}>
            <img src={artist.image[0].url} alt={artist.name} />
            <h3>{artist.name}</h3>
            <p>{artist.description}</p>
            <i
              onClick={() => setCurrentSong(song)}
              className="fa  fa-play cursor-pointer"
            ></i>
          </div>
        ))}
      </div>

      <div className={search.section}>
        <h2>Playlists</h2>
        {searchResult?.playlists?.map((playlist, index) => (
          <div key={index} className={search["result-item"]}>
            <img src={playlist.image[0].url} alt={playlist.title} />
            <h3>{playlist.title}</h3>
            <i
              onClick={() => setCurrentSong(song)}
              className="fa  fa-play cursor-pointer"
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
