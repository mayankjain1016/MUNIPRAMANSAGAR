import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ButtonBase from "@mui/material/ButtonBase";

// MUI Icons matching your categories
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import TempleHinduOutlinedIcon from "@mui/icons-material/TempleHinduOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import Brightness7Icon from "@mui/icons-material/Brightness7"; // For the center star

// 1. Cleaner data structure passing the icon component directly
const QUICK_LINKS = [
  { label: "प्रवचन", icon: <VolumeUpOutlinedIcon fontSize="large" /> },
  { label: "शंका समाधान", icon: <ForumOutlinedIcon fontSize="large" /> },
  { label: "भावना योग", icon: <SelfImprovementIcon fontSize="large" /> },
  { label: "गुणायतन", icon: <TempleHinduOutlinedIcon fontSize="large" /> },
  { label: "पाठशाला", icon: <MenuBookOutlinedIcon fontSize="large" /> },
  { label: "कहानियाँ", icon: <AutoStoriesOutlinedIcon fontSize="large" /> },
];

export default function QuickLinks() {
  const navigate = useNavigate();

  const handleClick = (label) => {
    if (label === "प्रवचन") {
      navigate("/pravachan");
    }
  };

  return (
    <Box component="section" sx={{ width: "100%", py: { xs: 4, md: 6 } }}>
      
      {/* Elegant Divider with a Spiritual Star/Sun Motif */}
      <Box sx={{ mb: 5, px: 2 }}>
        <Divider 
          sx={{ 
            "&::before, &::after": { borderColor: "rgba(230, 81, 0, 0.2)" } 
          }}
        >
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: "#E65100",
              opacity: 0.7
            }}
          >
            <Brightness7Icon sx={{ fontSize: "20px" }} />
          </Box>
        </Divider>
      </Box>

      {/* Responsive CSS Grid: 
        xs: 2 items per row (mobile)
        sm: 3 items per row (tablet)
        md: 6 items per row (desktop)
      */}
      <Box 
        sx={{ 
          display: "grid", 
          gridTemplateColumns: { 
            xs: "repeat(2, 1fr)", 
            sm: "repeat(3, 1fr)", 
            md: "repeat(6, 1fr)" 
          },
          gap: { xs: 2, sm: 3, md: 4 },
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 4 }
        }}
      >
        {QUICK_LINKS.map((item) => (
          <ButtonBase
            key={item.label}
            onClick={() => handleClick(item.label)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: { xs: "20px 10px", md: "24px 16px" },
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1px solid rgba(230, 81, 0, 0.05)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              textDecoration: "none",
              // Premium Hover Effects
              "&:hover": {
                backgroundColor: "#FFF8E1", // Warm saffron tint on hover
                transform: "translateY(-6px)", // Lifts off the page
                boxShadow: "0 12px 24px rgba(230, 81, 0, 0.12)",
                borderColor: "rgba(230, 81, 0, 0.2)",
                "& .icon-wrapper": {
                  color: "#E65100", // Icon brightens on hover
                  transform: "scale(1.1)", // Icon slightly grows
                }
              }
            }}
          >
            {/* Icon Wrapper */}
            <Box 
              className="icon-wrapper"
              sx={{ 
                color: "#8D6E63", // Soft earthy brown by default
                mb: 1.5,
                transition: "all 0.3s ease",
                display: "flex",
              }}
            >
              {item.icon}
            </Box>

            {/* Label */}
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: "#424242",
                fontFamily: "system-ui, -apple-system, sans-serif",
                textAlign: "center",
                fontSize: { xs: "0.9rem", md: "1rem" }
              }}
            >
              {item.label}
            </Typography>
          </ButtonBase>
        ))}
      </Box>
    </Box>
  );
}