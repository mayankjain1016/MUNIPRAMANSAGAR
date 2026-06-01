import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  ImageList,
  ImageListItem,
  Dialog,
  IconButton,
  CircularProgress
} from '@mui/material';
import { ArrowBack, Close, NavigateBefore, NavigateNext } from '@mui/icons-material';
import apiService from '../services/apiService';
import { API_ENDPOINTS, SERVER_BASE_URL } from '../config/api';

export default function GalleryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchGallery();
  }, [id]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentIndex]);

  const fetchGallery = async () => {
    try {
      const data = await apiService.get(`${API_ENDPOINTS.gallery.getAll}/${id}`);
      setGallery(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % gallery.images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(gallery.images[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + gallery.images.length) % gallery.images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(gallery.images[prevIndex]);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!gallery) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Gallery not found</Typography>
      </Container>
    );
  }

  const API_URL = SERVER_BASE_URL;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FAFAFA', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <IconButton onClick={() => navigate('/gallery')} sx={{ mb: 3 }}>
          <ArrowBack />
        </IconButton>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            {gallery.title}
          </Typography>
          {gallery.description && (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {gallery.description}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            {new Date(gallery.date).toLocaleDateString('hi-IN')} • {gallery.images.length} फोटो
          </Typography>
        </Box>

        <ImageList variant="masonry" cols={3} gap={16} sx={{ 
          '@media (max-width: 900px)': { columnCount: 2 },
          '@media (max-width: 600px)': { columnCount: 1 }
        }}>
          {gallery.images.map((image, index) => (
            <ImageListItem
              key={image._id}
              onClick={() => handleImageClick(image, index)}
              sx={{
                cursor: 'pointer',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': { 
                  transform: 'scale(1.02)',
                  boxShadow: '0 8px 24px rgba(230, 81, 0, 0.2)'
                }
              }}
            >
              <img
                src={`${API_URL}${image.url}`}
                alt={image.caption || gallery.title}
                loading="lazy"
                style={{ borderRadius: '12px', display: 'block', width: '100%' }}
              />
            </ImageListItem>
          ))}
        </ImageList>

        <Dialog
          open={!!selectedImage}
          onClose={handleClose}
          maxWidth="xl"
          fullWidth
          PaperProps={{ 
            sx: { 
              backgroundColor: 'rgba(0,0,0,0.95)',
              m: 2
            } 
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              color: 'white', 
              zIndex: 2,
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
            }}
          >
            <Close />
          </IconButton>

          {selectedImage && (
            <Box sx={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              minHeight: '80vh',
              p: { xs: 2, md: 4 }
            }}>
              {gallery.images.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrev}
                    sx={{ 
                      position: 'absolute', 
                      left: { xs: 8, md: 16 }, 
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                      zIndex: 1
                    }}
                  >
                    <NavigateBefore fontSize="large" />
                  </IconButton>

                  <IconButton
                    onClick={handleNext}
                    sx={{ 
                      position: 'absolute', 
                      right: { xs: 8, md: 16 }, 
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                      zIndex: 1
                    }}
                  >
                    <NavigateNext fontSize="large" />
                  </IconButton>
                </>
              )}

              <Box sx={{ textAlign: 'center', maxWidth: '100%' }}>
                <img
                  src={`${API_URL}${selectedImage.url}`}
                  alt={selectedImage.caption}
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '75vh', 
                    borderRadius: '8px',
                    objectFit: 'contain'
                  }}
                />
                {selectedImage.caption && (
                  <Typography variant="body1" sx={{ color: 'white', mt: 2, px: 2 }}>
                    {selectedImage.caption}
                  </Typography>
                )}
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1, display: 'block' }}>
                  {currentIndex + 1} / {gallery.images.length}
                </Typography>
              </Box>
            </Box>
          )}
        </Dialog>
      </Container>
    </Box>
  );
}
