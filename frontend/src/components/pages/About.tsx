import TopNav from "../utils/TopNav";
import BottomNav from "../utils/BottomNav";

const About = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-['Martian Mono']">
            <TopNav />
            <h1 className="text-4xl mb-8 font-['Martian Mono']">About</h1>
            <BottomNav />
        </div>
    );
}

export default About;