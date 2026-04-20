import BookBanner from "../assets/components/BookBanner";
import ShankhaSearch from "../assets/components/ShankhaSearch";
import HeroSlider from "../assets/components/HeroSlider";
import QuickLinks from "../assets/components/QuickLinks";
import EventsAndNews from "../assets/components/EventsAndNews";
import Gallery from "../assets/components/Gallery";
import TrendingVideos from "../assets/components/TrendingVideos";
import ShankaSamadhan from "../assets/components/ShankaSamadhan";
import Subscribe from "../assets/components/Subscribe";

export default function HomePage() {
  return (
    <main>
      {/* <BookBanner /> */}
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
