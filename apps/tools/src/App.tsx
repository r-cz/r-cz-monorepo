import { useTheme } from '@r-cz/theme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

function App() {
  const [themeState, setThemeState] = useTheme();

  const toggleTheme = () => {
    setThemeState(prev => ({
      isDark: !prev.isDark,
      source: 'user'
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full px-4 py-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={themeState.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {themeState.isDark ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
        </div>
        
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Developer Tools</h1>
          <p className="text-xl mb-8">Ryan Cruz</p>
          <p className="mb-4">This is a placeholder for the tools site in the monorepo structure.</p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://ryancruz.com" 
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
            >
              Visit Main Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;