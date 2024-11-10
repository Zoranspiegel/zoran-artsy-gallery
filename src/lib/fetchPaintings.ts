import { PaintingsZodSchema, PaintingType, type PaintingsType } from '@/models/Paintings';
import getXAppToken from './getXAppToken';

export default async function fetchPaintings(url: string): Promise<PaintingsType | undefined> {
  try {
    const xapptokens = await getXAppToken();

    if (!xapptokens?.token) throw new Error('Internal Server Error');

    const xapptoken = xapptokens?.token;

    const response = await fetch(url, {
      headers: {
        'X-Xapp-Token': xapptoken
      }
    });

    if (!response.ok) throw new Error('Failed to fetch paintings');

    const responseJSON = await response.json();

    const paintings = { ...responseJSON, _embedded: { artworks: responseJSON._embedded.artworks.filter((artwork: PaintingType) => artwork.category === 'Painting') } };

    const parsedPaintings = PaintingsZodSchema.parse(paintings);

    return parsedPaintings;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
