import React, { useEffect } from 'react';
import { useTheme } from '@r-cz/theme';
import { Layout, Footer } from '@r-cz/ui';
import ProfileSection from './components/ProfileSection';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';
import HamburgerMenu from './components/HamburgerMenu';
import { ThemeToggle } from '@r-cz/ui';

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="relative max-w-4xl mx-auto">
        <div className="fixed top-4 left-4 z-50">
          <HamburgerMenu />
        </div>
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        
        <ProfileSection />
        <WorkExperience />
        <Education />
      </div>
    </Layout>
  );
}

export default App;