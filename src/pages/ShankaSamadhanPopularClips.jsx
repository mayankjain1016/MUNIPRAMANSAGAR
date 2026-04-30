import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const popularClipsData = [
  {
    id: 1,
    title: "मोबाइल और सोशल मीडिया का संयम",
    duration: "19:30",
    views: "35K",
    date: "1 महीना पहले",
    rank: 1
  },
  {
    id: 2,
    title: "युवा वर्ग ब्रांडेड सामान की दौड़ से कैसे बचें?",
    duration: "18:20",
    views: "32K",
    date: "1 सप्ताह पहले",
    rank: 2
  },
  {
    id: 3,
    title: "मानसिक अशांति कैसे दूर करें?",
    duration: "14:15",
    views: "28K",
    date: "1 सप्ताह पहले",
    rank: 3
  },
  {
    id: 4,
    title: "माता-पिता का सम्मान क्यों जरूरी है?",
    duration: "14:50",
    views: "27K",
    date: "1 महीना पहले",
    rank: 4
  },
  {
    id: 5,
    title: "क्रोध से मुक्ति कैसे पाएँ?",
    duration: "12:45",
    views: "25K",
    date: "2 दिन पहले",
    rank: 5
  },
  {
    id: 6,
    title: "अहंकार को कैसे कम करें?",
    duration: "17:10",
    views: "24K",
    date: "3 सप्ताह पहले",
    rank: 6
  },
  {
    id: 7,
    title: "संयम कैसे रखें?",
    duration: "16:40",
    views: "22K",
    date: "2 सप्ताह पहले",
    rank: 7
  },
  {
    id: 8,
    title: "बुरी संगति से कैसे बचें?",
    duration: "11:55",
    views: "21K",
    date: "3 सप्ताह पहले",
    rank: 8
  }
];

export default function ShankaSamadhanPopularClips() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FAFAFA", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/shanka-samadhan')}
          sx={{
            mb: 4,
            color: "#666",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.05)"
            }
          }}
        >
          वापस जाएं
        </Button>

        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{ 
              fontWeight: 800, 
              color: "#333333",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" }
            }}
          >
            लोकप्रिय क्लिप्स
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: "#757575",
              fontWeight: 400,
              maxWidth: "700px",
              mx: "auto"
            }}
          >
            सबसे ज्यादा देखे गए शंका समाधान वीडियो
          </Typography>
        </Box>

        {/* Video Grid */}
        <Box 
          sx={{ 
            display: "grid",
            gridTemplateColumns: { 
              xs: "1fr", 
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)"
            },
            gap: { xs: 3, md: 4 }
          }}
        >
          {popularClipsData.map((video) => (
            <Card
              key={video.id}
              elevation={0}
              sx={{
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 32px rgba(230, 81, 0, 0.15)",
                  borderColor: "rgba(230, 81, 0, 0.2)",
                  "& .play-icon": {
                    transform: "scale(1.2)",
                    color: "#E65100"
                  }
                }
              }}
            >
              {/* Video Thumbnail */}
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "56.25%",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #F38181 0%, #FCE38A 100%)"
                  }}
                >
                  <PlayCircleFilledIcon 
                    className="play-icon"
                    sx={{ 
                      fontSize: "64px", 
                      color: "white",
                      transition: "all 0.3s ease"
                    }} 
                  />
                </Box>
                {/* Rank Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    backgroundColor: "#E65100",
                    color: "white",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
                  }}
                >
                  {video.rank}
                </Box>
                {/* Duration Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    fontWeight: 600
                  }}
                >
                  {video.duration}
                </Box>
              </Box>

              {/* Video Info */}
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <TrendingUpIcon sx={{ fontSize: "1rem", color: "#E65100" }} />
                  <Typography variant="caption" sx={{ color: "#E65100", fontWeight: 700 }}>
                    ट्रेंडिंग
                  </Typography>
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    color: "#333",
                    mb: 1,
                    fontSize: "1rem",
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}
                >
                  {video.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, color: "#666", fontSize: "0.85rem" }}>
                  <Typography variant="body2">{video.views} views</Typography>
                  <Typography variant="body2">•</Typography>
                  <Typography variant="body2">{video.date}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

      </Container>
    </Box>
  );
}
