import Image from "next/image";
import bg from "../../../../public/background/about-background.png";
import RenderModel from "@/components/RenderModel";
import AboutDetails from "@/components/about";
import dynamic from "next/dynamic";
const Blimp = dynamic(() => import("@/components/models/Blimp"), {
  ssr: false,
});

export const metadata = {
  title: "About",
};

export default function Home() {
  return (
    <>
      <Image
        src={bg}
        priority
        sizes="100vw"
        alt="Next.js Portfolio website's about page background image"
        className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-50"
      />

      <div className="w-full h-3/5 xs:h-3/4 sm:h-screen sm:top-1/2 top-1/4 absolute -translate-y-1/2 left-0 z-10">
        <RenderModel>
          <Blimp />
        </RenderModel>
      </div>

      <div className="relative w-full h-[100vh] flex flex-col items-center justify-center">
        <div className="absolute flex flex-col items-center text-center top-1/2 sm:top-[60%] left-1/2 -translate-y-1/2 -translate-x-1/2">
          <h1 className="font-bold  text-6xl xs:text-7xl sm:text-8xl  lg:text-9xl text-blue-100">
            About Me
          </h1>
          <p className="font-light text-foreground text-lg mt-2">
            Meet the HxH fan behind this website
          </p>
        </div>
      </div>

      <AboutDetails />
    </>
  );
}
