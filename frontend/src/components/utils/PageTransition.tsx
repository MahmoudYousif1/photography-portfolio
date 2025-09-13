import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(false);
    const timer = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="fixed inset-0 bg-black z-[100]"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.6,
              ease: [0.7, 0, 0.24, 1],
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PageTransition;
