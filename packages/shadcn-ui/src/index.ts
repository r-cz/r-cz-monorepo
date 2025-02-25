// Export wrapper components using namespace imports
import * as ButtonWrapper from './wrappers/Button';
import * as CardWrapper from './wrappers/Card';
import * as ContainerWrapper from './wrappers/Container';
import * as FooterWrapper from './wrappers/Footer';
import * as HeaderWrapper from './wrappers/Header';
import * as LayoutWrapper from './wrappers/Layout';
import * as ThemeToggleWrapper from './wrappers/ThemeToggle';

// Export them with the original names
export const Button = ButtonWrapper.Button;
export const Card = CardWrapper.Card;
export const CardHeader = CardWrapper.CardHeader;
export const CardContent = CardWrapper.CardContent;
export const CardFooter = CardWrapper.CardFooter;
export const Container = ContainerWrapper.Container;
export const Footer = FooterWrapper.Footer;
export const Header = HeaderWrapper.Header;
export const Layout = LayoutWrapper.Layout;
export const ThemeToggle = ThemeToggleWrapper.ThemeToggle;

// Re-export types
export type { ButtonProps } from './wrappers/Button';
export type { CardProps } from './wrappers/Card';
export type { ContainerProps } from './wrappers/Container';
export type { FooterProps } from './wrappers/Footer';
export type { HeaderProps } from './wrappers/Header';
export type { LayoutProps } from './wrappers/Layout';
export type { ThemeToggleProps } from './wrappers/ThemeToggle';

// Export shadcn/ui components with prefixes to avoid conflicts
export {
  Button as ShadcnButton,
  buttonVariants,
} from './components/ui/button';

export {
  Card as ShadcnCard,
  CardHeader as ShadcnCardHeader,
  CardFooter as ShadcnCardFooter,
  CardTitle as ShadcnCardTitle,
  CardDescription as ShadcnCardDescription,
  CardContent as ShadcnCardContent,
} from './components/ui/card';

export {
  Toggle,
  toggleVariants,
} from './components/ui/toggle';

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/ui/dialog';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './components/ui/dropdown-menu';

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from './components/ui/avatar';

export {
  Separator
} from './components/ui/separator';

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from './components/ui/tabs';

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from './components/ui/accordion';

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './components/ui/sheet';

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from './components/ui/tooltip';

// Export utilities
export { cn } from './lib/utils';

// Note: CSS is imported directly in the apps