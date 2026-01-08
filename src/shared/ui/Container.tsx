import type { ReactNode } from "react";
import { cn } from "../utils/cn";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "container mx-auto px-6 md:px-12 lg:px-14 xl:px-16",
        className
      )}>
      {children}
    </div>
  );
}

export default Container;
