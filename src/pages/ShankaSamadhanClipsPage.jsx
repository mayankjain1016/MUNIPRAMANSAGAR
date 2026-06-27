import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/api';
import VideoCard from '../assets/components/VideoCard';

export default function ShankaSamadhanClipsPage() {
  const navigate = useNavigate();
  const [clips, setClips] = useState([]);

  useEffect(() => {
    fetchClips();
  }, []);

  const fetchClips = async () => {
    try {
      const data = await apiService.get(API_ENDPOINTS.shankaSamadhan.clips.getAll);
      setClips(data);
    } catch (error) {
      console.error('Error fetching clips:', error);
    }
  };

  const handleClipClick = async (video) => {
    try {
      await apiService.get(`${API_ENDPOINTS.shankaSamadhan.clips.getAll}/${video._id}`);
    } catch (error) {
      console.error('Error updating views:', error);
    }
    const url = video.videoUrl || video.youtubeUrl;
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FAFAFA", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/shanka-samadhan')}
          sx={{
            mb: 4,
            color: "#666",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.05)"
            }
          }}
        >
          वापस जाएं
        </Button>

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
            शंका समाधान क्लिप्स
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
            सभी शंका समाधान वीडियो
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: "grid",
            gridTemplateColumns: { 
              xs: "1fr", 
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)"
            },
            gap: { xs: 3, md: 4 }
          }}
        >
          {clips.map((video) => (
            <VideoCard
              key={video._id}
              title={video.title}
              description={video.description}
              youtubeUrl={video.videoUrl || video.youtubeUrl}
              thumbnailUrl={video.thumbnail}
              duration={video.duration}
              views={video.views}
              onClick={() => handleClipClick(video)}
            />
          ))}
        </Box>

      </Container>
    </Box>
  );
}
