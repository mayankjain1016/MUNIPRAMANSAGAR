import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

// Import all gallery images
import Nirbhayimg1 from "../assets/Gallery/Nirbhayimg1.jpeg";
import Nirbhayimg2 from "../assets/Gallery/Nirbhayimg2.jpeg";
import Nirbhayimg3 from "../assets/Gallery/Nirbhayimg3.jpeg";
import Nirbhayimg4 from "../assets/Gallery/Nirbhayimg4.jpeg";
import Nirbhayimg5 from "../assets/Gallery/Nirbhayimg5.jpeg";
import Nirbhayimg6 from "../assets/Gallery/Nirbhayimg6.jpeg";
import Nirbhayimg7 from "../assets/Gallery/Nirbhayimg7.jpeg";
import Nirbhayimg8 from "../assets/Gallery/Nirbhayimg8.jpeg";

const galleryImages = [
  { id: "event-1", img: Nirbhayimg1, label: "गोमिया, बोकारो मंगल प्रवेश 12Apr" },
  { id: "event-2", img: Nirbhayimg2, label: "साड़म, बोकारो मंगल प्रवेश 11Apr" },
  { id: "event-3", img: Nirbhayimg3, label: "पेटरवार, बोकारो मंगल प्रवेश 09Apr" },
  { id: "event-4", img: Nirbhayimg4, label: "राधाकृष्ण किशोर जी झा. वित्त मंत्री" },
  { id: "event-5", img: Nirbhayimg5, label: "आध्यात्मिक कार्यक्रम" },
  { id: "event-6", img: Nirbhayimg6, label: "धार्मिक समारोह" },
  { id: "event-7", img: Nirbhayimg7, label: "प्रवचन सभा" },
  { id: "event-8", img: Nirbhayimg8, label: "मंगल प्रवेश" }
];

export default function GalleryPage() {
  const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };
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
          {galleryImages.map((item, index) => (
            <Card 
              key={index} 
              elevation={0}
              onClick={() => handleEventClick(item.id)}
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
              {/* Image Container */}
              <Box sx={{ overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  height="280"
                  image={item.img}
                  alt={item.label}
                  sx={{
                    transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    objectFit: "cover",
                    width: "100%"
                  }}
                />
              </Box>
              
              {/* Caption */}
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
                  {item.label}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

      </Container>
    </Box>
  );
}
