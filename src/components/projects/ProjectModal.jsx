import { motion } from "framer-motion";
import Link from "next/link";

const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-background p-6 rounded-lg max-w-md w-full m-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{project.name}</h2>
        <p className="text-sm mb-4">{project.description}</p>
        <p className="text-sm text-gray-400 mb-4">Date: {project.date}</p>
        <div className="flex justify-between">
          <Link
            href={project.demoLink}
            target="_blank"
            className="text-blue-400 hover:text-blue-300"
          >
            Visit Project
          </Link>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;