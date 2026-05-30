import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/api';

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

  const handleClipClick = async (clipId) => {
    try {
      await apiService.get(`${API_ENDPOINTS.shankaSamadhan.clips.getAll}/${clipId}`);
    } catch (error) {
      console.error('Error updating views:', error);
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
            <Card
              key={video._id}
              elevation={0}
              onClick={() => handleClipClick(video._id)}
              sx={{
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 32px rgba(230, 81, 0, 0.15)",
                  borderColor: "rgba(230, 81, 0, 0.2)",
                  "& .play-icon": {
                    transform: "scale(1.2)",
                    color: "#E65100"
                  }
                }
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "56.25%",
                  backgroundColor: "#f0f0f0",
                  backgroundImage: video.thumbnail ? `url(${video.thumbnail})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: video.thumbnail ? "rgba(0,0,0,0.3)" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  }}
                >
                  <PlayCircleFilledIcon 
                    className="play-icon"
                    sx={{ 
                      fontSize: "64px", 
                      color: "white",
                      transition: "all 0.3s ease"
                    }} 
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    fontWeight: 600
                  }}
                >
                  {video.duration}
                </Box>
              </Box>

              <CardContent sx={{ p: 2 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    color: "#333",
                    mb: 1,
                    fontSize: "1rem",
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}
                >
                  {video.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, color: "#666", fontSize: "0.85rem" }}>
                  <Typography variant="body2">{video.views} views</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

      </Container>
    </Box>
  );
}
