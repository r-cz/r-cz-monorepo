import * as React from "react"

import { cn } from "../../lib/utils"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  centered?: boolean
  padding?: boolean
}

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      maxWidth = "xl",
      centered = true,
      padding = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          maxWidthClasses[maxWidth],
          centered && "mx-auto",
          padding && "px-4 sm:px-6 lg:px-8",
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container }