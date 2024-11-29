import React from "react";

function LikedArtworks() {
  const likedArtworks = [
    { id: 1, title: "Starry Night", artist: "Vincent van Gogh" },
    { id: 2, title: "The Persistence of Memory", artist: "Salvador Dalí" },
    { id: 3, title: "Mona Lisa", artist: "Leonardo da Vinci" },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Liked Artworks</h3>
      <ul className="list-disc pl-5">
        {likedArtworks.map((artwork) => (
          <li key={artwork.id} className="mb-2">
            <span className="font-bold">{artwork.title}</span> by {artwork.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LikedArtworks; 