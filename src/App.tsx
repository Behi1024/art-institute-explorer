import { useEffect, useState } from "react";
import "./App.css";

import type { Artwork } from "./schemas/artworkSchema";
import { searchArtworks } from "./api/artworksApi";
import { SearchBar } from "./components/SearchBar";
import { ArtworkCard } from "./components/ArtworkCard";
import { Gallery } from "./components/Gallery";

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [galleryArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setArtworks([]);
      setErrorMessage("");
      return;
    }

    async function fetchDebouncedResults() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const results = await searchArtworks(debouncedQuery);
        setArtworks(results);
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong while loading artworks.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchDebouncedResults();
  }, [debouncedQuery]);

  async function handleSearch() {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setErrorMessage("Please enter a search term.");
      setArtworks([]);
      return;
    }

    setDebouncedQuery(trimmedQuery);
  }

  return (
    <main className="desktop">
      <section className="win98-window">
        <div className="window-title-bar">
          <div className="window-title">
            <span className="window-icon">🖼️</span>
            <span>Art Institute Explorer</span>
          </div>

          <div className="window-buttons">
            <button aria-label="Minimize">─</button>
            <button aria-label="Maximize">□</button>
            <button aria-label="Close">×</button>
          </div>
        </div>

        <div className="window-content">
          <section className="search-panel">
            <label>Search:</label>

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
        </div>
      </section>
    </main>
  );
}

export default App;
