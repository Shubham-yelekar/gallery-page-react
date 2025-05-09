import React from 'react'
import { motion } from 'motion/react';
import { PiInstagramLogoFill } from "react-icons/pi";

const Card = ({ photo, onClick }) => {
  const { user, urls } = photo;
  return (
    <motion.div onClick={onClick} className="relative group cursor-zoom-in">
      <div className="absolute opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4 text-white hover:bg-linear-to-b from-neutral-900/20 to-neutral-900/50 w-full h-full transition-all duration-300">
        <h5 className="font-bold">{user.name}</h5>
        <div className="text-sm flex items-center gap-1">{user.instagram_username}<span><PiInstagramLogoFill /></span></div>
      </div>
      <motion.img layoutId={photo.id} src={urls.regular} alt="" />
    </motion.div>
  );
}

export default Card