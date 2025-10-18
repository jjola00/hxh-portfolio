"use client";

import Link from 'next/link';
import Image from 'next/image';

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'mvp':
        return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'ongoing':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'pre-seed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'on hold':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'in progress':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="group relative flex w-full">
      {/* Image Container - Left Side */}
      <div className="relative w-1/2 aspect-video bg-black/20 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <Image
          src={project.imageUrl}
          alt={`${project.title} demo`}
          fill
          className="object-cover transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:scale-105"
          onError={() => {
            // Fallback handled by Next.js Image component
          }}
        />
        {/* Hover overlay with link icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content - Right Side */}
      <div className="w-1/2 p-6 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Title */}
          <h3 className="text-l sm:text-xl md:text-2xl mb-1 font-semibold" style={{color: '#FEFE5B'}}>
            {project.title}
          </h3>

          {/* Description */}
          <p className="font-light text-sm md:text-base text-gray-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Bottom Section - Status and Link */}
        <div className="space-y-4 mt-6">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Status:</span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>

          {/* Demo Link */}
          <Link
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-md hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-300 text-sm font-medium border border-blue-500/20 hover:border-blue-500/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Demo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
