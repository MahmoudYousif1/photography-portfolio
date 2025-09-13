import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { preloadAllImagesWithProgress } from "./APIcalls";

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Loading...");
  const [show, setShow] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        await preloadAllImagesWithProgress((loaded, total, percentage) => {
          setProgress(percentage);
          setStatus(`Loading images... ${loaded}/${total}`);
        });

        await document.fonts.ready;

        setProgress(100);
        setStatus("Ready!");

        setTimeout(() => {
          setShow(false);
          setTimeout(onComplete, 1000);
        }, 600);
      } catch (error) {
        console.error("Loading error:", error);
        setShow(false);
        setTimeout(onComplete, 500);
      }
    };

    load();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 font-['Martian Mono']"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center">
            <div className="w-64 h-1 bg-gray-200 rounded-full mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gray-800 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="text-sm text-gray-500 tracking-[1px] mt-2">
              {status}
            </div>
          </div>

          <div className="fixed bottom-8 right-8 text-9xl font-bold tracking-[3px] text-[#1a1a1a]">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
