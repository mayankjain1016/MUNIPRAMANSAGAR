import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../assets/components/VideoCard';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function KahaniyaPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/kahaniya`);
      setVideos(data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FAFAFA", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{ 
              fontWeight: 800, 
              color: "#333333",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" }
            }}
          >
            कहानियाँ
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: "#757575",
              fontWeight: 400,
              maxWidth: "700px",
              mx: "auto"
            }}
          >
            जैन धर्म की प्रेरक कहानियाँ - बच्चों के लिए सरल और रोचक
          </Typography>
        </Box>

        <Box 
          sx={{ 
            backgroundColor: "#FFF8E1", 
            borderRadius: "16px", 
            p: 3, 
            mb: 6,
            border: "1px solid rgba(230, 81, 0, 0.2)",
            textAlign: "center"
          }}
        >
          <Typography variant="body1" sx={{ color: "#E65100", fontWeight: 600, mb: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
            <MenuBookIcon /> जैन धर्म को सरल तरीके से समझें
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            ये कहानियाँ बच्चों को अहिंसा, सत्य, अपरिग्रह और जैन संस्कृति की गहरी शिक्षा देती हैं
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: "grid",
            gridTemplateColumns: { 
              xs: "1fr", 
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)"
            },
            gap: { xs: 3, md: 4 },
            mb: 6
          }}
        >
          {loading ? (
            <Typography>Loading...</Typography>
          ) : videos.length === 0 ? (
            <Typography>No videos available</Typography>
          ) : (
            videos.map((video) => (
              <VideoCard
                key={video._id}
                title={video.title}
                description={video.description}
                videoId={video.videoId}
                youtubeUrl={video.youtubeUrl}
              />
            ))
          )}
        </Box>

        <Box 
          sx={{ 
            textAlign: "center", 
            backgroundColor: "#ffffff", 
            borderRadius: "16px", 
            p: 4,
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)"
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#E65100", mb: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
            <FavoriteIcon /> जैन धर्म की शिक्षा
          </Typography>
          <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.8, maxWidth: "800px", mx: "auto" }}>
            ये कहानियाँ बच्चों को जैन धर्म के मूल सिद्धांतों - अहिंसा, सत्य, अस्तेय, ब्रह्मचर्य और अपरिग्रह - को सरल और रोचक तरीके से सिखाती हैं। 
            प्रत्येक कहानी में एक महत्वपूर्ण जीवन पाठ छिपा है जो बच्चों के चरित्र निर्माण में सहायक है।
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}
