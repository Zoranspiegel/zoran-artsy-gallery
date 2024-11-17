'use client';
import fetchPaintings from '@/lib/fetchPaintings';
import Painting from './Painting';
import { PaintingType } from '@/models/Paintings';
import { useEffect, useRef, useState } from 'react';
import styles from './Gallery.module.css';

export default function Gallery(): JSX.Element {
  const [paintings, setPaintings] = useState<PaintingType[]>([]);
  const [page, setPage] = useState(50);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  async function getPaintings() {
    setLoading(true);

    const response = await fetchPaintings(
      `https://api.artsy.net/api/artworks?total_count=1&size=50&offset=${page}`
    );
    if (response?._embedded.artworks.length) {
      setPaintings((prevPaintings) => [
        ...prevPaintings,
        ...response?._embedded.artworks
      ]);
    }

    setLoading(false);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 50);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    getPaintings();
  }, [page]);

  if (!paintings.length && loading) return <h1 className={styles.loading}>Loading...</h1>;
  // if (!paintings.length && !loading) return <h1>No Paintings Found</h1>;

  return (
    <>
      <div className={styles.gallery__container}>
        {paintings.map((painting) => (
          <Painting key={painting.id} painting={painting} />
        ))}
      </div>
      <div className={styles.observer} ref={observerRef}>{loading && <h1 className={styles.loading}>Loading...</h1>}</div>
    </>
  );
}
