import { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Stack, CircularProgress } from '@mui/material';
import {
  LocationOn,
  Event,
  Article,
  Collections,
  QuestionAnswer,
  TrendingUp,
} from '@mui/icons-material';
import { locationService, eventService, newsService, galleryService, shankaSamadhanService } from '../../services';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    location: 0,
    events: 0,
    news: 0,
    gallery: 0,
    questions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [events, news, galleries, questions] = await Promise.all([
        eventService.getAllEvents(),
        newsService.getAllNews(),
        galleryService.getAllGalleries(),
        shankaSamadhanService.getAllQuestions(),
      ]);

      setStats({
        location: 1,
        events: events.length,
        news: news.length,
        gallery: galleries.length,
        questions: questions.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      title: 'Current Location', 
      value: stats.location, 
      icon: <LocationOn sx={{ fontSize: 32 }} />, 
      color: '#FF9800',
      bgColor: '#FFF3E0',
      change: '+0%',
    },
    { 
      title: 'Active Events', 
      value: stats.events, 
      icon: <Event sx={{ fontSize: 32 }} />, 
      color: '#2196F3',
      bgColor: '#E3F2FD',
      change: '+12%',
    },
    { 
      title: 'News Articles', 
      value: stats.news, 
      icon: <Article sx={{ fontSize: 32 }} />, 
      color: '#4CAF50',
      bgColor: '#E8F5E9',
      change: '+8%',
    },
    { 
      title: 'Gallery Collections', 
      value: stats.gallery, 
      icon: <Collections sx={{ fontSize: 32 }} />, 
      color: '#9C27B0',
      bgColor: '#F3E5F5',
      change: '+5%',
    },
    { 
      title: 'Questions', 
      value: stats.questions, 
      icon: <QuestionAnswer sx={{ fontSize: 32 }} />, 
      color: '#F44336',
      bgColor: '#FFEBEE',
      change: '+15%',
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#FF9800' }} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body2" sx={{ color: '#757575' }}>
          Welcome back! Here's what's happening with your content.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid #e0e0e0',
                backgroundColor: '#ffffff',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
                  borderColor: card.color,
                },
              }}
            >
              <Stack spacing={2}>
                {/* Icon and Change */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      backgroundColor: card.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <TrendingUp sx={{ fontSize: 16, color: '#4CAF50' }} />
                    <Typography variant="caption" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                      {card.change}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Value and Title */}
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 0.5 }}>
                    {card.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#757575', fontWeight: 500 }}>
                    {card.title}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 2 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#FFF3E0',
                  borderColor: '#FF9800',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#424242' }}>
                Add New Event
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#E8F5E9',
                  borderColor: '#4CAF50',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#424242' }}>
                Create News Article
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#F3E5F5',
                  borderColor: '#9C27B0',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#424242' }}>
                Upload Gallery
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#FFEBEE',
                  borderColor: '#F44336',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#424242' }}>
                Add Question
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
