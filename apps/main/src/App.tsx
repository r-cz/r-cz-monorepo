import React, { useEffect } from 'react';
import { useTheme } from '@r-cz/theme';
import { Layout, Footer } from '@r-cz/ui';
import ProfileSection from './components/ProfileSection';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';
import HamburgerMenu from './components/HamburgerMenu';

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout
      header={{
        title: 'Ryan Cruz',
        showThemeToggle: true
      }}
      footer={{
        links: [
          { label: 'Tools', href: 'https://tools.ryancruz.com', external: true },
          { label: 'GitHub', href: 'https://github.com/r-cz', external: true },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/cruzryan', external: true }
        ]
      }}
    >
      <div className="relative max-w-4xl mx-auto">
        <div className="fixed top-4 left-4 z-50">
          <HamburgerMenu />
        </div>
        
        <ProfileSection />
        <WorkExperience />
        <Education />
      </div>
    </Layout>
  );
}

export default App;