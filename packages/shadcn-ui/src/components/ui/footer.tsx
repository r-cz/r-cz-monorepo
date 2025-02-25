import * as React from "react"

import { cn } from "../../lib/utils"
import { Container } from "./container"

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  copyright?: string
  links?: Array<{
    label: string
    href: string
    external?: boolean
  }>
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      copyright = `© ${new Date().getFullYear()} Ryan Cruz`,
      links = [],
      children,
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "bg-background border-t border-border py-6",
          className
        )}
        {...props}
      >
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground">{copyright}</p>
            </div>
            
            {links.length > 0 && (
              <div className="flex space-x-4">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
            
            {children && <div className="mt-4 md:mt-0">{children}</div>}
          </div>
        </Container>
      </footer>
    )
  }
)
Footer.displayName = "Footer"

export { Footer }