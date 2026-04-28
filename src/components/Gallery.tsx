import type { Artwork } from "../schemas/artworkSchema";
import { ArtworkCard } from "./ArtworkCard";

type GalleryProps = {
  artworks: Artwork[];
};

export function Gallery({ artworks }: GalleryProps) {
  return (
    <section className="gallery-section">
      <h2>My Gallery</h2>

      {artworks.length === 0 ? (
        <p className="empty-gallery">No saved artworks yet.</p>
      ) : (
        <div className="artwork-grid">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </section>
  );
}
