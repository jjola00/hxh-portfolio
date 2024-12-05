import ItemLayout from "./ItemLayout";
import Link from "next/link";
import Image from "next/image";

const AboutDetails = () => {
  return (
    <section className="w-full bg-gradient-to-r ">
      <div className="grid grid-cols-12 gap-4 xs:gap-6  md:gap-8 w-full">
        <ItemLayout
          className={
            " col-span-full lg:col-span-8 row-span-2 flex-col items-start"
          }
        >
          <h2 className="text-xl md:text-2xl text-left w-full capitalize">
            Nen Architect
          </h2>
          <p className="font-light text-xs sm:text-sm md:text-base">
            My journey in web development is akin to a Hunter’s quest, seeking 
            to master the digital landscape with every challenge. Armed with the
            powerful Nen abilities of JavaScript, I navigate the web with precision,
            creating intricate, dynamic websites like a seasoned Hunter would track their target.
            React.js and Next.js are my weapons of choice, allowing me to craft portals (websites)
            that bridge the worlds of users and data.
          </p>
          <p className="font-light mt-2 text-xs sm:text-sm md:text-base">
            But my quest doesn’t stop there. On the backend, I wield the strengths of Python,
            Java, and Golang, using each to forge powerful and efficient systems that support
            my digital creations. These languages are like different Nen abilities, each with
            its own strengths, allowing me to build fast, scalable, and reliable applications.
          </p>
          <p className="font-light mt-2 text-xs sm:text-sm md:text-base">
            Just as a Hunter learns to adapt, I employ the mystical arts of the Jamstack to create 
            fast, secure, and seamless user experiences. Every creation is not just functional but 
            visually captivating, much like a well-executed Nen technique. With each line of code,
            I’m continually evolving, honing my skills to push the limits of what’s possible on 
            the web. Join me on this adventure as I explore new technologies and strive to unlock 
            the hidden potential of the digital world.
          </p>
        </ItemLayout>

        <ItemLayout
          className={" col-span-full xs:col-span-6 lg:col-span-4 text-white"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            10+ <sub className="font-semibold text-base">projects</sub>
          </p>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full xs:col-span-6 lg:col-span-4 text-white"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            2+{" "}
            <sub className="font-semibold text-base">years of experience</sub>
          </p>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full sm:col-span-6 md:col-span-4 !p-0"}
        >
          <Image
            className="w-full h-auto"
            src={`${process.env.NEXT_PUBLIC_GITHUB_STATS_URL}/api/top-langs?username=slocksert&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false`}
            alt="slocksert"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-8 !p-0"}>
          <Image
            className="w-full h-auto"
            src={`${process.env.NEXT_PUBLIC_GITHUB_STATS_URL}/api?username=slocksert&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false`}
            alt="slocksert"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full"}>
          <Image
            className="w-full h-auto"
            src={`https://skillicons.dev/icons?i=appwrite,aws,babel,bootstrap,cloudflare,css,d3,docker,figma,firebase,gatsby,git,github,graphql,html,ipfs,js,jquery,kubernetes,linux,mongodb,mysql,netlify,nextjs,nodejs,npm,postgres,react,redux,replit,sass,supabase,tailwind,threejs,vercel,vite,vscode,yarn`}
            alt="slocksert"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <Image
            className="w-full h-auto"
            src={`${process.env.NEXT_PUBLIC_GITHUB_STREAK_STATS_URL}?user=slocksert&theme=dark&hide_border=true`}
            alt="slocksert"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <Link
            href="https://github.com/slocksert/rdict"
            target="_blank"
            className="w-full"
          >
            <Image
              className="w-full h-auto"
              src={`${process.env.NEXT_PUBLIC_GITHUB_STATS_URL}/api/pin/?username=slocksert&repo=rdict&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false&description_lines_count=2`}
              alt="slocksert"
              loading="lazy"
            />
          </Link>
        </ItemLayout>
      </div>
    </section>
  );
};

export default AboutDetails;
