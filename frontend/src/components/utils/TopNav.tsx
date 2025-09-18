import { motion } from "framer-motion";

const TopNav = () => {
  return (
    <motion.nav
      className="flex justify-between items-center px-10 py-5 font-martian fixed top-0 left-0 right-0 z-50 bg-transparent"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <motion.div
        className="text-sm font-semibold text-gray-800 tracking-wider"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        MOMENTS BY MOUD
      </motion.div>
    </motion.nav>
  );
};

export default TopNav;
