import { ProfileSection } from "@/components/profile-section";
import { WorkExperience } from "@/components/work-experience";
import { Education } from "@/components/education";

export default function Home() {
  return (
    <div className="container max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <ProfileSection />
      <WorkExperience />
      <Education />
    </div>
  );
}
