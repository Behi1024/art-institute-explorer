import type { Artwork } from "../schemas/artworkSchema";

type ArtworkCardProps = {
  artwork: Artwork;
};

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    : null;

  return (
    <article className="artwork-card">
      <div className="card-title-bar">
        <span>{artwork.title}</span>
        <button aria-label="Close card">×</button>
      </div>

      <div className="artwork-image-frame">
        {imageUrl ? (
          <img src={imageUrl} alt={artwork.title} />
        ) : (
          <div className="image-placeholder">No image</div>
        )}
      </div>

      <div className="artwork-info">
        <p>{artwork.artist_title ?? "Unknown artist"}</p>
        <button>Add to Gallery</button>
      </div>
    </article>
  );
}
