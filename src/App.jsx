import "./App.css";
import { motion } from "motion/react";
import { Gallery } from "./components";
import ControlBar from "./components/ControlBar";
function App() {
  return (
    <>
      <div className="p-2">
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="text-[86px] md:text-[110px] lg:text-[160px]  leading-[96%] tracking-[-6px] "
        >
          GALLERY
        </motion.h1>
      </div>
      <div className="w-full h-0.5 bg-gray-100"></div>
      <ControlBar />
      <div className="w-full h-0.5 bg-gray-100"></div>
      <Gallery />
    </>
  );
}

export default App;
