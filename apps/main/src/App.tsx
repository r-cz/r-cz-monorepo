import { useTheme } from '@r-cz/theme';
import { Button, Layout } from '@r-cz/ui';

function App() {
  const [themeState, setThemeState] = useTheme();

  const toggleTheme = () => {
    setThemeState(prev => ({
      isDark: !prev.isDark,
      source: 'user'
    }));
  };

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Ryan Cruz</h1>
        <p className="text-xl mb-8">Personal Website</p>
        <p className="mb-4">This is a placeholder for the main site in the monorepo structure.</p>
        <div className="flex justify-center space-x-4">
          <Button 
            variant="primary" 
            onClick={() => window.open('https://tools.ryancruz.com', '_blank')}
          >
            Visit Tools Site
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default App;