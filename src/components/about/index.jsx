/* eslint-disable @next/next/no-img-element */
import ItemLayout from "./ItemLayout";
import Link from "next/link";
import MusicSection from "./MusicSection";
import InfiniteCarousel from "./InfiniteCarousel";

// Technology logos data
const technologyLogos = [
  { name: 'React', logo: '/technologies/React.png', alt: 'React' },
  { name: 'JavaScript', logo: '/technologies/JavaScript.png', alt: 'JavaScript' },
  { name: 'TypeScript', logo: '/technologies/TypeScript.png', alt: 'TypeScript' },
  { name: 'Python', logo: '/technologies/Python.jpg', alt: 'Python' },
  { name: 'Java', logo: '/technologies/Java.png', alt: 'Java' },
  { name: 'C++', logo: '/technologies/Cpp.png', alt: 'C++' },
  { name: 'SQL', logo: '/technologies/SQL.png', alt: 'SQL' },
  { name: 'GitHub', logo: '/technologies/Github.png', alt: 'GitHub' }
];

// Company logos data
const companyLogos = [
  { name: 'ISE', logo: '/experience/ISE.jpeg', alt: 'ISE' },
  { name: 'Puzz', logo: '/experience/Puzz.jpeg', alt: 'Puzz' },
  { name: 'Patch', logo: '/experience/Patch.jpeg', alt: 'Patch' },
  { name: 'Dogpatch Labs', logo: '/experience/Dogpatch_Labs.jpeg', alt: 'Dogpatch Labs' },
  { name: 'Talio', logo: '/experience/Talio.jpeg', alt: 'Talio' },
  { name: 'DevEire', logo: '/experience/Deveire.jpeg', alt: 'DevEire' }
];

const AboutDetails = () => {
  return (
    <section className="w-full bg-gradient-to-r ">
      {/* Technology Carousel - ABOVE intro */}
      <div className="mb-8 sm:mb-12">
        <InfiniteCarousel 
          items={technologyLogos} 
          direction="left"
          speed={20}
        />
      </div>
      
      <div className="grid grid-cols-12 gap-4 xs:gap-6  md:gap-8 w-full">
        <ItemLayout
          className={
            " col-span-full lg:col-span-8 row-span-2 flex-col items-start"
          }
        >
          <h2 className="text-xl md:text-2xl text-left w-full capitalize">
            Software Developer @ ISE
          </h2>
          <p className="font-light text-xs sm:text-sm md:text-base">
            I’m a software developer with experience across full-stack engineering and early-stage product building. I’ve worked with technologies like React, TypeScript, Node.js, Java, and Python, building everything from multiplayer web apps to AI-driven tools. I enjoy turning ideas into real products, whether that’s creating Puzz, an online party game platform, or building StableWise, a show-horse marketplace MVP powered by data scraping and AI summaries.
          </p>
          <p className="font-light mt-2 text-xs sm:text-sm md:text-base">
            I’ve gained practical experience through roles at DevEire, Dogpatch Labs, Patch, and Talio, where I contributed to frontend development, backend features, automation tools and early product direction. I focus on usability, performance and delivering features that make an impact.
          </p>
        </ItemLayout>

        <ItemLayout
          className={" col-span-full xs:col-span-6 lg:col-span-4 text-white"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            8+ <sub className="font-semibold text-base">technologies</sub>
          </p>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full xs:col-span-6 lg:col-span-4 text-white"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            1+{" "}
            <sub className="font-semibold text-base">year of experience</sub>
          </p>
        </ItemLayout>
      </div>

      {/* Company Carousel - BELOW intro section */}
      <div className="mt-8 sm:mt-12 mb-8 sm:mb-12">
        <InfiniteCarousel 
          items={companyLogos} 
          direction="right"
          speed={18}
        />
      </div>

      <div className="grid grid-cols-12 gap-4 xs:gap-6  md:gap-8 w-full">
        <ItemLayout
          className={"col-span-full sm:col-span-6 md:col-span-4 !p-0"}
        >
          <img
            className="w-full h-auto"
            src={`${process.env.NEXT_PUBLIC_GITHUB_STATS_URL}/api/top-langs?username=jjola00&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false`}
            alt="jjola00"
            width={400}
            height={300}
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-8 !p-0"}>
          <div className="relative">
            <img
              className="w-full h-auto"
              src={`https://github-readme-activity-graph.vercel.app/graph?username=jjola00&theme=react-dark&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&line=FEFE5B&point=FFFFFF&area=true&area_color=1F2937`}
              alt="jjola00"
              width={800}
              height={300}
              loading="lazy"
            />
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
              Last 30 Days
            </div>
          </div>
        </ItemLayout>

        <ItemLayout className={"col-span-full"}>
          <img
            className="w-full h-auto"
            src={`https://skillicons.dev/icons?i=appwrite,aws,babel,bootstrap,cloudflare,css,d3,docker,figma,firebase,gatsby,git,github,graphql,html,ipfs,js,jquery,kubernetes,linux,mongodb,mysql,netlify,nextjs,nodejs,npm,postgres,react,redux,replit,sass,supabase,tailwind,threejs,vercel,vite,vscode,yarn`}
            alt="jjola00"
            width={1200}
            height={100}
            loading="lazy"
          />
        </ItemLayout>


        {/* Music Section */}
        <ItemLayout className={"col-span-full !p-4"}>
          <MusicSection />
        </ItemLayout>
      </div>
    </section>
  );
};

export default AboutDetails;
