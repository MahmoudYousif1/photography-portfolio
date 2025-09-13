import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Gallery from "./components/pages/Gallery";
import About from "./components/pages/About";
import Loader from "./components/utils/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader onComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:category" element={<Gallery />} />
          <Route path="/about" element={<About />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
