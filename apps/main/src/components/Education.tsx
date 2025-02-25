import SimpleImage from './SimpleImage';

interface EducationItem {
    school: string;
    degree: string;
    period: string;
    descriptions?: string[];
    logoPath: string;
    darkLogoPath?: string;
}

const education: EducationItem[] = [
    {
        school: 'University of Georgia',
        degree: 'Bachelor of Computer Systems Engineering',
        period: '2014 - 2018',
        descriptions: [
            'Zell Miller Scholarship',
            'Presidential Scholar',
            'Certificate in Emerging Engineering Leaders Development Program',
        ],
        logoPath: '/images/uni.svg',
    },
];

const Education = () => {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Education
            </h2>
            <div className="space-y-6">
                {education.map((edu, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6
             hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <SimpleImage
                                logoPath={edu.logoPath}
                                alt={`${edu.school} logo`}
                                className="w-12 h-12 object-contain"
                            />
                            <div>
                                <h3 className="text-xl font-semibold">
                                    {edu.school}
                                </h3>
                                <p className="text-primary-600 dark:text-primary-400">
                                    {edu.degree}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            {edu.period}
                        </p>
                        <div className="text-gray-600 dark:text-gray-300 space-y-2">
                            {edu.descriptions?.map(
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

export default Education;