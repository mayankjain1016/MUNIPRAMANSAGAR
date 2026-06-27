import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import GavelIcon from "@mui/icons-material/Gavel";
import { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../assets/components/VideoCard';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function SantKiAdalatPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/sant-ki-adalat`);
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
            संत की अदालत
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
            जीवन की समस्याओं का समाधान - संत की अदालत में
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
            <GavelIcon /> जीवन के प्रश्नों का समाधान
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            संत की अदालत में प्रस्तुत वास्तविक जीवन की समस्याओं के आध्यात्मिक समाधान
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
            <GavelIcon /> संत की अदालत
          </Typography>
          <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.8, maxWidth: "800px", mx: "auto" }}>
            संत की अदालत में प्रस्तुत किए गए जीवन के विभिन्न प्रश्नों और समस्याओं का आध्यात्मिक दृष्टिकोण से समाधान। 
            यहाँ आपको जीवन की चुनौतियों से निपटने के लिए संतों के मार्गदर्शन और ज्ञान का अनुभव मिलेगा।
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}
