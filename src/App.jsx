import "./App.css";
import { motion } from "motion/react";
function App() {
  return (
    <>
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
      >
        Gallery
      </motion.h1>
    </>
  );
}

export default App;
