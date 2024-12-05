"use client";
import { motion } from "framer-motion";
import ProjectButton from "./ProjectButton";
import useScreenSize from "../hooks/useScreenSize";
import ResponsiveComponent from "../ResponsiveComponent";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 1.5,
    },
  },
};

const ProjectList = ({ projects }) => {
  const angleIncrement = 360 / projects.length;

  return (
    <ResponsiveComponent>
      {({ size }) => {
        const isLarge = size >= 1024;
        const isMedium = size >= 768;

        return (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-max flex items-center justify-center relative hover:pause animate-spin-slow group z-50"
          >
            {projects.map((project, index) => {
              const angleRad = (index * angleIncrement * Math.PI) / 180;
              const radius = isLarge
                ? "calc(20vw - 1rem)"
                : isMedium
                ? "calc(30vw - 1rem)"
                : "calc(40vw - 1rem)";
              const x = `calc(${radius}*${Math.cos(angleRad)})`;
              const y = `calc(${radius}*${Math.sin(angleRad)})`;

              return <ProjectButton key={project.id} x={x} y={y} {...project} />;
            })}
          </motion.div>
        );
      }}
    </ResponsiveComponent>
  );
};

export default ProjectList;