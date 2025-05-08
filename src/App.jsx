import "./App.css";
import { easeInOut, motion, useAnimate, stagger } from "motion/react";
import { Gallery } from "./components";
import ControlBar from "./components/ControlBar";
import { useEffect } from "react";

function App() {
  const [scope, animate] = useAnimate();
  const text = "GALLERY";

  useEffect(() => {
    startAnimating();
  }, []);

  const startAnimating = () => {
    animate(
      "span",
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      },
      {
        duration: 0.4,
        ease: "easeInOut",
        delay: stagger(0.06),
      }
    );
  };

  return (
    <>
      <div className="p-2">
        <motion.h1
          ref={scope}
          className="text-[86px] md:text-[110px] lg:text-[160px]  leading-[96%] tracking-[-6px] "
        >
          {text.split("").map((letter, index) => (
            <motion.span
              key={letter + index}
              style={{
                opacity: 0,
                filter: "blur(10px)",
                y: 40,
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
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
