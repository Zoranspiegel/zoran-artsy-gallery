import type { PaintingType } from '@/models/Paintings';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Painting.module.css';

export default function Painting({
  painting
}: {
  painting: PaintingType;
}): JSX.Element {
  const paintingWidth = 300;
  const paintingHeightRatio =
    painting.dimensions.in.height / painting.dimensions.in.width;
  const paintingHeight = Math.ceil(paintingWidth * paintingHeightRatio);
  const paintingHeightSpan = Math.ceil(paintingHeight / 10) + 5;

  const fontSize = Math.max(0.8, Math.min(40 / painting.title.length, 1.5));

  return (
    <div
      className={styles.painting__container}
      style={{ gridRow: `span ${paintingHeightSpan}` }}
    >
      <Link href={painting._links.permalink.href} target="_blank">
        <Image
          src={painting._links.image.href.replace('{image_version}', 'larger')}
          width={paintingWidth}
          height={paintingHeight}
          alt={painting.slug}
          sizes="500px"
        />
      </Link>
      <h3
        className={styles.painting__title}
        style={{ fontSize: `${fontSize}rem` }}
      >
        {painting.title}
      </h3>
    </div>
  );
}
