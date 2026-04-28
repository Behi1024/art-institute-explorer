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
      {imageUrl ? (
        <img src={imageUrl} alt={artwork.title} />
      ) : (
        <div className="image-placeholder">No image</div>
      )}

      <div className="artwork-info">
        <h2>{artwork.title}</h2>
        <p>{artwork.artist_title ?? "Unknown artist"}</p>

        <button disabled>Add to Gallery</button>
      </div>
    </article>
  );
}
