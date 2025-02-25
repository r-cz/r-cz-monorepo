import SimpleImage from './SimpleImage';

interface WorkExperienceItem {
  title: string;
  company: string;
  period: string;
  descriptions?: string[];
  logoPath: string;
  darkLogoPath?: string;
}

const workExperience: WorkExperienceItem[] = [
  {
    title: 'Senior Cybersecurity Engineer',
    company: 'Southwest',
    period: 'Aug 2018 - Present',
    descriptions: [
      'Building a modern Identity solution for 100M+ Southwest.com customers.',
      'Previously migrated a legacy login solution for the Enterprise to a new Identity Provider enabling 70,000+ employees with SSO and MFA across hundreds of onboarded applications.',
    ],
    logoPath: '/images/LUV.svg',
  },
  {
    title: 'Mac+ Technical Advisor',
    company: 'Apple',
    period: 'Jul 2016 - May 2018',
    descriptions: [
      'Provided technical support for all mobile and desktop Apple devices and related Apple Account and iCloud services',
    ],
    logoPath: '/images/apple-light.svg',
    darkLogoPath: '/images/apple-dark.svg',
  },
];

const WorkExperience = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Work Experience
      </h2>
      <div className="space-y-6">
        {workExperience.map((experience, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6
             hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
          >
            <div className="flex items-center gap-4 mb-4">
              <SimpleImage
                logoPath={experience.logoPath}
                darkLogoPath={
                  experience.darkLogoPath
                }
                alt={`${experience.company} logo`}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-xl font-semibold">
                  {experience.title}
                </h3>
                <p className="text-primary-600 dark:text-primary-400">
                  {experience.company}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {experience.period}
            </p>
            <div className="text-gray-600 dark:text-gray-300 space-y-2">
              {experience.descriptions?.map(
                (desc, descIndex) => (
                  <p key={descIndex}>{desc}</p>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;