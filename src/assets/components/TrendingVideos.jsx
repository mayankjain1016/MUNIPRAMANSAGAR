import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import VideoCard from "./VideoCard";
import featuredVideoService from "../../services/featuredVideoService";

// Fallback videos in case API fails
const fallbackVids = [
  { 
    title: "सोमशर्म से मुनि बनने की कहानी | Jain Pathshala by Pramanik Samooh", 
    videoId: "41qcbxa1yDU",
    youtubeUrl: "https://youtu.be/41qcbxa1yDU?si=XYOBivF_CFfgbUM5"
  },
  { 
    title: "महिला सशक्तिकरण का अर्थ क्या है? | Best of Shanka Samadhan", 
    videoId: "tAyDxsBAHjY",
    youtubeUrl: "https://youtu.be/tAyDxsBAHjY?si=3P3tTQVrse8n0aZW"
  },
];

export default function TrendingVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedVideos();
  }, []);

  const fetchFeaturedVideos = async () => {
    try {
      const data = await featuredVideoService.getAllFeaturedVideos();
      if (data && data.length > 0) {
        setVideos(data);
      } else {
        setVideos(fallbackVids);
      }
    } catch (error) {
      console.error('Failed to fetch featured videos:', error);
      setVideos(fallbackVids);
    } finally {
      setLoading(false);
    }
  };

  const getVideoUrl = (video) => {
    return video.youtubeUrl;
  };

  if (loading) {
    return (
      <Box component="section" sx={{ width: "100%", py: { xs: 6, md: 8 }, backgroundColor: "#FAFAFA", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <CircularProgress />
      </Box>
    );
  }

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
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            title={video.title}
            videoId={video.videoId}
            youtubeUrl={getVideoUrl(video)}
            thumbnailUrl={video.thumbnail}
          />
        ))}
      </Box>
    </Box>
  );
}