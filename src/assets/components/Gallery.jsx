import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Nirbhayaimg1 from "../Gallery/Nirbhayimg1.jpeg";
import Nirbhayaimg2 from "../Gallery/Nirbhayimg2.jpeg";
import Nirbhayaimg3 from "../Gallery/Nirbhayimg3.jpeg";
import Nirbhayaimg4 from "../Gallery/Nirbhayimg4.jpeg";

const galleryData = [
  { img: Nirbhayaimg1, label: "गोमिया, बोकारो मंगल प्रवेश 12Apr" },
  { img: Nirbhayaimg2, label: "साड़म, बोकारो मंगल प्रवेश 11Apr" },
  { img: Nirbhayaimg3, label: "पेटरवार, बोकारो मंगल प्रवेश 09Apr" },
  { img: Nirbhayaimg4, label: "राधाकृष्ण किशोर जी झा. वित्त मंत्री" },
];

export default function Gallery() {
  const navigate = useNavigate();

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
        {galleryData.map((item, index) => (
          <Card 
            key={index} 
            elevation={0}
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
                // Targets the image inside the card and zooms it
                "& .MuiCardMedia-root": {
                  transform: "scale(1.08)",
                }
              }
            }}
          >
            {/* Image Container with overflow hidden to keep the zoom inside the card */}
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