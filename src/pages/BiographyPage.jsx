import { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import DisciplesSection from './components/DisciplesSection';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function BiographyPage() {
  const [biography, setBiography] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBiography();
  }, []);

  const fetchBiography = async () => {
    try {
      const response = await fetch(`${API_URL}/biography`);
      if (response.ok) {
        const data = await response.json();
        setBiography(data);
      } else {
        setError('Biography not found');
      }
    } catch (error) {
      setError('Failed to load biography');
      console.error('Error fetching biography:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress sx={{ color: '#E65100' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!biography) return null;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FAFAFA", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        
        {/* Hero Section */}
        <Box 
          sx={{ 
            position: "relative",
            mb: 0,
            borderRadius: "24px 24px 0 0",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(230, 81, 0, 0.08)",
            height: { xs: "300px", sm: "400px", md: "500px", lg: "600px" },
            backgroundImage: `url(${biography.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
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
              background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%)",
              zIndex: 1
            }}
          />
        </Box>

        {/* Title Box */}
        <Box 
          sx={{
            background: "linear-gradient(135deg, #FF9800 0%, #E65100 100%)",
            borderRadius: "0 0 24px 24px",
            p: { xs: "6px 16px", sm: "8px 20px", md: "10px 30px" },
            mb: 8,
            boxShadow: "0 20px 50px rgba(230, 81, 0, 0.08)",
            textAlign: "center"
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              color: "#ffffff",
              fontSize: { xs: "1.3rem", sm: "1.6rem", md: "1.8rem" },
              letterSpacing: "-0.5px",
              textShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }}
          >
            {biography.title}
          </Typography>
        </Box>

        {/* Content Section */}
        <Box 
          sx={{ 
            mb: 6,
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              fontWeight: 700,
              color: '#E65100',
              mb: 3,
              mt: 4
            },
            '& h4': {
              fontSize: { xs: '1.3rem', sm: '1.75rem', md: '2.125rem' }
            },
            '& p': {
              color: '#424242',
              lineHeight: 1.8,
              mb: 2,
              fontSize: { xs: '0.9rem', sm: '1rem' }
            },
            '& strong': {
              fontWeight: 600
            },
            '& ul, & ol': {
              color: '#424242',
              lineHeight: 2,
              pl: 3
            },
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '16px',
              my: 3
            }
          }}
          dangerouslySetInnerHTML={{ __html: biography.content }}
        />

      </Container>

      {/* Disciples Section */}
      <DisciplesSection />

      <Box sx={{ backgroundColor: "#FAFAFA", pb: 8 }}>
        <Container maxWidth="lg">
        </Container>
      </Box>
    </Box>
  );
}
