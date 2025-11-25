import "./App.css";
import HeroSection from "./components/sections/HeroSection";
import GallerySection from "./components/sections/GallerySection";
import ActivitySection from "./components/sections/ActivitySection";
import TeamSection from "./components/sections/TeamSection";
import RecentShows from "./components/sections/RecentShows";

function App() {
  return (
    <>
      <HeroSection />
      <GallerySection />
      <ActivitySection />
      <RecentShows />
      <TeamSection />
    </>
  );
}

export default App;
