import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Chip, CircularProgress } from '@mui/material';
import { PlayCircleFilled, Visibility } from '@mui/icons-material';
import { pravachanService } from '../services/pravachanService';

export default function NavinPravachanPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await pravachanService.getAllPravachans('navin');
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
        <CircularProgress sx={{ color: '#FF6B6B' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FAFAFA', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#333', mb: 2 }}>
            नवीन प्रवचन
          </Typography>
          <Typography variant="h6" sx={{ color: '#757575' }}>
            इस महीने के प्रवचन देखें
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video._id}>
              <Card
                onClick={() => handleVideoClick(video)}
                sx={{
                  cursor: 'pointer',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={video.thumbnail || 'https://via.placeholder.com/400x200'}
                    alt={video.title}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      '&:hover': { opacity: 1 }
                    }}
                  >
                    <PlayCircleFilled sx={{ fontSize: 64, color: 'white' }} />
                  </Box>
                  {video.duration && (
                    <Chip
                      label={video.duration}
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
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }} noWrap>
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {video.description?.substring(0, 100)}...
                  </Typography>
                  <Chip icon={<Visibility />} label={`${video.views} views`} size="small" />
                </CardContent>
              </Card>
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
