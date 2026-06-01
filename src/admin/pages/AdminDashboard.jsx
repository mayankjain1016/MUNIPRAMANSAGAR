import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Stack, CircularProgress, IconButton } from '@mui/material';
import {
  LocationOn,
  Event,
  Article,
  Collections,
  QuestionAnswer,
  VideoLibrary,
  Person,
  Group,
  MenuBook,
  ArrowForward,
} from '@mui/icons-material';
import { locationService, eventService, newsService, galleryService, shankaSamadhanService } from '../../services';

export default function AdminDashboard() {
  const navigate = useNavigate();
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
      color: '#f97316',
      bgColor: '#fff7ed',
      borderColor: '#fed7aa',
      path: '/admin/location',
    },
    { 
      title: 'Active Events', 
      value: stats.events, 
      icon: <Event sx={{ fontSize: 32 }} />, 
      color: '#3b82f6',
      bgColor: '#eff6ff',
      borderColor: '#bfdbfe',
      path: '/admin/events',
    },
    { 
      title: 'News Articles', 
      value: stats.news, 
      icon: <Article sx={{ fontSize: 32 }} />, 
      color: '#10b981',
      bgColor: '#f0fdf4',
      borderColor: '#bbf7d0',
      path: '/admin/news',
    },
    { 
      title: 'Gallery Collections', 
      value: stats.gallery, 
      icon: <Collections sx={{ fontSize: 32 }} />, 
      color: '#8b5cf6',
      bgColor: '#faf5ff',
      borderColor: '#e9d5ff',
      path: '/admin/gallery',
    },
    { 
      title: 'Questions', 
      value: stats.questions, 
      icon: <QuestionAnswer sx={{ fontSize: 32 }} />, 
      color: '#ef4444',
      bgColor: '#fef2f2',
      borderColor: '#fecaca',
      path: '/admin/shanka-samadhan',
    },
  ];

  const quickActions = [
    { title: 'Homepage Videos', icon: <VideoLibrary />, color: '#f97316', path: '/admin/homepage' },
    { title: 'Biography', icon: <Person />, color: '#3b82f6', path: '/admin/biography' },
    { title: 'Disciples', icon: <Group />, color: '#10b981', path: '/admin/disciples' },
    { title: 'Books', icon: <MenuBook />, color: '#8b5cf6', path: '/admin/books' },
    { title: 'Pravachan', icon: <VideoLibrary />, color: '#f59e0b', path: '/admin/pravachan' },
    { title: 'Kahaniya', icon: <VideoLibrary />, color: '#ec4899', path: '/admin/kahaniya' },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#f97316' }} />
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
              onClick={() => navigate(card.path)}
              sx={{
                p: 3,
                borderRadius: 3,
                border: `1px solid ${card.borderColor}`,
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
                  borderColor: card.color,
                },
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                <Stack spacing={2.5} flex={1}>
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
                <IconButton 
                  size="small"
                  sx={{ 
                    color: card.color,
                    backgroundColor: card.bgColor,
                    '&:hover': { backgroundColor: card.bgColor }
                  }}
                >
                  <ArrowForward fontSize="small" />
                </IconButton>
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
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Paper
                elevation={0}
                onClick={() => navigate(action.path)}
                sx={{
                  p: 3,
                  borderRadius: 2.5,
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#ffffff',
                  textAlign: 'center',
                  '&:hover': {
                    borderColor: action.color,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 12px ${action.color}25`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    backgroundColor: `${action.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: action.color,
                    margin: '0 auto 12px',
                  }}
                >
                  {action.icon}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b', fontSize: '0.85rem' }}>
                  {action.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
