import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutlined";

// Using Biography hero image
import Bioimg1 from "../Bioimg1.jpeg";

export default function HeroSlider() {
  const navigate = useNavigate();

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
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(230, 81, 0, 0.08)",
          border: "1px solid rgba(230, 81, 0, 0.05)",
        }}
      >
        
        {/* LEFT PANE: Content */}
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
          <Box sx={{ minHeight: "200px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
              प्रवचन सुधा
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
              मुनि श्री निर्भय सागर जी के दिव्य प्रवचन सुनें और अपने जीवन को एक नई एवं सकारात्मक दिशा दें।
            </Typography>
            
            <Button 
              variant="outlined" 
              startIcon={<PlayCircleOutlineIcon />}
              onClick={() => navigate("/pravachan")}
              sx={{
                color: "#E65100",
                borderColor: "#E65100",
                borderRadius: "50px",
                padding: "8px 24px",
                fontSize: "1rem",
                fontWeight: 600,
                width: "fit-content",
                "&:hover": {
                  backgroundColor: "#FFF3E0",
                  borderColor: "#E65100",
                }
              }}
            >
              अभी देखें
            </Button>
          </Box>
        </Box>

        {/* RIGHT PANE: Background Image */}
        <Box 
          sx={{ 
            flex: { xs: "none", md: 1 }, 
            height: { xs: "350px", md: "auto" },
            position: "relative",
            overflow: "hidden",
            clipPath: { xs: "none", md: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" } 
          }}
        >
          <img
            src={Bioimg1}
            alt="प्रवचन सुधा"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Subtle overlay gradient */}
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