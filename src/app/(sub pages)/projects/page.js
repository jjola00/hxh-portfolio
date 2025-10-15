import Image from "next/image";
import bg from "../../../../public/background/projects-background.png";
import ProjectList from "@/components/projects";
import { projectsData } from "../../data";

export const metadata = {
  title: "Projects",
};

export default function Home() {
  return (
    <main className="fixed inset-0 overflow-hidden">
      <Image
        src={bg}
        alt="Next.js Portfolio website's about page background image"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
        priority
        sizes="100vw"
      />

      <div className="absolute inset-0">
        <div className="w-full h-full relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <ProjectList projects={projectsData} />
          </div>
          
          {/* 3D model removed */}
        </div>
      </div>
    </main>
  );
}
