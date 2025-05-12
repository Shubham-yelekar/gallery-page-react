import React, {useContext, useEffect, useRef, useState } from "react";
import { createApi } from "unsplash-js";
import { motion, AnimatePresence } from "motion/react";
import Card from "./Card";
import { useQuery } from "./QueryContext";

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
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const cardRef = useRef();
  const observerRef = useRef(null);

  const { query } = useQuery()

  // Fetching
  const fetchImages =(page)=>{
    setLoading(true)
    unsplash.search.getPhotos({
        query: query.search || undefined,
        color: query.color || undefined,
        page,
        perPage: 10, // Fetch 10 images per page
      })
      .then((result) => {
        const photos = result.response?.results || [];
        setImages((prev) => {
          const uniquePhotos = [...prev, ...photos].filter(
            (photo, index, self) => self.findIndex((p) => p.id === photo.id) === index
          );
          return uniquePhotos;
        });
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching
      });
  }

  useEffect(() => {
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

  useEffect(()=>{
    fetchImages(page, query)
  }, [page, query])

  useEffect(()=>{
    const observer = new IntersectionObserver((entries)=>{
      const [entry] = entries
      // console.log(entry);
      if (entry.isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1); // Increment page when sentinel is visible
      }
      
    }, {root:null, rootMargin: "0px", threshold: 0.5 } )

    if (observerRef.current) {
      observer.observe(observerRef.current); // Observe the sentinel element
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current); // Cleanup observer
      }
    };
  }, [loading])

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
    // console.log(img);
  };

  return (
    <>
      {images.length === 0 && !loading ? (
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
              {column.map((img, index) => (
                <motion.li
                  variants={cardVariants}
                  className="list-none"
                  key={`${img.id}-${index}`}
                >
                  <Card photo={img} onClick={() => handleCardClick(img)} />
                </motion.li>
              ))}
            </motion.div>
          ))}
        </div>
      )}
      {loading && (
        <div  className="text-center py-4">
          <span>Loading more images...</span>
        </div>
      )}
      <div ref={observerRef} className="h-20"></div>
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
