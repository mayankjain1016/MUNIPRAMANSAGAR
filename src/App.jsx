import Navbar from "./components/Navbar";
import BookBanner from "./components/BookBanner";
import ShankhaSearch from "./components/ShankhaSearch";
import HeroSlider from "./components/HeroSlider";
import QuickLinks from "./components/QuickLinks";
import LocationEvents from "./components/LocationEvents";
import LatestNews from "./components/LatestNews";
import Gallery from "./components/Gallery";
import TrendingVideos from "./components/TrendingVideos";
import ShankaSamadhan from "./components/ShankaSamadhan";
import Subscribe from "./components/Subscribe";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="app-wrapper">
      <div className="phone-frame">
        <Navbar />
        <main className="main-content">
          <BookBanner />
          <ShankhaSearch />
          <HeroSlider />
          <QuickLinks />
          <LocationEvents />
          <LatestNews />
          <Gallery />
          <TrendingVideos />
          <ShankaSamadhan />
          <Subscribe />
          <Footer />
        </main>
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >↑</button>
      </div>
    </div>
  );
}