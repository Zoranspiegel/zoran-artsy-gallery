import fetchPaintings from '@/lib/fetchPaintings';
import Image from 'next/image';

export default async function Gallery(): Promise<JSX.Element> {
  // const paintings = await fetchPaintings('https://api.artsy.net/api/artworks?total_count=1&size=50');

  return <h1>
    Gallery
  </h1>;
}
