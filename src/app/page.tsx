/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [profiles, setProfiles] = useState([
    { id: 1, name: 'John Doe', age: 28, job: 'Software Developer', image: '/image.jpg' },
    { id: 2, name: 'Jane Smith', age: 25, job: 'UX Designer', image: '/image.jpg' },
    { id: 3, name: 'Mike Johnson', age: 30, job: 'Data Scientist', image: '/image.jpg' },
  ]);
  const [currentProfile, setCurrentProfile] = useState(0);

  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    if (swipeDirection === 'right') {
      console.log('🚀Liked profile:', profiles[currentProfile].name);
    } else {
      console.log('🚀Passed on profile:', profiles[currentProfile].name);
    }
    setDirection(swipeDirection);
    setTimeout(() => {
      setProfiles(prevProfiles => {
        const newProfiles = prevProfiles.filter((_, index) => index !== currentProfile);
        setCurrentProfile(0);
        return newProfiles;
      });
      setDirection(null);
    }, 300);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-64 h-80 shadow-lg rounded-lg">
        {profiles.length > 0 && profiles
          .slice(currentProfile, profiles.length)
          .map((profile, index) => (
            <motion.div
              key={profile.id}
              drag={index === 0 ? "x" : false} 
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={index === 0 ? (e, { offset }) => {
                const swipe = offset.x;
                if (swipe < -140) {
                  handleSwipe('left');
                } else if (swipe > 140) {
                  handleSwipe('right');
                }
              } : undefined}
              className={`absolute w-full h-full bg-white shadow-lg rounded-lg cursor-grab active:cursor-grabbing`}
              style={{
                zIndex: profiles.length - index, 
                transform: `scale(${1 - index * 0.05}) translateY(${index * 15}px)`,
                opacity: index === 0 ? 1 : 0.8,
              }}
            >
              <div className={`relative w-full h-full shadow-lg rounded-lg`}>
                <Image
                  src={profile.image}
                  alt={`${profile.name}'s profile`}
                  layout="fill"
                  objectFit="cover"
                  draggable="false"
                  style={{ userSelect: 'none' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h2 className="text-white text-xl font-bold">
                    {profile.name}, {profile.age}
                  </h2>
                    <p className="text-white text-sm">{profile.job}</p>
                </div>
              </div>
            </motion.div>
          ))}
        {profiles.length === 0 && <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>No profiles found</div>}
      </div>
    </div>
  );
}
