import React from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const ControlBar = () => {
  return (
    <div className="px-2 py-4 flex justify-between items-center">
      <div className="flex gap-2 ">
        <button className="h-[40px] px-4 p-2 bg-neutral-800 text-neutral-100 rounded-3xl border border-neutral-900 cursor-pointer">
          All
        </button>
        <button className="h-[40px] px-4 py-2 bg-neutral-100 rounded-3xl border border-neutral-300 hover:border-neutral-800 transition-all duration-300 cursor-pointer">
          Name
        </button>
      </div>
      <div className="relative h-[40px]  p-2 flex items-center bg-neutral-100 border-1 border-neutral-300 rounded-4xl">
        <input
          className="px-4 transition-all ease-in-out duration-400 focus:outline-none"
          type="text"
          placeholder="Search"
        />
        <HiMiniMagnifyingGlass className="absolute right-2" size={22} />
      </div>
    </div>
  );
};

export default ControlBar;
