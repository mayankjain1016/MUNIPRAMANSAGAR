import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutlined";

// Assuming these are your local paths
import sliderimg1 from "../assets/sliderimg1.jpeg";
import sliderimg2 from "../assets/sliderimg2.jpeg";
import sliderimg3 from "../assets/sliderimg3.jpeg";

// Upgraded data structure to include content for the left pane
const slides = [
  { 
    key: "s1", 
    image: sliderimg1, 
    title: "प्रवचन सुधा", 
    subtitle: "मुनि श्री प्रमाण सागर जी के दिव्य प्रवचन सुनें और अपने जीवन को एक नई एवं सकारात्मक दिशा दें।" 
  },
  { 
    key: "s2", 
    image: sliderimg2, 
    title: "शंका समाधान", 
    subtitle: "धर्म, समाज और दैनिक जीवन की उलझनों से जुड़े अपने सभी प्रश्नों के सटीक उत्तर पाएं।" 
  },
  { 
    key: "s3", 
    image: sliderimg3, 
    title: "भावना योग", 
    subtitle: "मानसिक शांति, शारीरिक ऊर्जा और आत्म-शुद्धि के लिए विशेष ध्यान एवं योग प्रणाली।" 
  },
];

export default function HeroSlider() {
  const [cur, setCur] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCur((prev) => (prev + 1) % slides.length);
    }, 6000); // Slightly slower (6s) to allow reading
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => setCur((prev) => (prev - 1 + slides.length) % slides.length);
  const handleNext = () => setCur((prev) => (prev + 1) % slides.length);

  return (
    <Box 
      component="section" 
      sx={{ 
        width: "100%", 
        display: "flex", 
        justifyContent: "center",
        backgroundColor: "#FAFAFA",
        py: { xs: 2, md: 6 },
        px: { xs: 2, sm: 4, md: 8 }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" }, // Text on bottom for mobile, left for desktop
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          overflow: "hidden", // Keeps the zooming images inside the rounded corners
          boxShadow: "0 20px 50px rgba(230, 81, 0, 0.08)",
          border: "1px solid rgba(230, 81, 0, 0.05)",
        }}
      >
        
        {/* LEFT PANE: Content & Controls */}
        <Box 
          sx={{ 
            flex: 1, 
            p: { xs: 4, md: 8 }, 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
            backgroundColor: "#ffffff"
          }}
        >
          {/* Fading Text Container */}
          <Box sx={{ minHeight: "200px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {slides.map((slide, index) => (
              <Box
                key={`text-${slide.key}`}
                sx={{
                  position: index === cur ? "relative" : "absolute",
                  opacity: index === cur ? 1 : 0,
                  transform: index === cur ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  pointerEvents: index === cur ? "auto" : "none",
                }}
              >
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 800, 
                    color: "#212121",
                    mb: 2,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    letterSpacing: "-1px"
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: "#616161", 
                    fontWeight: 400,
                    lineHeight: 1.6,
                    mb: 4
                  }}
                >
                  {slide.subtitle}
                </Typography>
                
                <Button 
                  variant="outlined" 
                  startIcon={<PlayCircleOutlineIcon />}
                  sx={{
                    color: "#E65100",
                    borderColor: "#E65100",
                    borderRadius: "50px",
                    padding: "8px 24px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#FFF3E0",
                      borderColor: "#E65100",
                    }
                  }}
                >
                  अभी देखें
                </Button>
              </Box>
            ))}
          </Box>

          {/* Controls Container */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 6, gap: 3 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton onClick={handlePrev} sx={{ border: "1px solid #EEEEEE", "&:hover": { backgroundColor: "#FFF3E0", color: "#E65100" } }}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton onClick={handleNext} sx={{ border: "1px solid #EEEEEE", "&:hover": { backgroundColor: "#FFF3E0", color: "#E65100" } }}>
                <ChevronRightIcon />
              </IconButton>
            </Box>

            {/* Progress Dots */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {slides.map((_, i) => (
                <Box
                  key={`dot-${i}`}
                  onClick={() => setCur(i)}
                  sx={{
                    width: i === cur ? "32px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    backgroundColor: i === cur ? "#E65100" : "#E0E0E0",
                    transition: "all 0.4s ease",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* RIGHT PANE: The "Cover" Images */}
        <Box 
          sx={{ 
            flex: { xs: "none", md: 1 }, 
            height: { xs: "350px", md: "auto" }, // Fixed height on mobile, stretches to match text on desktop
            position: "relative",
            overflow: "hidden",
            // This clip path adds a subtle, elegant angle to the divider between text and image on desktop
            clipPath: { xs: "none", md: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" } 
          }}
        >
          {slides.map((slide, index) => (
            <img
              key={`img-${slide.key}`}
              src={slide.image}
              alt={slide.title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover", // Successfully using cover without ruining the composition!
                opacity: index === cur ? 1 : 0,
                // The Ken Burns effect: Slow zoom and fade
                transform: index === cur ? "scale(1.05)" : "scale(1)",
                transition: "opacity 1.2s ease-in-out, transform 6s linear",
                zIndex: index === cur ? 1 : 0,
              }}
            />
          ))}
          {/* Subtle overlay gradient to make the image blend smoothly into the white text area */}
          <Box 
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 30%)",
              zIndex: 2,
              display: { xs: "none", md: "block" }
            }}
          />
        </Box>

      </Paper>
    </Box>
  );
}