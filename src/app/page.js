import Image from "next/image";
import bg from "/public/background/home-background.png";
import RenderModel from "@/components/RenderModel";
import Netero from "@/components/models/Netero";
import Navigation from "@/components/navigation";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between relative">
        <Image src={bg}
        fill
        className="-z-50 object-cover object-center w-full h-full opacity-25"
        alt="background"/>

        <div className="w-full h-screen">
          <Navigation/>
          <RenderModel>
            <Netero />
          </RenderModel>
        </div>

      </div>
    </>
  );
}
