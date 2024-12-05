"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-[1000] bg-background/95 backdrop-blur-md shadow-xl rounded-lg max-w-lg w-full mx-4 p-6 border border-accent/10"
        onClick={e => e.stopPropagation()}
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{project.name}</h2>
          <p className="text-gray-400">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            {new Date(project.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long'
            })}
          </p>
          <div className="flex justify-between items-center pt-4 border-t border-accent/10">
            <Link
              href={project.demoLink}
              target="_blank"
              className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-md hover:bg-blue-500/20 transition-colors"
            >
              Visit Project
            </Link>
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default ProjectModal;