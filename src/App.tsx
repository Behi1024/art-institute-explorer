import { useState } from "react";
import "./App.css";

import type { Artwork } from "./schemas/artworkSchema";
import { searchArtworks } from "./api/artworksApi";
import { SearchBar } from "./components/SearchBar";
import { ArtworkCard } from "./components/ArtworkCard";
import { Gallery } from "./components/Gallery";

function App() {
  const [query, setQuery] = useState("cats");
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [galleryArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSearch() {
    if (!query.trim()) {
      setErrorMessage("Please enter a search term.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const results = await searchArtworks(query);
      setArtworks(results);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong while loading artworks.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Art Institute Explorer</p>
        <h1>Search artworks and build your personal gallery.</h1>
        <p>
          A React + TypeScript mini project using fetch and Zod runtime
          validation.
        </p>

        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
        />
      </section>

      {isLoading && <p className="status">Loading artworks...</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}

      <section className="results-section">
        <h2>Search Results</h2>

        {artworks.length === 0 && !isLoading ? (
          <p className="status">
            Search for something like cats, flowers, Monet...
          </p>
        ) : (
          <div className="artwork-grid">
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        )}
      </section>

      <Gallery artworks={galleryArtworks} />
    </main>
  );
}

export default App;
