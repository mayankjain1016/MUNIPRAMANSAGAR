import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import ScrollToTop from "./assets/components/ScrollToTop";
import HomePage from "./pages/HomePage";
import PravachanPage from "./pages/PravachanPage";
import NavinPravachanPage from "./pages/NavinPravachanPage";
import SwadhyayShrinkalaPage from "./pages/SwadhyayShrinkalaPage";
import SamastPravachanPage from "./pages/SamastPravachanPage";
import PravachanMalaPage from "./pages/PravachanMalaPage";
import ShankaSamadhanMainPage from "./pages/ShankaSamadhanMainPage";
import ShankaSamadhanAllClips from "./pages/ShankaSamadhanAllClips";
import ShankaSamadhanNewClips from "./pages/ShankaSamadhanNewClips";
import ShankaSamadhanPopularClips from "./pages/ShankaSamadhanPopularClips";
import ShankaSamadhanPage from "./pages/ShankaSamadhanPage";
import KahaniyaPage from "./pages/KahaniyaPage";
import BhavanaYogPage from "./pages/BhavanaYogPage";
import GalleryPage from "./pages/GalleryPage";
import EventDetailPage from "./pages/EventDetailPage";
import BooksPage from "./pages/BooksPage";
import NewsMediaPage from "./pages/NewsMediaPage";
import NewsArticle from "./pages/NewsArticle";
import GunayatanPage from "./pages/GunayatanPage";
import BiographyPage from "./pages/BiographyPage";
import ShankaSamadhanAnswerPage from "./pages/ShankaSamadhanAnswerPage";
import PathshalaPage from "./pages/PathshalaPage";
import JainSiddhantPage from "./pages/JainSiddhantPage";
import TirthankarPage from "./pages/TirthankarPage";
import MantraPage from "./pages/MantraPage";
import AartiPage from "./pages/AartiPage";
import VratParvPage from "./pages/VratParvPage";
import BachoKeLiyePage from "./pages/BachoKeLiyePage";
import YuvaPage from "./pages/YuvaPage";
import PrashnottariPage from "./pages/PrashnottariPage";
import PathshalaPravachanPage from "./pages/PathshalaPravachanPage";
import TirthankarDetailPage from "./pages/TirthankarDetailPage";
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
          <Route path="/shanka-samadhan" element={<ShankaSamadhanMainPage />} />
          <Route path="/shanka-samadhan/all-clips" element={<ShankaSamadhanAllClips />} />
          <Route path="/shanka-samadhan/new-clips" element={<ShankaSamadhanNewClips />} />
          <Route path="/shanka-samadhan/popular-clips" element={<ShankaSamadhanPopularClips />} />
          <Route path="/shanka-samadhan/all-questions" element={<ShankaSamadhanPage />} />
          <Route path="/shanka-samadhan/:slug" element={<ShankaSamadhanAnswerPage />} />
          <Route path="/shanka-samadhan/answer/:answerId" element={<ShankaSamadhanAnswerPage />} />
          <Route path="/kahaniya" element={<KahaniyaPage />} />
          <Route path="/bhavana-yog" element={<BhavanaYogPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/event/:eventId" element={<EventDetailPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/news-media" element={<NewsMediaPage />} />
          <Route path="/news/:id" element={<NewsArticle />} />
          <Route path="/gunayatan" element={<GunayatanPage />} />
          <Route path="/biography" element={<BiographyPage />} />
          <Route path="/pathshala" element={<PathshalaPage />} />
          <Route path="/pathshala/jain-siddhant" element={<JainSiddhantPage />} />
          <Route path="/pathshala/tirthankar" element={<TirthankarPage />} />
          <Route path="/pathshala/tirthankar/:slug" element={<TirthankarDetailPage />} />
          <Route path="/pathshala/mantra" element={<MantraPage />} />
          <Route path="/pathshala/aarti" element={<AartiPage />} />
          <Route path="/pathshala/vrat-parv" element={<VratParvPage />} />
          <Route path="/pathshala/baccho-ke-liye" element={<BachoKeLiyePage />} />
          <Route path="/pathshala/yuva" element={<YuvaPage />} />
          <Route path="/pathshala/prashnottari" element={<PrashnottariPage />} />
          <Route path="/pathshala/pravachan" element={<PathshalaPravachanPage />} />
        </Routes>
        <Footer />
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
      </div>
    </Router>
  );
}
