type PixelImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Set when the asset renders wider than its native size. Source art tops out
   * at 1672px, so the hero and feature band upscale on large monitors — without
   * this the browser interpolates and the pixel art turns to mush.
   */
  pixelated?: boolean;
  /** Hero art only: skip lazy-loading so it does not delay LCP. */
  priority?: boolean;
  className?: string;
  sizes?: string;
};

/**
 * A plain <img>, on purpose.
 *
 * The build is a static export with images.unoptimized, so next/image would
 * render the same markup while adding a wrapper and a client runtime. Explicit
 * width/height preserve the intrinsic ratio and keep CLS at zero.
 */
export function PixelImage({
  src,
  alt,
  width,
  height,
  pixelated = false,
  priority = false,
  className = "",
  sizes,
}: PixelImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      className={[pixelated ? "pixelated" : "", className].filter(Boolean).join(" ")}
    />
  );
}
