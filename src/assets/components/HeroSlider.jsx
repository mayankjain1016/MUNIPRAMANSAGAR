import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
        py: { xs: 2, md: 6 },
        px: { xs: 2, sm: 4, md: 8 }
      }}
    >
      {/* Hero Image */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#ffffff",
          borderRadius: "24px 24px 0 0",
          overflow: "hidden",
          boxShadow: "none",
          border: "none",
          height: { xs: "300px", sm: "400px", md: "500px", lg: "600px" },
          backgroundImage: `url(${Bioimg1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
      </Paper>

      {/* Text Box Below Hero */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          background: "linear-gradient(135deg, #FF9800 0%, #E65100 100%)",
          borderRadius: "0 0 24px 24px",
          padding: { xs: "12px 16px", sm: "16px 20px", md: "20px 30px" },
          boxShadow: "0 20px 50px rgba(230, 81, 0, 0.08)",
          border: "none",
          textAlign: "center"
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#ffffff",
            fontWeight: 600,
            fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem", lg: "1.5rem" },
            lineHeight: 1.4,
            textShadow: "0 2px 4px rgba(0,0,0,0.2)"
          }}
        >
          {/* Add your text here */}
          वैज्ञानिक संत 108 आचार्य श्री निर्भय सागर जी महाराज
        </Typography>
      </Box>
    </Box>
  );
}