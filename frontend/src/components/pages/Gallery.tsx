import BottomNav from "../utils/BottomNav";
import TopNav from "../utils/TopNav";

const Gallery = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-['Martian Mono']">
      <TopNav />
      <h1 className="text-4xl mb-8 font-['Martian Mono']">Gallery</h1>
      <BottomNav />
    </div>
  );
};

export default Gallery;
