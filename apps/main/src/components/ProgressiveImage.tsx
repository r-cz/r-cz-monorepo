interface ProgressiveImageProps {
  avifSrc: string;
  pngSrc: string;
  alt: string;
  className?: string;
}

const ProgressiveImage = ({
  avifSrc,
  pngSrc,
  alt,
  className,
}: ProgressiveImageProps) => {
  return (
    <picture>
      <source type="image/avif" srcSet={avifSrc} />
      <img
        src={pngSrc}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};

export default ProgressiveImage;