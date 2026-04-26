import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import ScrollToTop from "./assets/components/ScrollToTop";
import HomePage from "./pages/HomePage";
import PravachanPage from "./pages/PravachanPage";
import NavinPravachanPage from "./pages/NavinPravachanPage";
import SwadhyayShrinkalaPage from "./pages/SwadhyayShrinkalaPage";
import SamastPravachanPage from "./pages/SamastPravachanPage";
import PravachanMalaPage from "./pages/PravachanMalaPage";
import ShankaSamadhanPage from "./pages/ShankaSamadhanPage";
import KahaniyaPage from "./pages/KahaniyaPage";
import BhavanaYogPage from "./pages/BhavanaYogPage";
import GalleryPage from "./pages/GalleryPage";
import EventDetailPage from "./pages/EventDetailPage";
import BooksPage from "./pages/BooksPage";
import NewsMediaPage from "./pages/NewsMediaPage";
import BiographyPage from "./pages/BiographyPage";
import Footer from "./assets/components/Footer";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pravachan" element={<PravachanPage />} />
          <Route path="/pravachan/navin" element={<NavinPravachanPage />} />
          <Route path="/pravachan/swadhyay" element={<SwadhyayShrinkalaPage />} />
          <Route path="/pravachan/samast" element={<SamastPravachanPage />} />
          <Route path="/pravachan/mala" element={<PravachanMalaPage />} />
          <Route path="/shanka-samadhan" element={<ShankaSamadhanPage />} />
          <Route path="/kahaniya" element={<KahaniyaPage />} />
          <Route path="/bhavana-yog" element={<BhavanaYogPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/event/:eventId" element={<EventDetailPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/news-media" element={<NewsMediaPage />} />
          <Route path="/biography" element={<BiographyPage />} />
        </Routes>
        <Footer />
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
      </div>
    </Router>
  );
}
