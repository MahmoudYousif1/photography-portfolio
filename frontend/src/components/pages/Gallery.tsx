import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  getCachedImageUrl,
  fetchAllPhotos,
  fetchPhotoById,
} from "../utils/APIcalls";
import BottomNav from "../utils/BottomNav";

interface Photo {
  id: number;
  title?: string;
}

const Gallery = () => {
  const [columns, setColumns] = useState<Photo[][]>([[], [], []]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollY } = useScroll();
  const springConfig = { stiffness: 100, damping: 30 };

  const y = [
    useSpring(
      useTransform(scrollY, (value) => value * -0.15),
      springConfig
    ),
    useSpring(
      useTransform(scrollY, (value) => value * -0.25),
      springConfig
    ),
    useSpring(
      useTransform(scrollY, (value) => value * -0.6),
      springConfig
    ),
  ];

  useEffect(() => {
    fetchAllPhotos()
      .then(async (photos) => {
        const photosWithMetadata = await Promise.all(
          photos.map(async (photo: Photo) => {
            try {
              const metadata = await fetchPhotoById(photo.id);
              return { id: photo.id, title: metadata.title };
            } catch (error) {
              console.error(
                `Failed to fetch metadata for photo ${photo.id}:`,
                error
              );
              return { id: photo.id, title: `Photo ${photo.id}` };
            }
          })
        );

        const cols: Photo[][] = [[], [], []];
        photosWithMetadata.forEach((photo: Photo, i: number) => {
          cols[i % 3].push(photo);
        });
        setColumns(cols);
        setTimeout(() => setIsLoaded(true), 1000);
      })
      .catch(console.error);
  }, []);

  const getRandomPosition = () => ({
    x: (Math.random() - 0.5) * 600,
    y: (Math.random() - 0.5) * 600,
    rotate: (Math.random() - 0.5) * 30,
  });

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-8">
          {columns.map((column, colIndex) => (
            <motion.div key={colIndex} style={{ y: y[colIndex] }}>
              {column.map((photo, photoIndex) => {
                const globalIndex = colIndex + photoIndex * 3;
                const pageTransitionDelay = 0.5;
                const staggerDelay = pageTransitionDelay + globalIndex * 0.08;
                const randomPos = getRandomPosition();

                return (
                  <motion.div
                    key={photo.id}
                    className="mb-4 overflow-hidden group cursor-pointer relative"
                    initial={{
                      opacity: 0,
                      scale: 0.3,
                      x: randomPos.x,
                      y: randomPos.y,
                      rotate: randomPos.rotate,
                    }}
                    animate={
                      isLoaded
                        ? {
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            y: 0,
                            rotate: 0,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.8,
                      delay: staggerDelay,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      scale: {
                        type: "spring",
                        damping: 15,
                        stiffness: 100,
                      },
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <motion.img
                      src={getCachedImageUrl(photo.id)}
                      alt=""
                      className="w-full h-auto object-cover"
                      loading="lazy"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 1.2,
                        delay: staggerDelay + 0.7,
                      }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.5 },
                      }}
                    />

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 text-white px-3 py-0 m-0 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: staggerDelay + 0.8,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-white">
                          {photo.id}
                        </span>
                        <span className="text-sm font-medium">
                          {photo.title || `Photo ${photo.id}`}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Gallery;
