import type { PaintingType } from '@/models/Paintings';
import Image from 'next/image';
import Link from 'next/link';

export default function Painting({
  painting
}: {
  painting: PaintingType;
}): JSX.Element {
  const paintingWidth = 500;
  const paintingHeightRatio =
    painting.dimensions.in.height / painting.dimensions.in.width;
  const paintingHeight = Math.ceil(paintingWidth * paintingHeightRatio);
  return (
    <div>
      <Link href={painting._links.permalink.href} target="_blank">
        <Image
          src={painting._links.image.href.replace('{image_version}', 'larger')}
          width={paintingWidth}
          height={paintingHeight}
          alt={painting.slug}
          sizes="500px"
        />
      </Link>
    </div>
  );
}
