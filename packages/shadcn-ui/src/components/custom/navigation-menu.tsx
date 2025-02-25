import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../../components/ui/dropdown-menu';
import { cn } from '../../lib/utils';
import { Menu, X } from 'lucide-react';

export interface NavigationItem {
  label: string;
  href?: string;
  onClick?: () => void;
  items?: NavigationItem[];
}

export interface NavigationMenuProps {
  items: NavigationItem[];
  logo?: React.ReactNode;
  className?: string;
  direction?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  logo,
  className,
  direction = 'horizontal',
  children
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderItems = (navItems: NavigationItem[]) => {
    return navItems.map((item, index) => {
      if (item.items && item.items.length > 0) {
        return (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "flex items-center gap-1",
                  direction === 'vertical' && "w-full justify-start"
                )}
              >
                {item.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {item.items.map((subItem, idx) => (
                <DropdownMenuItem key={idx} asChild>
                  {subItem.href ? (
                    <a 
                      href={subItem.href}
                      className="w-full cursor-pointer"
                      onClick={subItem.onClick}
                    >
                      {subItem.label}
                    </a>
                  ) : (
                    <button 
                      onClick={subItem.onClick}
                      className="w-full text-left"
                    >
                      {subItem.label}
                    </button>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }

      return (
        <div key={index}>
          {item.href ? (
            <a
              href={item.href}
              onClick={item.onClick}
              className={cn(
                "block px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors",
                direction === 'vertical' && "w-full"
              )}
            >
              {item.label}
            </a>
          ) : (
            <Button 
              variant="ghost" 
              onClick={item.onClick}
              className={cn(
                direction === 'vertical' && "w-full justify-start"
              )}
            >
              {item.label}
            </Button>
          )}
        </div>
      );
    });
  };

  return (
    <nav className={cn("bg-background border-b", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {logo && <div className="flex-shrink-0">{logo}</div>}
            
            {/* Desktop menu */}
            <div className="hidden md:block ml-6">
              <div className={cn(
                "flex items-center space-x-4",
                direction === 'vertical' && "flex-col items-start space-x-0 space-y-2"
              )}>
                {renderItems(items)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            {children}
            
            {/* Mobile menu button */}
            <div className="md:hidden ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Main menu"
              >
                {mobileOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {renderItems(items)}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;