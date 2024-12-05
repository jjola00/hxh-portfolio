import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

const ProjectButton = ({ x, y, ...project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="absolute cursor-pointer z-50"
        style={{ transform: `translate(${x}, ${y})` }}
      >
        <motion.div
          variants={item}
          onClick={() => setIsModalOpen(true)}
          className="text-foreground rounded-full flex items-center justify-center custom-bg"
          role="button"
          tabIndex={0}
        >
          <span className="relative w-28 h-28 p-4 animate-spin-slow-reverse group-hover:pause hover:text-blue-200 flex items-center justify-center">
            <span className="text-base font-medium text-center px-2">{project.name}</span>
            <span className="peer bg-transparent absolute top-0 left-0 w-full h-full" />
            <span className="absolute hidden peer-hover:block px-3 py-2 left-full mx-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-sm rounded-md shadow-lg whitespace-nowrap text-center">
              Click to get more info
            </span>
          </span>
        </motion.div>
      </div>

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={project}
      />
    </>
  );
};

export default ProjectButton;