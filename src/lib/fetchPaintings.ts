import { PaintingsZodSchema, type PaintingsType } from '@/models/Paintings';

export default async function fetchPaintings(url: string): Promise<PaintingsType | undefined> {
  try {
    console.log('AGUA')
    const responseToken = await fetch('/api/xapptoken');

    const token = await responseToken.json();

    console.log('TOKEN: ', token);

    if (!token) throw new Error('Internal Server Error');

    const xapptoken = token.token;

    const response = await fetch(url, {
      headers: {
        'X-Xapp-Token': xapptoken
      }
    });

    if (!response.ok) throw new Error('Failed to fetch paintings');

    const paintings = await response.json();

    const parsedPaintings = PaintingsZodSchema.parse(paintings);

    return parsedPaintings;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
