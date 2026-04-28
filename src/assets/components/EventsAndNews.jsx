import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { keyframes } from "@mui/system";

import { 
  LocationOn as LocationOnIcon, 
  EventNote as EventNoteIcon, 
  Campaign as CampaignIcon,
  ArrowForward as ArrowForwardIcon
} from "@mui/icons-material";

import { getLatestNews } from "../../data/newsData";

// Animation for the live location marker
const pulseAnimation = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
`;

export default function EventsAndNews() {
  const navigate = useNavigate();
  
  const newsData = getLatestNews(5);

  const handleViewAll = () => {
    navigate("/news-media");
  };

  const handleNewsClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 4, md: 8 }, 
        px: { xs: 2, sm: 4, md: 6 },
        backgroundColor: "#FAFAFA",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(12, 1fr)" },
          gap: { xs: 3, md: 3, lg: 4 },
          maxWidth: "1400px",
          width: "100%",
        }}
      >
        
        {/* LOCATION CARD */}
        <Paper
          elevation={0}
          sx={{
            gridColumn: { xs: "1", lg: "1 / 6" },
            background: "linear-gradient(135deg, #FF9800 0%, #E65100 100%)",
            borderRadius: "24px",
            p: 4,
            color: "white",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 16px 32px rgba(230, 81, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          {/* Decorative background circle */}
          <Box 
            sx={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
            }}
          />
          
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box 
              sx={{ 
                backgroundColor: "white", 
                borderRadius: "50%", 
                p: 1, 
                display: "flex", 
                mr: 2,
                animation: `${pulseAnimation} 2s infinite`
              }}
            >
              <LocationOnIcon sx={{ color: "#E65100" }} />
            </Box>
            <Typography variant="overline" sx={{ fontWeight: 600, letterSpacing: 1.5, color: "rgba(255,255,255,0.9)" }}>
              Current Location
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "system-ui, sans-serif", mb: 1 }}>
            आगरा, उत्तर प्रदेश
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
            (Agra, Uttar Pradesh, India)
          </Typography>
        </Paper>

        {/* EVENTS CARD */}
        <Paper
          elevation={0}
          sx={{
            gridColumn: { xs: "1", lg: "1 / 6" },
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            p: 4,
            border: "1px solid rgba(230, 81, 0, 0.1)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#333", mb: 3, display: "flex", alignItems: "center" }}>
            <EventNoteIcon sx={{ color: "#E65100", mr: 1.5 }} /> 
            Upcoming Events
          </Typography>
          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {["भावना योग शिविर - आपके शहर में (Register)", "Weekly Online भावना योग"].map((event, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  p: 2, 
                  backgroundColor: "#FFF8E1", 
                  borderRadius: "12px",
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "translateX(5px)", backgroundColor: "#FFE0B2" },
                  cursor: "pointer"
                }}
              >
                <Box sx={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#E65100", mr: 2 }} />
                <Typography variant="body1" sx={{ color: "#424242", fontWeight: 500 }}>
                  {event}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* NEWS FEED */}
        <Paper
          elevation={0}
          sx={{
            gridColumn: { xs: "1", lg: "6 / 13" },
            gridRow: { xs: "auto", lg: "1 / 3" },
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            p: { xs: 3, md: 4 },
            border: "1px solid rgba(230, 81, 0, 0.1)",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.05)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#333", display: "flex", alignItems: "center" }}>
              <CampaignIcon sx={{ color: "#E65100", mr: 1.5, fontSize: "28px" }} /> 
              Latest News
            </Typography>
            <Button 
              endIcon={<ArrowForwardIcon />} 
              onClick={handleViewAll}
              sx={{ color: "#E65100", textTransform: "none", fontWeight: 600 }}
            >
              View All
            </Button>
          </Box>

          {/* Custom styled scrollable area */}
          <Box 
            sx={{ 
              flexGrow: 1,
              maxHeight: { xs: "350px", md: "100%" }, 
              overflowY: "auto",
              pr: 2,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              // Custom Scrollbar
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-track": { background: "#f1f1f1", borderRadius: "10px" },
              "&::-webkit-scrollbar-thumb": { background: "#FFB74D", borderRadius: "10px" },
              "&::-webkit-scrollbar-thumb:hover": { background: "#E65100" }
            }}
          >
            {newsData.map((item, index) => (
              <Box 
                key={item.id} 
                onClick={() => handleNewsClick(item.id)}
                sx={{ 
                  display: "flex", 
                  flexDirection: "column",
                  borderBottom: index !== newsData.length - 1 ? "1px dashed #E0E0E0" : "none",
                  pb: index !== newsData.length - 1 ? 3 : 0,
                  cursor: "pointer"
                }}
              >
                <Chip 
                  label={item.date} 
                  size="small" 
                  sx={{ 
                    backgroundColor: "#FAFAFA", 
                    color: "#757575",
                    fontWeight: 600,
                    border: "1px solid #EEEEEE",
                    mb: 1.5,
                    width: "fit-content"
                  }} 
                />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: "#212121", 
                    fontWeight: 500, 
                    lineHeight: 1.6,
                    fontSize: "1.05rem"
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

      </Box>
    </Box>
  );
}
