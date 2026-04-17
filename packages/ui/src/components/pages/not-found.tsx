import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface NotFoundProps extends ComponentProps<"div"> {
  error?: string;
  title?: string;
  content?: string;
}

export function NotFound({
  error = "404 Not Found",
  title = "Page not found",
  content = "Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist",
  className,
  ...props
}: NotFoundProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-md text-center">
        <p className="text-xl font-semibold text-destructive">{error}</p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-base text-muted-foreground">{content}</p>
      </div>
    </div>
  );
}
