import React from 'react';
import { Menu as MenuIcon, Mail, FileText, Linkedin, Wrench } from 'lucide-react';

// Import from the shadcn-ui package
import { 
  ShadcnButton, 
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  Separator
} from '@r-cz/shadcn-ui';

// Create a properly forwarded ref button component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof ShadcnButton>
>(({ children, ...props }, ref) => (
  <ShadcnButton ref={ref} {...props}>
    {children}
  </ShadcnButton>
));

Button.displayName = 'ButtonWithRef';

const HamburgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Menu">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>Ryan Cruz</SheetTitle>
          <SheetDescription>
            Navigation links and contact information
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <nav className="flex flex-col space-y-3">
            <SheetClose asChild>
              <a href="mailto:mail@ryancruz.com" className="flex items-center p-2 -ml-2 rounded-md hover:bg-muted">
                <Mail className="mr-2 h-5 w-5" />
                <span>Email</span>
              </a>
            </SheetClose>

            <SheetClose asChild>
              <a href="/Resume.pdf" target="_blank" className="flex items-center p-2 -ml-2 rounded-md hover:bg-muted">
                <FileText className="mr-2 h-5 w-5" />
                <span>Resume</span>
              </a>
            </SheetClose>

            <SheetClose asChild>
              <a href="https://linkedin.com/in/cruzryan" target="_blank" className="flex items-center p-2 -ml-2 rounded-md hover:bg-muted">
                <Linkedin className="mr-2 h-5 w-5" />
                <span>LinkedIn</span>
              </a>
            </SheetClose>

            <Separator className="my-2" />

            <SheetClose asChild>
              <a href="https://tools.ryancruz.com" target="_blank" className="flex items-center p-2 -ml-2 rounded-md hover:bg-muted">
                <Wrench className="mr-2 h-5 w-5" />
                <span>Tools</span>
              </a>
            </SheetClose>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;