import Image from "next/image";
import bg from "../../../../public/background/contact-background.png";
import RenderModel from "@/components/RenderModel";
import Form from "@/components/contact/Form";
import dynamic from "next/dynamic";
const Computer = dynamic(() => import("@/components/models/Computer"), {
  ssr: false,
});

export const metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <>
      <Image
        src={bg}
        alt="Next.js Portfolio website's contact page background image"
        priority
        sizes="100vw"
        className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-50"
      />

      <div className="w-full h-3/5 xs:h-3/4 sm:h-screen sm:top-1/2 top-1/4 absolute -translate-y-1/2 left-0 z-10">
        <RenderModel>
          <Computer />
        </RenderModel>
      </div>

      <article className="relative w-full flex flex-col items-center justify-center py-8 sm:py-0 space-y-8">
        <div className="flex flex-col items-center justify-center space-y-6 w-full sm:w-3/4">
          <h1 className="text-blue-200 font-semibold text-center text-4xl capitalize">
          Contact Me
          </h1>
          <p className="text-center font-light text-sm xs:text-base">
            If you have any questions or would like to discuss a project, feel free to reach out.
          </p>
        </div>
        <Form />
      </article>
    </>
  );
}
