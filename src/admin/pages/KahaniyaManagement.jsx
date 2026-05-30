import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, IconButton, Card, CardContent,
  CardMedia, Grid, Alert, Switch, FormControlLabel
} from '@mui/material';
import { Add, Edit, Delete, DragIndicator } from '@mui/icons-material';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function KahaniyaManagement() {
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
      const response = await fetch(`${API_URL}/kahaniya/admin`, {
        credentials: 'include', // Send cookies
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
        ? await fetch(`${API_URL}/kahaniya/${currentId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
        : await fetch(`${API_URL}/kahaniya`, {
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
        const response = await fetch(`${API_URL}/kahaniya/${id}`, {
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
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">कहानियाँ Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          Add Video
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video._id}>
            <Card sx={{ opacity: video.isActive ? 1 : 0.6 }}>
              <CardMedia
                component="img"
                height="200"
                image={getThumbnail(video.youtubeUrl)}
                alt={video.title}
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <DragIndicator sx={{ color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    Order: {video.order}
                  </Typography>
                  {!video.isActive && (
                    <Typography variant="caption" color="error" sx={{ ml: 'auto' }}>
                      Inactive
                    </Typography>
                  )}
                </Box>
                <Typography variant="h6" gutterBottom noWrap>{video.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {video.description?.substring(0, 80)}...
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <IconButton size="small" color="primary" onClick={() => handleOpen(video)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(video._id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Video' : 'Add New Video'}</DialogTitle>
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
                  style={{ maxWidth: '100%', borderRadius: 8 }}
                />
                <Typography variant="caption" color="text.secondary">Thumbnail Preview</Typography>
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
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
