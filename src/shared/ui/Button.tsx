import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "@/design-system";

type BaseProps = {
  children: ReactNode;
  className?: string;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & BaseProps;

export const Button = ({ className, ...props }: ButtonProps) => (
  <button className={classNames("inline-flex items-center justify-center", className)} {...props} />
);

export type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & BaseProps;

export const ButtonLink = ({ className, ...props }: ButtonLinkProps) => (
  <a className={classNames("inline-flex items-center justify-center", className)} {...props} />
);
