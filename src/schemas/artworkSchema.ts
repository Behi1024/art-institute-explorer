import { z } from "zod";

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string().default("Untitled"),
  artist_title: z.string().nullable().default("Unknown artist"),
  image_id: z.string().nullable().default(null),
});

export const ArtworkApiResponseSchema = z.object({
  data: z.array(ArtworkSchema),
});

export type Artwork = z.infer<typeof ArtworkSchema>;
