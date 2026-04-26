import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";

// Import all gallery images
import Nirbhayimg1 from "../assets/Gallery/Nirbhayimg1.jpeg";
import Nirbhayimg2 from "../assets/Gallery/Nirbhayimg2.jpeg";
import Nirbhayimg3 from "../assets/Gallery/Nirbhayimg3.jpeg";
import Nirbhayimg4 from "../assets/Gallery/Nirbhayimg4.jpeg";
import Nirbhayimg5 from "../assets/Gallery/Nirbhayimg5.jpeg";
import Nirbhayimg6 from "../assets/Gallery/Nirbhayimg6.jpeg";
import Nirbhayimg7 from "../assets/Gallery/Nirbhayimg7.jpeg";
import Nirbhayimg8 from "../assets/Gallery/Nirbhayimg8.jpeg";

const eventDetails = {
  "event-1": {
    title: "गोमिया, बोकारो मंगल प्रवेश 12Apr",
    mainImage: Nirbhayimg1,
    relatedImages: [
      { img: Nirbhayimg1, label: "मंगल प्रवेश 1" },
      { img: Nirbhayimg2, label: "मंगल प्रवेश 2" },
      { img: Nirbhayimg3, label: "मंगल प्रवेश 3" },
      { placeholder: true, label: "छवि 4" },
      { placeholder: true, label: "छवि 5" },
      { placeholder: true, label: "छवि 6" }
    ]
  },
  "event-2": {
    title: "साड़म, बोकारो मंगल प्रवेश 11Apr",
    mainImage: Nirbhayimg2,
    relatedImages: [
      { img: Nirbhayimg2, label: "मंगल प्रवेश 1" },
      { img: Nirbhayimg3, label: "मंगल प्रवेश 2" },
      { placeholder: true, label: "छवि 3" },
      { placeholder: true, label: "छवि 4" },
      { placeholder: true, label: "छवि 5" },
      { placeholder: true, label: "छवि 6" }
    ]
  },
  "event-3": {
    title: "पेटरवार, बोकारो मंगल प्रवेश 09Apr",
    mainImage: Nirbhayimg3,
    relatedImages: [
      { img: Nirbhayimg3, label: "मंगल प्रवेश 1" },
      { img: Nirbhayimg4, label: "मंगल प्रवेश 2" },
      { placeholder: true, label: "छवि 3" },
      { placeholder: true, label: "छवि 4" },
      { placeholder: true, label: "छवि 5" },
      { placeholder: true, label: "छवि 6" }
    ]
  },
  "event-4": {
    title: "राधाकृष्ण किशोर जी झा. वित्त मंत्री",
    mainImage: Nirbhayimg4,
    relatedImages: [
      { img: Nirbhayimg4, label: "कार्यक्रम 1" },
      { img: Nirbhayimg5, label: "कार्यक्रम 2" },
      { placeholder: true, label: "छवि 3" },
      { placeholder: true, label: "छवि 4" },
      { placeholder: true, label: "छवि 5" },
      { placeholder: true, label: "छवि 6" }
    ]
  },
  "event-5": {
    title: "आध्यात्मिक कार्यक्रम",
    mainImage: Nirbhayimg5,
    relatedImages: [
      { img: Nirbhayimg5, label: "कार्यक्रम 1" },
      { img: Nirbhayimg6, label: "कार्यक्रम 2" },
      { placeholder: true, label: "छवि 3" },
      { placeholder: true, label: "छवि 4" },
      { placeholder: true, label: "छवि 5" },
      { placeholder: true, label: "छवि 6" }
    ]
  },
  "event-6": {
    title: "धार्मिक समारोह",
    mainImage: Nirbhayimg6,
    relatedImages: [
      { img: Nirbhayimg6, label: "समारोह 1" },
      { img: Nirbhayimg7, label: "समारोह 2" },
      { placeholder: true, label: "छवि 3" },
      { placeholder: true, label: "छवि 4" },
      { placeholder: true, label: "छवि 5" },
      { placeholder: true, label: "छवि 6" }
    ]
  },
  "event-7": {
    title: "प्रवचन सभा",
    mainImage: Nirbhayimg7,
    relatedImages: [
      { img: Nirbhayimg7, label: "प्रवचन 1" },
      { img: Nirbhayimg8, label: "प्रवचन 2" },
      { placeholder: true, label: "छवि 3" },
      { placeholder: true, label: "छवि 4" },
      { placeholder: true, label: "छवि 5" },
      { placeholder: true, label: "छवि 6" }
    ]
  },
  "event-8": {
    title: "मंगल प्रवेश",
    mainImage: Nirbhayimg8,
    relatedImages: [
      { img: Nirbhayimg8, label: "मंगल प्रवेश 1" },
      { img: Nirbhayimg1, label: "मंगल प्रवेश 2" },
      { placeholder: true, label: "छवि 3" },
      { placeholder: true, label: "छवि 4" },
      { placeholder: true, label: "छवि 5" },
      { placeholder: true, label: "छवि 6" }
    ]
  }
};

export default function EventDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = eventDetails[eventId];

  if (!event) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h4">Event not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FAFAFA", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        
        {/* Back Button */}
        <Box sx={{ mb: 4 }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/gallery")}
            sx={{
              color: "#E65100",
              borderColor: "#E65100",
              borderRadius: "50px",
              padding: "8px 24px",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#FFF3E0",
                borderColor: "#E65100"
              }
            }}
          >
            ← वापस गैलरी में जाएं
          </Button>
        </Box>

        {/* Page Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{ 
              fontWeight: 800, 
              color: "#333333",
              mb: 2,
              fontSize: { xs: "1.75rem", md: "2.5rem" }
            }}
          >
            {event.title}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: "#757575",
              fontWeight: 400
            }}
          >
            आचार्य श्री निर्भय सागर जी
          </Typography>
        </Box>

        {/* Images Grid */}
        <Box 
          sx={{ 
            display: "grid", 
            gridTemplateColumns: { 
              xs: "1fr", 
              sm: "repeat(2, 1fr)", 
              md: "repeat(3, 1fr)"
            },
            gap: { xs: 3, md: 4 },
            mb: 6
          }}
        >
          {event.relatedImages.map((item, index) => (
            <Card 
              key={index} 
              elevation={0}
              sx={{ 
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                overflow: "hidden",
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
              {/* Image or Placeholder */}
              <Box sx={{ overflow: "hidden" }}>
                {item.placeholder ? (
                  <Box
                    sx={{
                      height: "280px",
                      backgroundColor: "#E0E0E0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 2
                    }}
                  >
                    <ImageIcon sx={{ fontSize: "64px", color: "#9E9E9E" }} />
                    <Typography variant="body2" sx={{ color: "#757575" }}>
                      छवि स्थान
                    </Typography>
                  </Box>
                ) : (
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
                )}
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
