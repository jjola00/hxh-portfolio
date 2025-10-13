"use client";

import Image from "next/image";

const ProfileImage = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center h-full ${className}`}>
      <Image
        src="/pfp.png"
        alt="Profile"
        width={384}
        height={384}
        className="w-96 h-96 rounded-full animate-float mx-auto drop-shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow duration-300"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))'
        }}
        priority
      />
    </div>
  );
};

export default ProfileImage;
