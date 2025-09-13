import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const getLinks = () => {
    switch (location.pathname) {
      case "/":
        return [
          { to: "/gallery", label: "GALLERY" },
          { to: "/about", label: "ABOUT" },
        ];
      case "/gallery":
      case location.pathname.startsWith("/gallery/") && location.pathname:
        return [
          { to: "/", label: "HOME" },
          { to: "/about", label: "ABOUT" },
        ];
      case "/about":
        return [
          { to: "/", label: "HOME" },
          { to: "/gallery", label: "GALLERY" },
        ];
      default:
        return [
          { to: "/", label: "HOME" },
          { to: "/gallery", label: "GALLERY" },
        ];
    }
  };

  const LINKS = getLinks();

  return (
    <motion.nav
      className="flex items-center px-10 py-5 fixed bottom-0 right-0 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <div className="flex gap-8">
        {LINKS.map(({ to, label }) => (
          <Link key={to} to={to}>
            <motion.div
              className="text-sm text-gray-800 font-medium tracking-wider hover:text-gray-600 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
