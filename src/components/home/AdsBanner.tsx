interface AdsBannerProps {
  mobileImage: string;
  tabletImage: string;
  desktopImage: string;
  alt?: string;
}

export default function AdsBanner({
  mobileImage,
  tabletImage,
  desktopImage,
  alt = "Advertisement",
}: AdsBannerProps) {
  return (
    <div className="-mx-4 sm:mx-0">
      <picture>
        <source media="(min-width: 1024px)" srcSet={desktopImage} />
        <source media="(min-width: 640px)" srcSet={tabletImage} />
        <img
          src={mobileImage}
          alt={alt}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </picture>
    </div>
  );
}
