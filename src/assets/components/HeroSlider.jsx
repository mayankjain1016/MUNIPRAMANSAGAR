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
        justifyContent: "center",
        backgroundColor: "#FAFAFA",
        py: { xs: 2, md: 6 },
        px: { xs: 2, sm: 4, md: 8 }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(230, 81, 0, 0.08)",
          border: "1px solid rgba(230, 81, 0, 0.05)",
          height: { xs: "350px", md: "1200px" },
          backgroundImage: `url(${Bioimg1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative"
        }}
      >
        {/* Text Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "90%",
            maxWidth: "900px",
            px: 2
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "clamp(28px, 5vw, 56px)",
              textShadow: "0 4px 20px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.4)",
              lineHeight: 1.3
            }}
          >
            वैज्ञानिक संत 108 आचार्य श्री निर्भय सागर जी महाराज
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}