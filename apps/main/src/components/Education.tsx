import SimpleImage from './SimpleImage';
import { Card, CardContent } from '@r-cz/shadcn-ui';

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
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
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
                                    <p className="text-primary">
                                        {edu.degree}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                                {edu.period}
                            </p>
                            <div className="text-foreground space-y-2">
                                {edu.descriptions?.map(
                                    (desc, descIndex) => (
                                        <p key={descIndex}>{desc}</p>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Education;