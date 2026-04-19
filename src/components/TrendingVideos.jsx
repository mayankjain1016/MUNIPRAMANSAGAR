import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Brightness7Icon from "@mui/icons-material/Brightness7";

// Upgraded data structure to use actual image URLs (standard 16:9 ratio for video thumbnails)
const vids = [
  { 
    title: "सोमशर्म से मुनि बनने की कहानी | Jain Pathshala by Pramanik Samooh", 
    img: "https://via.placeholder.com/640x360/3E2723/FFECB3?text=Story+Thumbnail" // Placeholder for actual YT thumbnail
  },
  { 
    title: "महिला सशक्तिकरण का अर्थ क्या है? | Best of Shanka Samadhan", 
    img: "https://via.placeholder.com/640x360/1A237E/E8EAF6?text=Shanka+Samadhan" 
  },
];

export default function TrendingVideos() {
  return (
    <Box component="section" sx={{ width: "100%", py: { xs: 6, md: 8 }, backgroundColor: "#FAFAFA" }}>
      
      {/* 1. Elegant Spiritual Divider (Consistent with your Gallery & QuickLinks) */}
      <Box sx={{ mb: 4, px: 2 }}>
        <Divider sx={{ "&::before, &::after": { borderColor: "rgba(230, 81, 0, 0.2)" } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#E65100", opacity: 0.7 }}>
            <Brightness7Icon sx={{ fontSize: "24px" }} />
          </Box>
        </Divider>
      </Box>

      {/* 2. Header Section */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 6 }}>
        <Box 
          sx={{ 
            backgroundColor: "#FFF3E0", 
            borderRadius: "50%", 
            p: 2, 
            mb: 2,
            boxShadow: "0 4px 12px rgba(230, 81, 0, 0.1)"
          }}
        >
          <OndemandVideoIcon sx={{ fontSize: "36px", color: "#E65100" }} />
        </Box>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 800, 
            color: "#333333",
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-0.5px"
          }}
        >
          ट्रेंडिंग वीडियो
        </Typography>
        <Typography variant="body1" sx={{ color: "#757575", mt: 1 }}>
          (Trending Videos)
        </Typography>
      </Box>

      {/* 3. Video Grid */}
      <Box 
        sx={{ 
          display: "grid", 
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
          gap: { xs: 4, md: 4, lg: 5 },
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 2, sm: 4, md: 6 },
          width: "100%"
        }}
      >
        {vids.map((video, index) => (
          <Card 
            key={index} 
            elevation={0}
            sx={{ 
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 16px 40px rgba(230, 81, 0, 0.15)",
                // Triggers the inner overlay and play button animations
                "& .video-overlay": { backgroundColor: "rgba(0,0,0,0.4)" },
                "& .play-button": { transform: "scale(1.15)", color: "#FF0000" },
                "& .video-title": { color: "#E65100" }
              }
            }}
          >
            {/* CardActionArea makes the entire card a clickable button with a ripple effect */}
            <CardActionArea component="a" href="YOUR_YOUTUBE_LINK_HERE" target="_blank" rel="noopener noreferrer">
              
              {/* Thumbnail Container */}
              <Box sx={{ position: "relative", aspectRatio: "16/9" }}>
                <CardMedia
                  component="img"
                  image={video.img}
                  alt={video.title}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                
                {/* Cinematic Dark Overlay */}
                <Box 
                  className="video-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.15)", // Very light by default
                    transition: "background-color 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {/* YouTube Play Button */}
                  <YouTubeIcon 
                    className="play-button"
                    sx={{ 
                      fontSize: "72px", 
                      color: "rgba(255,255,255,0.9)", // White-ish by default
                      filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))",
                      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)" // Spring animation
                    }} 
                  />
                </Box>
              </Box>
              
              {/* Video Title */}
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Typography 
                  className="video-title"
                  variant="h6" 
                  component="h3"
                  sx={{ 
                    fontWeight: 600, 
                    color: "#212121",
                    lineHeight: 1.4,
                    transition: "color 0.2s ease",
                    // Ensures long titles are truncated nicely after 2 lines
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}
                >
                  {video.title}
                </Typography>
              </CardContent>
              
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}