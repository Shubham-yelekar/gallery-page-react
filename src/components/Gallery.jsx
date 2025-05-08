import { div, img, li } from "motion/react-client";
import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";

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

  useEffect(() => {
    unsplash.search
      .getPhotos({
        query: "illustration",
        color: "yellow",
        page: 1,
        per_page: 20,
      })
      .then((result) => {
        // setImages(result.response.results);
        const photos = result.response?.results || [];
        setImages(photos);
        console.log(photos);
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

  return (
    <>
      {images.length < 0 ? (
        <div className="h-[60vh] flex items-center justify-center ">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-200 fill-neutral-800"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="flex w-full">
          {columnsData.map((column, columnId) => (
            <div key={columnId} className=" break-inside-avoid">
              {column.map((img) => (
                <li key={img.id} className="list-none">
                  <Card photo={img} />
                </li>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const Card = ({ photo }) => {
  const { user, urls } = photo;
  return (
    <div key={photo.key} className="relative group cursor-zoom-in">
      <div className="absolute opacity-0 group-hover:opacity-100 flex items-end justify-start p-4 text-white hover:bg-linear-to-b from-neutral-900/20 to-neutral-900/50 w-full h-full transition-all duration-300">
        {user.name}
      </div>
      <img src={urls.regular} alt="" />
    </div>
  );
};

export default Gallery;
