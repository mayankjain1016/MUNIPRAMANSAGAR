import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { PlayCircle, Schedule } from '@mui/icons-material';
import apiService from '../../services/apiService';
import { API_ENDPOINTS } from '../../config/api';

export default function LiveVideo() {
  const [liveStatus, setLiveStatus] = useState({ isLive: false, videoUrl: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLiveStatus();
  }, []);

  const fetchLiveStatus = async () => {
    try {
      const data = await apiService.get(API_ENDPOINTS.liveVideo.get);
      setLiveStatus(data);
    } catch (error) {
      console.error('Error fetching live status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  const getVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  return (
    <Box component="section" sx={{ width: '100%', py: { xs: 6, md: 8 }, backgroundColor: '#FAFAFA' }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 4 } }}>
        {/* <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              color: '#E65100',
              mb: 1,
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            लाइव प्रवचन
          </Typography>
        </Box> */}

        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            backgroundColor: '#ffffff',
          }}
        >
          {liveStatus.isLive && liveStatus.videoUrl ? (
            <Box sx={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                src={`https://www.youtube.com/embed/${getVideoId(liveStatus.videoUrl)}?autoplay=1`}
                title="Live Stream"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          ) : (
            <Box
              sx={{
                p: { xs: 6, sm: 8, md: 10 },
                textAlign: 'center',
                background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
              }}
            >
              <Schedule sx={{ fontSize: 80, color: '#E65100', mb: 2 }} />
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#E65100',
                  mb: 2,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                Coming Soon
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#5D4037',
                  fontSize: { xs: '1rem', sm: '1.1rem' }
                }}
              >
                लाइव प्रवचन जल्द ही शुरू होगा
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
