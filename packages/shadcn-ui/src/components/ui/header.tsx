import * as React from "react"

import { cn } from "../../lib/utils"
import { Container } from "./container"
import { ThemeToggle } from "../theme-toggle"

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  logo?: React.ReactNode
  showThemeToggle?: boolean
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      className,
      title,
      logo,
      showThemeToggle = true,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          "bg-background border-b border-border py-4",
          className
        )}
        {...props}
      >
        <Container>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {logo && <div>{logo}</div>}
              {title && (
                <h1 className="text-xl font-semibold">{title}</h1>
              )}
              {children && <div className="ml-6">{children}</div>}
            </div>
            
            {showThemeToggle && <ThemeToggle />}
          </div>
        </Container>
      </header>
    )
  }
)
Header.displayName = "Header"

export { Header }