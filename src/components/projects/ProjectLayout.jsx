import { motion } from "framer-motion";
import Link from "next/link";

const item = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};

const ProjectLink = motion.create(Link);
const ProjectLayout = ({ name, description, date, demoLink }) => {
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <ProjectLink
      variants={item}
      href={demoLink}
      target={"_blank"}
      className=" text-sm md:text-base flex  items-center justify-between w-full relative rounded-lg overflow-hidden p-4 md:p-6 custom-bg select-none"
    >
      <div className="flex items-center justify-center space-x-2">
        <h2 className="text-red-500">{name}</h2>
        <p className="text-foreground hidden sm:inline-block text-gray-400">{description}</p>
      </div>
      <div className="self-end flex-1 mx-2 mb-1 bg-transparent border-b border-dashed border-muted" />
      <p className="text-muted sm:text-foreground">
        {formatDate(date)}
      </p>
    </ProjectLink>
  );
};

export default ProjectLayout;
