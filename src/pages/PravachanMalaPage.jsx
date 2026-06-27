import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, CircularProgress } from '@mui/material';
import VideoCard from '../assets/components/VideoCard';
import { pravachanService } from '../services/pravachanService';

export default function PravachanMalaPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await pravachanService.getAllPravachans('mala');
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = async (video) => {
    await pravachanService.incrementViews(video._id);
    window.open(video.videoUrl, '_blank');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#F38181' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FAFAFA', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#333', mb: 2 }}>
            प्रवचन माला
          </Typography>
          <Typography variant="h6" sx={{ color: '#757575' }}>
            प्रवचन श्रंखलाओं को देखें
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video._id}>
              <VideoCard
                title={video.title}
                description={video.description}
                youtubeUrl={video.videoUrl}
                thumbnailUrl={video.thumbnail}
                duration={video.duration}
                views={video.views}
                onClick={() => handleVideoClick(video)}
              />
            </Grid>
          ))}
        </Grid>

        {videos.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              कोई प्रवचन उपलब्ध नहीं है
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
