import BookBanner from "../components/BookBanner";
import ShankhaSearch from "../components/ShankhaSearch";
import HeroSlider from "../components/HeroSlider";
import QuickLinks from "../components/QuickLinks";
import EventsAndNews from "../components/EventsAndNews";
import Gallery from "../components/Gallery";
import TrendingVideos from "../components/TrendingVideos";
import ShankaSamadhan from "../components/ShankaSamadhan";
import Subscribe from "../components/Subscribe";

export default function HomePage() {
  return (
    <main>
      <BookBanner />
      <ShankhaSearch />
      <HeroSlider />
      <QuickLinks />
      <EventsAndNews />
      <Gallery />
      <TrendingVideos />
      <ShankaSamadhan />
      <Subscribe />
    </main>
  );
}
