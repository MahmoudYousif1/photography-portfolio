import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getCachedImageUrl } from "../utils/APIcalls";
import TopNav from "../utils/TopNav";
import BottomNav from "../utils/BottomNav";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
    },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const FEATURED_IMAGES = [
  { id: 12, category: "people" },
  { id: 55, category: "abstract" },
  { id: 101, category: "landscapes" },
];

const CATEGORIES = [
  { name: "PEOPLE", path: "/people" },
  { name: "ABSTRACT", path: "/abstract" },
  { name: "LANDSCAPES", path: "/landscapes" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <TopNav />

      <motion.div
        className="flex flex-col items-center px-5"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-sm font-medium tracking-[3px] text-gray-800 mb-5 text-center font-['Martian_Mono']"
          variants={fadeUp}
        >
          MOMENTS BY MOUD
        </motion.h1>

        <div className="flex flex-col gap-5 max-w-4xl w-full">
          {FEATURED_IMAGES.map(({ id, category }) => (
            <Link key={id} to={`/${category}`}>
              <motion.div
                className="overflow-hidden rounded"
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={getCachedImageUrl(id)}
                  alt={`Featured ${category} photography`}
                  loading="lazy"
                  className="w-full h-22 object-cover filter grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
                />
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.nav
          className="flex justify-center gap-16 pt-8"
          variants={fadeUp}
        >
          {CATEGORIES.map(({ name, path }) => (
            <Link key={name} to={path}>
              <motion.div
                className="text-sm text-gray-800 tracking-[2px] font-medium hover:text-gray-600 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {name}
              </motion.div>
            </Link>
          ))}
        </motion.nav>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Home;
