import React, { useEffect, useRef, useState } from "react";
import { createApi } from "unsplash-js";
import { motion, AnimatePresence } from "motion/react";
import Card from "./Card";

const getColumns = (items, columnCount) => {
  const cols = Array.from({ length: columnCount }, () => []);
  items.forEach((item, i) => {
    cols[i % columnCount].push(item);
  });
  return cols;
};

const unsplash = createApi({
  accessKey: import.meta.env.VITE_API_UNSPLASH_ACCESS_KEY,
});

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [columns, setColumns] = useState(4);
  const [isModelOpen, setModelOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const cardRef = useRef();

  // Fetching
  useEffect(() => {
    unsplash.photos
      .list({
        page: 1,
        perPage: 20,
      })
      .then((result) => {
        // setImages(result.response.results);
        const photos = result.response?.results || [];
        setImages(photos);
      })
      .catch((error) => {
        console.log("something went wrong!");
        console.log(error);
      });

    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(2);
      else if (width < 1024) setColumns(3);
      else setColumns(4);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);
  const columnsData = getColumns(images, columns);

  // Animation
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleCardClick = (img) => {
    setCurrentImage(img);
    setModelOpen(true);
    console.log(img);
  };

  return (
    <>
      {images.length === 0 ? (
        <div className="h-[60vh] flex items-center justify-center ">
          ...loading
        </div>
      ) : (
        <div className="flex w-full">
          {columnsData.map((column, columnId) => (
            <motion.div
              ref={cardRef}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              key={columnId}
              className=" break-inside-avoid"
            >
              {column.map((img) => (
                <motion.li
                  variants={cardVariants}
                  className="list-none"
                  key={img.id}
                >
                  <Card photo={img} onClick={() => handleCardClick(img)} />
                </motion.li>
              ))}
            </motion.div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {isModelOpen && currentImage ? (
          <motion.div
            className="fixed top-0 left-0 z-10 h-full w-full flex items-center justify-center bg-neutral-900/60"
            onClick={() => setModelOpen(false)}
          >
            {/* <Card /> */}
            <motion.img
              layoutId={currentImage.id}
              src={currentImage.urls.regular}
              alt=""
              className="h-full"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};



export default Gallery;
