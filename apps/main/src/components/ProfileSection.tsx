import { useMemo } from 'react';
import ProgressiveImage from './ProgressiveImage';
import ProfileDialog from './ProfileDialog';
import { Avatar, AvatarImage, AvatarFallback } from '@r-cz/shadcn-ui';

interface ProfileImage {
  avif: string;
  png: string;
}

const ProfileSection = () => {
  // Calculate years of experience from August 2018 to current date
  const yearsOfExperience = useMemo(() => {
    const startDate = new Date(2018, 7); // Month is 0-based, so 7 is August
    const currentDate = new Date();

    // Calculate the difference in years
    let years =
      currentDate.getFullYear() -
      startDate.getFullYear();

    // Adjust for partial years
    if (
      currentDate.getMonth() <
      startDate.getMonth() ||
      (currentDate.getMonth() ===
        startDate.getMonth() &&
        currentDate.getDate() <
        startDate.getDate())
    ) {
      years--;
    }

    return years;
  }, []);

  const profileImage: ProfileImage = {
    avif: '/images/Profile.avif',
    png: '/images/Profile.png',
  };

  return (
    <section className="text-center mb-12">
      <div className="mb-6">
        <div className="w-32 h-32 mx-auto mb-4">
          <ProfileDialog>
            <button className="rounded-full overflow-hidden transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              <Avatar className="w-32 h-32">
                <AvatarImage 
                  src={profileImage.png} 
                  alt="Profile"
                  className="object-cover" 
                />
                <AvatarFallback className="text-3xl">RC</AvatarFallback>
              </Avatar>
            </button>
          </ProfileDialog>
        </div>
        <h1 className="text-4xl font-bold mb-2">
          Ryan Cruz
        </h1>
        <p className="text-lg text-muted-foreground">
          Identity Engineer
        </p>
      </div>

      <p className="max-w-2xl mx-auto text-muted-foreground whitespace-pre-line">
        {`Cybersecurity Engineer with ${yearsOfExperience} years of experience. Currently building a CIAM solution for `}
        <a
          href="https://www.southwest.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Southwest Airlines
        </a>
        {`. Working hybrid from `}
        <a
          href="https://www.google.com/maps/place/Dallas,+TX"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Dallas, Texas
        </a>
        {`.`}
      </p>
    </section>
  );
};

export default ProfileSection;