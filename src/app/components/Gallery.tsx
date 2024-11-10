import fetchPaintings from '@/lib/fetchPaintings';
import Painting from './Painting';

export default async function Gallery(): Promise<JSX.Element> {
  const paintings = await fetchPaintings(
    'https://api.artsy.net/api/artworks?total_count=1&size=50'
  );

  if (!paintings?._embedded.artworks.length) return <h1>No Paintings Found</h1>;

  return (
    <div>
      {paintings._embedded.artworks.map((painting) => (
        <Painting key={painting.id} painting={painting} />
      ))}
    </div>
  );
}
