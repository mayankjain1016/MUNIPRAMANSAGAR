import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function DisciplesSection() {
  const [disciples, setDisciples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDisciples();
  }, []);

  const fetchDisciples = async () => {
    try {
      const response = await fetch(`${API_URL}/disciples`);
      if (response.ok) {
        const data = await response.json();
        setDisciples(data);
      }
    } catch (error) {
      console.error('Error fetching disciples:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ color: '#E65100' }} />
      </Box>
    );
  }

  if (disciples.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: 8, backgroundColor: '#F5F5F5' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700, 
            color: '#E65100', 
            mb: 2,
            textAlign: 'center',
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          शिष्य परिवार
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#424242', 
            mb: 6, 
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.8
          }}
        >
          आचार्य श्री निर्भय सागर जी महाराज के द्वारा दीक्षित शिष्यों का विशाल परिवार
        </Typography>

        <Grid container spacing={3}>
          {disciples.map(disciple => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={disciple._id}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(230, 81, 0, 0.15)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={disciple.image.startsWith('http') ? disciple.image : `http://localhost:5000${disciple.image}`}
                  alt={disciple.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#1a1a1a',
                      mb: 0.5,
                      fontSize: '1.1rem'
                    }}
                  >
                    {disciple.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#E65100',
                      fontWeight: 500,
                      mb: 1
                    }}
                  >
                    {disciple.title}
                  </Typography>
                  {disciple.description && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#757575',
                        lineHeight: 1.6
                      }}
                    >
                      {disciple.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
