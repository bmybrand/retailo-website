import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/#home" className={`inline-flex items-center ${className}`}>
      <Image
        src="/retailo-logo.svg"
        alt="retailo"
        width={137}
        height={39}
        className="h-9 w-auto sm:h-11"
      />
    </Link>
  );
}
