import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function VideoCard({ title, description, videoId, youtubeUrl, thumbnailUrl, duration, views, onClick }) {
  const extractVideoId = (url) => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const finalVideoId = videoId || extractVideoId(youtubeUrl);

  const getThumbnail = (id) => {
    if (thumbnailUrl) return thumbnailUrl;
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : '';
  };

  const handleClick = () => {
    if (onClick) {
      onClick(youtubeUrl);
    } else if (youtubeUrl) {
      window.open(youtubeUrl, '_blank');
    }
  };

  return (
    <Card
      elevation={0}
      onClick={handleClick}
      sx={{
        borderRadius: "16px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 16px 40px rgba(230, 81, 0, 0.15)",
          borderColor: "rgba(230, 81, 0, 0.2)",
          "& .play-icon": {
            transform: "scale(1.2)",
            color: "#FF0000"
          }
        }
      }}
    >
      <Box 
        sx={{ 
          position: "relative",
          aspectRatio: "16/9",
          overflow: "hidden",
          backgroundImage: `url(${getThumbnail(finalVideoId)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5" // Fallback color
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.3s",
            "&:hover": { opacity: 1 }
          }}
        >
          <PlayCircleOutlineIcon 
            className="play-icon"
            sx={{ 
              fontSize: "64px", 
              color: "white",
              transition: "all 0.3s ease"
            }} 
          />
        </Box>
        {duration && (
          <Chip
            label={duration}
            size="small"
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white'
            }}
          />
        )}
      </Box>

      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Typography 
          variant="h6" 
          component="h3"
          sx={{ 
            fontWeight: 600,
            color: "#333333",
            mb: 1,
            fontSize: "1.1rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography 
            variant="body2" 
            sx={{ 
              color: "#757575",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {description}
          </Typography>
        )}
        
        {views !== undefined && (
          <Box sx={{ mt: 2 }}>
            <Chip icon={<VisibilityIcon />} label={`${views} views`} size="small" />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
