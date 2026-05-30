import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Alert,
  ImageList,
  ImageListItem,
  ImageListItemBar
} from '@mui/material';
import { Edit, Delete, Add, CloudUpload, Close } from '@mui/icons-material';
import apiService from '../../services/apiService';
import { API_ENDPOINTS } from '../../config/api';

export default function GalleryManagement() {
  const [galleries, setGalleries] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageDialog, setImageDialog] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [error, setError] = useState('');
  const [currentGallery, setCurrentGallery] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    isPublished: true,
  });
  const [editMode, setEditMode] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const data = await apiService.get(API_ENDPOINTS.gallery.getAll);
      setGalleries(data);
    } catch (error) {
      console.error('Error fetching galleries:', error);
    }
  };

  const handleOpen = (gallery = null) => {
    if (gallery) {
      setCurrentGallery({
        ...gallery,
        date: new Date(gallery.date).toISOString().split('T')[0],
      });
      setEditMode(true);
    } else {
      setCurrentGallery({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        isPublished: true,
      });
      setEditMode(false);
    }
    setCoverImageFile(null);
    setError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      setError('');
      const formData = new FormData();
      formData.append('title', currentGallery.title);
      formData.append('description', currentGallery.description);
      formData.append('date', currentGallery.date);
      formData.append('isPublished', currentGallery.isPublished);
      
      if (coverImageFile) {
        formData.append('coverImage', coverImageFile);
      } else if (!editMode) {
        setError('Please select a cover image');
        return;
      }

      const token = localStorage.getItem('token');
      const url = editMode 
        ? `${API_URL}/api/gallery/${currentGallery._id}` 
        : `${API_URL}/api/gallery`;
      
      const response = await fetch(url, {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to save gallery');
      
      fetchGalleries();
      handleClose();
    } catch (error) {
      setError(error.message);
      console.error('Error saving gallery:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery?')) {
      try {
        await apiService.delete(`${API_ENDPOINTS.gallery.getAll}/${id}`);
        fetchGalleries();
      } catch (error) {
        console.error('Error deleting gallery:', error);
      }
    }
  };

  const addImageField = () => {
    setCurrentGallery({
      ...currentGallery,
      images: [...currentGallery.images, { url: '', caption: '' }],
    });
  };

  const updateImage = (index, field, value) => {
    const newImages = [...currentGallery.images];
    newImages[index][field] = value;
    setCurrentGallery({ ...currentGallery, images: newImages });
  };

  const removeImage = (index) => {
    const newImages = currentGallery.images.filter((_, i) => i !== index);
    setCurrentGallery({ ...currentGallery, images: newImages });
  };

  const handleOpenImageDialog = (gallery) => {
    setSelectedGallery(gallery);
    setGalleryImages([]);
    setImageDialog(true);
  };

  const handleImageFilesChange = (e) => {
    setGalleryImages(Array.from(e.target.files));
  };

  const handleUploadImages = async () => {
    try {
      setError('');
      const formData = new FormData();
      galleryImages.forEach(file => {
        formData.append('images', file);
      });

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/gallery/${selectedGallery._id}/images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to upload images');
      
      fetchGalleries();
      setImageDialog(false);
    } catch (error) {
      setError(error.message);
      console.error('Error uploading images:', error);
    }
  };

  const handleDeleteImage = async (galleryId, imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await apiService.delete(`${API_ENDPOINTS.gallery.getAll}/${galleryId}/images/${imageId}`);
        fetchGalleries();
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5, fontSize: '1.875rem' }}>Gallery Management</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>
            Manage photo galleries and collections
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
          sx={{
            backgroundColor: '#f97316',
            color: '#ffffff',
            px: 3,
            py: 1.25,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#ea580c',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
            }
          }}
        >
          Add Gallery
        </Button>
      </Box>

      <Grid container spacing={3}>
        {galleries.map((gallery) => (
          <Grid item xs={12} sm={6} md={4} key={gallery._id}>
            <Card elevation={0} sx={{ 
              border: '1px solid #e2e8f0',
              borderRadius: 3,
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image={`${API_URL}${gallery.coverImage}`}
                alt={gallery.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a', mb: 1, fontSize: '1.1rem' }}>
                  {gallery.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 2, lineHeight: 1.6 }}>
                  {gallery.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Typography variant="caption" sx={{ 
                    px: 1.5, 
                    py: 0.5, 
                    backgroundColor: '#f1f5f9', 
                    borderRadius: 1,
                    color: '#475569',
                    fontWeight: 500,
                  }}>
                    {new Date(gallery.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    px: 1.5, 
                    py: 0.5, 
                    backgroundColor: '#fef3c7', 
                    borderRadius: 1,
                    color: '#92400e',
                    fontWeight: 500,
                  }}>
                    {gallery.images.length} images
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    px: 1.5, 
                    py: 0.5, 
                    backgroundColor: gallery.isPublished ? '#dcfce7' : '#fee2e2', 
                    borderRadius: 1,
                    color: gallery.isPublished ? '#166534' : '#991b1b',
                    fontWeight: 500,
                  }}>
                    {gallery.isPublished ? 'Published' : 'Draft'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mt: 2 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleOpenImageDialog(gallery)}
                    sx={{
                      borderColor: '#e2e8f0',
                      color: '#64748b',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#f97316',
                        backgroundColor: '#fff7ed',
                        color: '#f97316',
                      }
                    }}
                  >
                    Add Images
                  </Button>
                  <Box>
                    <IconButton 
                      onClick={() => handleOpen(gallery)} 
                      size="small"
                      sx={{
                        color: '#3b82f6',
                        '&:hover': { backgroundColor: '#eff6ff' }
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDelete(gallery._id)} 
                      size="small"
                      sx={{
                        color: '#ef4444',
                        '&:hover': { backgroundColor: '#fef2f2' }
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Gallery' : 'Add Gallery'}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <TextField
            fullWidth
            label="Title"
            value={currentGallery.title}
            onChange={(e) => setCurrentGallery({ ...currentGallery, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={currentGallery.description}
            onChange={(e) => setCurrentGallery({ ...currentGallery, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={currentGallery.date}
            onChange={(e) => setCurrentGallery({ ...currentGallery, date: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          
          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Cover Image
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
            >
              {coverImageFile ? coverImageFile.name : 'Upload Cover Image'}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setCoverImageFile(e.target.files[0])}
              />
            </Button>
            {editMode && currentGallery.coverImage && !coverImageFile && (
              <Box sx={{ mt: 2 }}>
                <img 
                  src={`${API_URL}${currentGallery.coverImage}`} 
                  alt="Current cover" 
                  style={{ maxWidth: '200px', borderRadius: '8px' }}
                />
              </Box>
            )}
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={currentGallery.isPublished}
                onChange={(e) => setCurrentGallery({ ...currentGallery, isPublished: e.target.checked })}
              />
            }
            label="Published"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Upload Dialog */}
      <Dialog open={imageDialog} onClose={() => setImageDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Add Images to {selectedGallery?.title}
          <IconButton
            onClick={() => setImageDialog(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUpload />}
            fullWidth
            sx={{ mb: 2 }}
          >
            Select Images (Max 20)
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={handleImageFilesChange}
            />
          </Button>

          {galleryImages.length > 0 && (
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {galleryImages.length} images selected
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {galleryImages.map((file, index) => (
                  <Box key={index} sx={{ width: 80, height: 80, position: 'relative' }}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {selectedGallery?.images?.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Current Images</Typography>
              <ImageList cols={4} gap={8}>
                {selectedGallery.images.map((image) => (
                  <ImageListItem key={image._id}>
                    <img
                      src={`${API_URL}${image.url}`}
                      alt={image.caption}
                      loading="lazy"
                      style={{ height: 120, objectFit: 'cover' }}
                    />
                    <ImageListItemBar
                      actionIcon={
                        <IconButton
                          sx={{ color: 'white' }}
                          onClick={() => handleDeleteImage(selectedGallery._id, image._id)}
                        >
                          <Delete />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleUploadImages} 
            variant="contained"
            disabled={galleryImages.length === 0}
          >
            Upload Images
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
