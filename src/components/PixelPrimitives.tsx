import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";

type PixelButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;
type PixelLinkButtonProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>;
type PixelCardProps = PropsWithChildren<HTMLAttributes<HTMLElement> & {
  as?: "article" | "div";
}>;
type PixelPanelProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
type PixelSectionHeadingProps = {
  afterDescription?: ReactNode;
  className?: string;
  description: string;
  kicker: string;
  side?: ReactNode;
  title: string;
};
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

export function PixelCard({ as = "div", className, children, ...props }: PixelCardProps) {
  const Component = as;

  return (
    <Component className={cx("pixel-card", className)} {...props}>
      {children}
    </Component>
  );
}

export function PixelLinkButton({ className, children, ...props }: PixelLinkButtonProps) {
  return (
    <a className={cx("pixel-button", className)} {...props}>
      {children}
    </a>
  );
}

export function PixelPanel({ className, children, ...props }: PixelPanelProps) {
  return (
    <div className={cx("pixel-panel", className)} {...props}>
      {children}
    </div>
  );
}

export function PixelSectionHeading({
  afterDescription,
  className,
  description,
  kicker,
  side,
  title,
}: PixelSectionHeadingProps) {
  return (
    <div className={cx("section-heading", side ? "section-heading--with-character" : undefined, className)}>
      <div>
        <p className="pixel-kicker">{kicker}</p>
        <h2 className="pixel-title">{title}</h2>
        <p>{description}</p>
        {afterDescription}
      </div>
      {side}
    </div>
  );
}

export function PixelTag({ className, children, variant = "default" }: PixelTagProps) {
  return (
    <span className={cx(variant === "mini" ? "mini-tag" : "pixel-tag", className)}>
      {children}
    </span>
  );
}
