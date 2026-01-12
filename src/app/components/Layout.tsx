import React from "react";
import clsx from "clsx";

export const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={clsx("max-w-[1329px] mx-auto px-6 md:px-12 w-full", className)}>{children}</div>
);

export const Section = ({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={clsx("py-20 md:py-32", className)}>{children}</section>
);
