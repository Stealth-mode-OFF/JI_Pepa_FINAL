import type { ReactNode } from "react";

import { PageContainer, PageSection } from "@/shared/layouts";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export const Container = ({ children, className }: ContainerProps) => (
  <PageContainer className={className}>{children}</PageContainer>
);

export const Section = ({ children, className, id }: SectionProps) => (
  <PageSection id={id || undefined} className={className}>
    {children}
  </PageSection>
);
