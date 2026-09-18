type ImagePlaceholderProps = {
  label?: string;
  className?: string;
};

export function ImagePlaceholder({
  label = "Image",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-zinc-200/80 text-center text-xs font-medium tracking-wide text-zinc-500 ${className}`}
    >
      {label}
    </div>
  );
}
