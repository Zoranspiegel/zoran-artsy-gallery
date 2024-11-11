import { z } from 'zod';

const ImageVersionZodSchema = z.string();

const PaintingZodSchema = z.object({
  id: z.string().min(1),
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  medium: z.string(),
  date: z.string(),
  collecting_institution: z.string(),
  image_versions: z.array(ImageVersionZodSchema),
  _links: z.object({
    thumbnail: z.object({
      href: z.string()
    }),
    image: z.object({
      href: z.string()
    }),
    permalink: z.object({
      href: z.string()
    }),
  })
});

export const PaintingsZodSchema = z.object({
  total_count: z.number(),
  _embedded: z.object({
    artworks: z.array(PaintingZodSchema)
  })
});

export type PaintingsType = z.infer<typeof PaintingsZodSchema>;

export type PaintingType = z.infer<typeof PaintingZodSchema>;
