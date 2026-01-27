import type { ReactNode } from "react";

import { classNames } from "@/design-system";

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

type SectionProps = LayoutProps & {
  id?: string;
};

export const PageContainer = ({ children, className }: LayoutProps) => (
  <div className={classNames("max-w-[1329px] mx-auto px-6 md:px-12 w-full", className)}>
    {children}
  </div>
);

export const PageSection = ({ id, children, className }: SectionProps) => (
  <section id={id} className={classNames("py-20 md:py-32 scroll-mt-24", className)}>
    {children}
  </section>
);
