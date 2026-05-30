import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/api';

export default function GalleryPage() {
  const navigate = useNavigate();
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const data = await apiService.get(API_ENDPOINTS.gallery.getAll);
      setGalleries(data);
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryClick = (galleryId) => {
    navigate(`/gallery/${galleryId}`);
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FAFAFA", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        
        {/* Page Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{ 
              fontWeight: 800, 
              color: "#333333",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
              letterSpacing: "-0.5px"
            }}
          >
            इवेंट गैलरी
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: "#757575",
              fontWeight: 400,
              maxWidth: "600px",
              mx: "auto"
            }}
          >
            आचार्य श्री निर्भय सागर जी
          </Typography>
        </Box>

        {/* Gallery Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : galleries.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: 'center', py: 8, color: '#757575' }}>
            कोई गैलरी उपलब्ध नहीं है
          </Typography>
        ) : (
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
            {galleries.map((gallery) => (
              <Card 
                key={gallery._id} 
                elevation={0}
                onClick={() => handleGalleryClick(gallery._id)}
                sx={{ 
                  borderRadius: "16px",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 30px rgba(230, 81, 0, 0.12)",
                    "& .MuiCardMedia-root": {
                      transform: "scale(1.08)",
                    }
                  }
                }}
              >
                <Box sx={{ overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    height="280"
                    image={`${API_URL}${gallery.coverImage}`}
                    alt={gallery.title}
                    sx={{
                      transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      objectFit: "cover",
                      width: "100%"
                    }}
                  />
                </Box>
                
                <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 600, 
                      color: "#424242",
                      lineHeight: 1.4,
                      textAlign: "center",
                      mb: 0.5
                    }}
                  >
                    {gallery.title}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: "#757575",
                      display: 'block',
                      textAlign: "center"
                    }}
                  >
                    {new Date(gallery.date).toLocaleDateString('hi-IN')} • {gallery.images.length} फोटो
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

      </Container>
    </Box>
  );
}
