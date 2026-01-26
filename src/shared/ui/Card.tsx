import type { HTMLAttributes, ReactNode } from "react";

import { classNames } from "@/design-system";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const Card = ({ className, ...props }: CardProps) => (
  <div
    className={classNames(
      "border border-black bg-white shadow-[var(--ds-shadow-dense-xl)] p-6",
      className
    )}
    {...props}
  />
);
