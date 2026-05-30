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
      icon: <LocationOn sx={{ fontSize: 28 }} />, 
      color: '#f97316',
      bgColor: '#fff7ed',
      borderColor: '#fed7aa',
    },
    { 
      title: 'Active Events', 
      value: stats.events, 
      icon: <Event sx={{ fontSize: 28 }} />, 
      color: '#3b82f6',
      bgColor: '#eff6ff',
      borderColor: '#bfdbfe',
    },
    { 
      title: 'News Articles', 
      value: stats.news, 
      icon: <Article sx={{ fontSize: 28 }} />, 
      color: '#10b981',
      bgColor: '#f0fdf4',
      borderColor: '#bbf7d0',
    },
    { 
      title: 'Gallery Collections', 
      value: stats.gallery, 
      icon: <Collections sx={{ fontSize: 28 }} />, 
      color: '#8b5cf6',
      bgColor: '#faf5ff',
      borderColor: '#e9d5ff',
    },
    { 
      title: 'Questions', 
      value: stats.questions, 
      icon: <QuestionAnswer sx={{ fontSize: 28 }} />, 
      color: '#ef4444',
      bgColor: '#fef2f2',
      borderColor: '#fecaca',
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
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 1, fontSize: '1.875rem' }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.95rem' }}>
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
                border: `1px solid ${card.borderColor}`,
                backgroundColor: '#ffffff',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              <Stack spacing={2.5}>
                {/* Icon */}
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2.5,
                    backgroundColor: card.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.color,
                  }}
                >
                  {card.icon}
                </Box>

                {/* Value and Title */}
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5, fontSize: '2.25rem' }}>
                    {card.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, fontSize: '0.9rem' }}>
                    {card.title}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a', mb: 3, fontSize: '1.125rem' }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2.5,
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: '#ffffff',
                '&:hover': {
                  backgroundColor: '#fff7ed',
                  borderColor: '#f97316',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(249, 115, 22, 0.15)',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>
                Add New Event
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2.5,
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: '#ffffff',
                '&:hover': {
                  backgroundColor: '#f0fdf4',
                  borderColor: '#10b981',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>
                Create News Article
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2.5,
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: '#ffffff',
                '&:hover': {
                  backgroundColor: '#faf5ff',
                  borderColor: '#8b5cf6',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>
                Upload Gallery
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2.5,
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: '#ffffff',
                '&:hover': {
                  backgroundColor: '#fef2f2',
                  borderColor: '#ef4444',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>
                Add Question
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
