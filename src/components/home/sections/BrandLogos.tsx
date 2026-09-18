import Image from "next/image";

export type Brand = "elevate" | "keisha" | "shes_laser" | "parable" | "racknificent" | "jiggy";

const brandAssets: Record<Brand, { src: string; alt: string }> = {
  elevate: { src: "/elevate-logo.svg", alt: "ELEVATE" },
  keisha: { src: "/keisha-sharay-logo.svg", alt: "Keisha Sharay" },
  shes_laser: { src: "/shes-laser-esthetics-logo.svg", alt: "She's Laser & Esthetics" },
  parable: { src: "/parable-logo.svg", alt: "parable Skate Co." },
  racknificent: { src: "/racknificent-logo.svg", alt: "Racknificent LLC" },
  jiggy: { src: "/jiggy-jerky-wordmark.svg", alt: "Jiggy Jerky" },
};

export function BrandMark({
  brand,
  light = false,
  className = "",
}: {
  brand: Brand;
  light?: boolean;
  className?: string;
}) {
  const asset = brandAssets[brand];

  return (
    <Image
      src={asset.src}
      alt={light ? "" : asset.alt}
      width={1010}
      height={404}
      className={`block object-contain ${light ? "brightness-0 invert" : ""} ${
        className || "h-auto w-full max-h-9 sm:max-h-11"
      }`}
    />
  );
}

const brands: Brand[] = ["elevate", "keisha", "shes_laser", "parable", "racknificent", "jiggy"];

export function BrandLogos() {
  return (
    <div
      aria-label="Businesses that trust Retailo"
      className="mt-10 w-full grid grid-cols-3 items-center justify-items-center gap-x-6 gap-y-8 sm:mt-12 sm:grid-cols-6 sm:gap-x-10 lg:gap-x-14"
    >
      {brands.map((brand) => (
        <div
          key={brand}
          className="flex h-16 sm:h-20 w-full items-center justify-center"
        >
          <BrandMark
            brand={brand}
            className="h-10 sm:h-14 lg:h-16 w-auto max-w-full"
          />
        </div>
      ))}
    </div>
  );
}
