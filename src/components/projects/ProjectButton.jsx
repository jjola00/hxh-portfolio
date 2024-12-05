import Link from "next/link";
import { motion } from "framer-motion";

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

const NavLink = motion(Link);

const ProjectButton = ({ x, y, name, description, demoLink }) => {
  return (
    <div
      className="absolute cursor-pointer z-50"
      style={{ transform: `translate(${x}, ${y})` }}
    >
      <NavLink
        variants={item}
        href={demoLink}
        target="_blank"
        className="text-foreground rounded-full flex items-center justify-center custom-bg"
        aria-label={name}
      >
        <span className="relative w-28 h-28 p-4 animate-spin-slow-reverse group-hover:pause hover:text-blue-200 flex items-center justify-center">
          <span className="text-base font-medium text-center px-2">{name}</span>
          <span className="peer bg-transparent absolute top-0 left-0 w-full h-full" />
          <span className="absolute hidden peer-hover:block px-3 py-2 left-full mx-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-sm rounded-md shadow-lg whitespace-nowrap text-center">
            {description}
          </span>
        </span>
      </NavLink>
    </div>
  );
};

export default ProjectButton;