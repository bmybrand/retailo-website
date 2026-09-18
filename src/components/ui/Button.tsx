import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "lime";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white hover:bg-[#084538] shadow-[0_8px_20px_rgba(11,92,72,0.25)]",
  outline:
    "border border-brand bg-transparent text-brand hover:bg-brand/5",
  ghost: "text-zinc-700 hover:bg-zinc-100",
  lime: "bg-brand-lime text-brand-dark hover:bg-[#d6f58a]",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
