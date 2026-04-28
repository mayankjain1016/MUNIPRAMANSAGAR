import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

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
          height: { xs: "350px", md: "500px" },
          backgroundImage: `url(${Bioimg1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
      </Paper>
    </Box>
  );
}