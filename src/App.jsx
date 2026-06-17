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
import ShankaSamadhanClipsPage from "./pages/ShankaSamadhanClipsPage";
import ShankaSamadhanPage from "./pages/ShankaSamadhanPage";
import SahityaPage from "./pages/SahityaPage";
import SantKiAdalatPage from "./pages/SantKiAdalatPage";
import BhavanaYogPage from "./pages/BhavanaYogPage";
import GalleryPage from "./pages/GalleryPage";
import GalleryDetailPage from "./pages/GalleryDetailPage";
import EventDetailPage from "./pages/EventDetailPage";
import BooksPage from "./pages/BooksPage";
import NewsMediaPage from "./pages/NewsMediaPage";
import NewsArticle from "./pages/NewsArticle";
import GunayatanPage from "./pages/GunayatanPage";
import BiographyPage from "./pages/BiographyPage";
import ShankaSamadhanAnswerPage from "./pages/ShankaSamadhanAnswerPage";4
import PathshalaPage from "./pages/PathshalaPage"

// Admin imports
import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./admin/pages/AdminLogin";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import LocationManagement from "./admin/pages/LocationManagement";
import EventManagement from "./admin/pages/EventManagement";
import NewsManagement from "./admin/pages/NewsManagement";
import GalleryManagement from "./admin/pages/GalleryManagement";
import PravachanManagement from "./admin/pages/PravachanManagement";
import ShankaSamadhanManagement from "./admin/pages/ShankaSamadhanManagement";
import SahityaManagement from "./admin/pages/SahityaManagement";
import PathshalaManagement from "./admin/pages/PathshalaManagement";
import SantKiAdalatManagement from "./admin/pages/SantKiAdalatManagement";
import BiographyManagement from "./admin/pages/BiographyManagement";
import DiscipleManagement from "./admin/pages/DiscipleManagement";
import BookManagement from "./admin/pages/BookManagement";
import HomepageManagement from "./admin/pages/HomepageManagement";

import Footer from "./assets/components/Footer";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="homepage" element={<HomepageManagement />} />
            <Route path="biography" element={<BiographyManagement />} />
            <Route path="disciples" element={<DiscipleManagement />} />
            <Route path="books" element={<BookManagement />} />
            <Route path="location" element={<LocationManagement />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="news" element={<NewsManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="pravachan" element={<PravachanManagement />} />
            <Route path="shanka-samadhan" element={<ShankaSamadhanManagement />} />
            <Route path="sahitya" element={<SahityaManagement />} />
            <Route path="pathshala" element={<PathshalaManagement />} />
            <Route path="sant-ki-adalat" element={<SantKiAdalatManagement />} />
          </Route>

          {/* Public Routes */}
          <Route
            path="*"
            element={
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
                  <Route path="/shanka-samadhan/clips" element={<ShankaSamadhanClipsPage />} />
                  <Route path="/shanka-samadhan/all-questions" element={<ShankaSamadhanPage />} />
                  <Route path="/shanka-samadhan/:slug" element={<ShankaSamadhanAnswerPage />} />
                  <Route path="/shanka-samadhan/answer/:answerId" element={<ShankaSamadhanAnswerPage />} />
                  <Route path="/sahitya" element={<SahityaPage />} />
                  <Route path="/sant-ki-adalat" element={<SantKiAdalatPage />} />
                  <Route path="/bhavana-yog" element={<BhavanaYogPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/gallery/:id" element={<GalleryDetailPage />} />
                  <Route path="/event/:eventId" element={<EventDetailPage />} />
                  <Route path="/books" element={<BooksPage />} />
                  <Route path="/news-media" element={<NewsMediaPage />} />
                  <Route path="/news/:id" element={<NewsArticle />} />
                  <Route path="/gunayatan" element={<GunayatanPage />} />
                  <Route path="/biography" element={<BiographyPage />} />
                  <Route path="/pathshala" element={<PathshalaPage />} />


                </Routes>
                <Footer />
                <button
                  className="back-to-top"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  aria-label="Back to top"
                >
                  ↑
                </button>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
