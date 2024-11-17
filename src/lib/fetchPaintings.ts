import {
  PaintingsZodSchema,
  PaintingType,
  type PaintingsType
} from '@/models/Paintings';

export default async function fetchPaintings(
  url: string
): Promise<PaintingsType | undefined> {
  try {
    const responseToken = await fetch('/api/xapptoken');

    const token = await responseToken.json();

    if (!token) throw new Error('Internal Server Error');

    const xapptoken = token.token;

    const response = await fetch(url, {
      headers: {
        'X-Xapp-Token': xapptoken
      }
    });

    if (!response.ok) throw new Error('Failed to fetch paintings');

    const paintings = await response.json();

    const filteredPaintings = {
      ...paintings,
      _embedded: {
        artworks: paintings._embedded.artworks.filter(
          (artwork: PaintingType) =>
            artwork.category &&
            artwork.medium &&
            artwork._links.image &&
            artwork.image_versions?.length
        )
      }
    };

    const parsedPaintings = PaintingsZodSchema.parse(filteredPaintings);

    return parsedPaintings;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
