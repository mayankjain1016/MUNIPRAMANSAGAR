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
import { API_ENDPOINTS } from '../config/api';

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

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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

        <ImageList variant="masonry" cols={3} gap={16}>
          {gallery.images.map((image, index) => (
            <ImageListItem
              key={image._id}
              onClick={() => handleImageClick(image, index)}
              sx={{
                cursor: 'pointer',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.02)' }
              }}
            >
              <img
                src={`${API_URL}${image.url}`}
                alt={image.caption || gallery.title}
                loading="lazy"
                style={{ borderRadius: '12px' }}
              />
            </ImageListItem>
          ))}
        </ImageList>

        <Dialog
          open={!!selectedImage}
          onClose={handleClose}
          maxWidth="lg"
          fullWidth
          PaperProps={{ sx: { backgroundColor: 'rgba(0,0,0,0.95)' } }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 16, right: 16, color: 'white', zIndex: 1 }}
          >
            <Close />
          </IconButton>

          {selectedImage && (
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
              <IconButton
                onClick={handlePrev}
                sx={{ position: 'absolute', left: 16, color: 'white' }}
              >
                <NavigateBefore fontSize="large" />
              </IconButton>

              <Box sx={{ textAlign: 'center' }}>
                <img
                  src={`${API_URL}${selectedImage.url}`}
                  alt={selectedImage.caption}
                  style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '8px' }}
                />
                {selectedImage.caption && (
                  <Typography variant="body1" sx={{ color: 'white', mt: 2 }}>
                    {selectedImage.caption}
                  </Typography>
                )}
              </Box>

              <IconButton
                onClick={handleNext}
                sx={{ position: 'absolute', right: 16, color: 'white' }}
              >
                <NavigateNext fontSize="large" />
              </IconButton>
            </Box>
          )}
        </Dialog>
      </Container>
    </Box>
  );
}
