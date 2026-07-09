import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from "react";

type PixelButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;
type PixelLinkButtonProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>;
type PixelTagProps = PropsWithChildren<{
  className?: string;
  variant?: "default" | "mini";
}>;

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function PixelButton({ className, children, ...props }: PixelButtonProps) {
  return (
    <button className={cx("pixel-button", className)} {...props}>
      {children}
    </button>
  );
}

export function PixelLinkButton({ className, children, ...props }: PixelLinkButtonProps) {
  return (
    <a className={cx("pixel-button", className)} {...props}>
      {children}
    </a>
  );
}

export function PixelTag({ className, children, variant = "default" }: PixelTagProps) {
  return (
    <span className={cx(variant === "mini" ? "mini-tag" : "pixel-tag", className)}>
      {children}
    </span>
  );
}
