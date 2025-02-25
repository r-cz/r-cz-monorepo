import React from 'react';
import { Menu as MenuIcon } from 'lucide-react';
import { Button } from '@r-cz/shadcn-ui';

const HamburgerMenu = () => {
  const openContactMenu = () => {
    const menu = document.createElement('div');
    menu.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onclick="this.parentElement.parentElement.remove()"></div>
        <div class="fixed z-50 w-full max-w-md rounded-lg bg-background p-6 shadow-lg sm:rounded-lg" role="dialog">
          <div class="flex flex-col space-y-4">
            <h2 class="text-lg font-semibold">Contact</h2>
            <div class="space-y-2">
              <a href="mailto:mail@ryancruz.com" class="flex items-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path><path d="m3 7 9 6 9-6"></path></svg>
                Email
              </a>
              <a href="/Resume.pdf" target="_blank" class="flex items-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><line x1="10" x2="8" y1="9" y2="9"></line></svg>
                Resume
              </a>
              <a href="https://linkedin.com/in/cruzryan" target="_blank" class="flex items-center text-primary">
                <svg width="16" height="16" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" class="mr-2 fill-current"><path d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"></path></svg>
                LinkedIn
              </a>
            </div>
            <a href="https://tools.ryancruz.com" target="_blank" class="flex items-center text-primary mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              Tools
            </a>
            <button class="mt-4 bg-muted text-foreground py-2 rounded-md" onclick="this.closest('[role=dialog]').parentElement.parentElement.remove()">Close</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(menu);
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={openContactMenu}
      aria-label="Menu"
    >
      <MenuIcon className="h-5 w-5" />
    </Button>
  );
};

export default HamburgerMenu;