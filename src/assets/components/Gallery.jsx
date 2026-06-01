import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";

import Brightness7Icon from "@mui/icons-material/Brightness7";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import apiService from "../../services/apiService";
import { API_ENDPOINTS } from "../../config/api";

export default function Gallery() {
  const navigate = useNavigate();
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const data = await apiService.get(API_ENDPOINTS.gallery.getHome);
      setGalleries(data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAllPhotos = () => {
    navigate("/gallery");
  };

  return (
    <Box component="section" sx={{ width: "100%", py: { xs: 6, md: 8 }, backgroundColor: "#ffffff" }}>
      
      {/* 1. Elegant Spiritual Divider */}
      <Box sx={{ mb: 4, px: 2 }}>
        <Divider sx={{ "&::before, &::after": { borderColor: "rgba(230, 81, 0, 0.2)" } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#E65100", opacity: 0.7 }}>
            <Brightness7Icon sx={{ fontSize: "24px" }} />
          </Box>
        </Divider>
      </Box>

      {/* 2. Gallery Header */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 6 }}>
      </Box>

      {/* 3. Responsive Photo Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress sx={{ color: '#E65100' }} />
        </Box>
      ) : galleries.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', py: 8, color: '#757575' }}>
          कोई गैलरी उपलब्ध नहीं है
        </Typography>
      ) : (
        <Box 
          sx={{ 
            display: "grid", 
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
            gap: { xs: 3, md: 3, lg: 4 },
            maxWidth: "1400px",
            mx: "auto",
            px: { xs: 2, sm: 4, md: 6 },
            mb: 6,
            width: "100%"
          }}
        >
          {galleries.map((gallery) => (
            <Card 
              key={gallery._id} 
              elevation={0}
              onClick={() => navigate(`/gallery/${gallery._id}`)}
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
                    textAlign: "center"
                  }}
                >
                  {gallery.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* 4. View More Button */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button 
          variant="outlined" 
          endIcon={<ArrowForwardIosIcon sx={{ fontSize: "14px" }} />}
          onClick={handleViewAllPhotos}
          sx={{ 
            color: "#E65100", 
            borderColor: "rgba(230, 81, 0, 0.3)",
            borderRadius: "50px",
            padding: "10px 32px",
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#FFF8E1",
              borderColor: "#E65100",
            }
          }}
        >
          View All Photos
        </Button>
      </Box>

    </Box>
  );
}