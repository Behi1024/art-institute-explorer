import {
  ArtworkApiResponseSchema,
  type Artwork,
} from "../schemas/artworkSchema";

export async function searchArtworks(query: string): Promise<Artwork[]> {
  const url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(
    query,
  )}&fields=id,title,artist_title,image_id&limit=12`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch artworks");
  }

  const json = await response.json();

  const result = ArtworkApiResponseSchema.safeParse(json);

  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid API response");
  }

  return result.data.data;
}
