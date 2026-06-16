import { useState, useEffect } from 'react';
import {
  Box, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, IconButton, Card, CardContent,
  CardMedia, Grid, Alert, Switch, FormControlLabel, Typography
} from '@mui/material';
import { Add, Edit, Delete, DragIndicator } from '@mui/icons-material';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function PathshalaManagement() {
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${API_URL}/pathshala/admin`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const data = await response.json();
      setVideos(data);
    } catch (err) {
      setError('Failed to fetch videos');
      console.error(err);
    }
  };

  const extractVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const getThumbnail = (url) => {
    const videoId = extractVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  };

  const handleOpen = (video = null) => {
    if (video) {
      setEditMode(true);
      setCurrentId(video._id);
      setFormData({
        title: video.title,
        description: video.description,
        youtubeUrl: video.youtubeUrl,
        order: video.order,
        isActive: video.isActive
      });
    } else {
      setEditMode(false);
      setCurrentId(null);
      setFormData({
        title: '',
        description: '',
        youtubeUrl: '',
        order: videos.length,
        isActive: true
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      const response = editMode
        ? await fetch(`${API_URL}/pathshala/${currentId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
        : await fetch(`${API_URL}/pathshala`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Operation failed');
      }

      setSuccess(editMode ? 'Video updated successfully' : 'Video created successfully');
      fetchVideos();
      handleClose();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        const response = await fetch(`${API_URL}/pathshala/${id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error('Failed to delete');
        }

        setSuccess('Video deleted successfully');
        fetchVideos();
      } catch (err) {
        setError('Failed to delete video');
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5, fontSize: { xs: '1.5rem', sm: '1.875rem' } }}>
            पाठशाला Management
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>
            Manage educational videos and content
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
          Add Video
        </Button>
      </Box>

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            borderRadius: 2,
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
          }} 
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert 
          severity="success" 
          sx={{ 
            mb: 3,
            borderRadius: 2,
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#166534',
          }} 
          onClose={() => setSuccess('')}
        >
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
            <Card elevation={0} sx={{ 
              opacity: video.isActive ? 1 : 0.6,
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
                height="180"
                image={getThumbnail(video.youtubeUrl)}
                alt={video.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <DragIndicator sx={{ color: '#94a3b8', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                    Order: {video.order}
                  </Typography>
                  {!video.isActive && (
                    <Typography variant="caption" sx={{ ml: 'auto', color: '#ef4444', fontWeight: 600 }}>
                      Inactive
                    </Typography>
                  )}
                </Box>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  mb: 1.5,
                  color: '#0f172a',
                  fontSize: '1rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {video.title}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#64748b', 
                  mb: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.5,
                  fontSize: '0.85rem',
                }}>
                  {video.description?.substring(0, 80)}...
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleOpen(video)}
                    sx={{
                      color: '#3b82f6',
                      '&:hover': { backgroundColor: '#eff6ff' }
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDelete(video._id)}
                    sx={{
                      color: '#ef4444',
                      '&:hover': { backgroundColor: '#fef2f2' }
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, color: '#0f172a' }}>
          {editMode ? 'Edit Video' : 'Add New Video'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <TextField
              label="YouTube URL"
              fullWidth
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
              required
              helperText="Thumbnail will be automatically extracted from YouTube"
            />
            {formData.youtubeUrl && extractVideoId(formData.youtubeUrl) && (
              <Box sx={{ textAlign: 'center' }}>
                <img 
                  src={getThumbnail(formData.youtubeUrl)} 
                  alt="Preview" 
                  style={{ maxWidth: '100%', borderRadius: 12, border: '1px solid #e2e8f0' }}
                />
                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mt: 1 }}>
                  Thumbnail Preview
                </Typography>
              </Box>
            )}
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <TextField
              label="Order"
              type="number"
              fullWidth
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              helperText="Lower numbers appear first"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              }
              label="Active"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleClose}
            sx={{
              color: '#64748b',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{
              backgroundColor: '#f97316',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#ea580c',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
              }
            }}
          >
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
