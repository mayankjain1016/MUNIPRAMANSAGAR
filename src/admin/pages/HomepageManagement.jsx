import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, IconButton, Card, CardContent,
  CardMedia, Grid, Alert, Switch, FormControlLabel
} from '@mui/material';
import { Edit, Save } from '@mui/icons-material';
import featuredVideoService from '../../services/featuredVideoService';

const POSITIONS = [
  { value: 1, label: 'Position 1 (Left)' },
  { value: 2, label: 'Position 2 (Right)' }
];

export default function HomepageManagement() {
  const [videos, setVideos] = useState({});
  const [open, setOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    youtubeUrl: '',
    isActive: true
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await featuredVideoService.getAllFeaturedVideos();
      const videoMap = {};
      data.forEach(video => {
        videoMap[video.position] = video;
      });
      setVideos(videoMap);
    } catch (err) {
      setError('Failed to fetch featured videos');
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

  const handleOpen = (position) => {
    setEditingPosition(position);
    const video = videos[position];
    if (video) {
      setFormData({
        title: video.title,
        youtubeUrl: video.youtubeUrl,
        isActive: video.isActive
      });
    } else {
      setFormData({
        title: '',
        youtubeUrl: '',
        isActive: true
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    setEditingPosition(null);
  };

  const handleSubmit = async () => {
    try {
      if (!formData.title || !formData.youtubeUrl) {
        setError('Title and YouTube URL are required');
        return;
      }

      const data = await featuredVideoService.upsertFeaturedVideo(editingPosition, {
        title: formData.title,
        youtubeUrl: formData.youtubeUrl,
        isActive: formData.isActive
      });

      const newVideos = { ...videos };
      newVideos[editingPosition] = data;
      setVideos(newVideos);

      setSuccess(`Video ${editingPosition} updated successfully`);
      handleClose();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Operation failed');
    }
  };

  const handleToggle = async (position) => {
    try {
      const data = await featuredVideoService.toggleFeaturedVideo(position);
      const newVideos = { ...videos };
      newVideos[position] = data;
      setVideos(newVideos);
      setSuccess(`Video ${position} ${data.isActive ? 'activated' : 'deactivated'}`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to toggle video');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Homepage Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage the two featured videos displayed after the gallery on your homepage
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Grid container spacing={3}>
        {[1, 2].map((position) => {
          const video = videos[position];
          return (
            <Grid item xs={12} md={6} key={position}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {video && video.thumbnail && (
                  <CardMedia
                    component="img"
                    height="250"
                    image={video.thumbnail}
                    alt={video.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">
                      {POSITIONS.find(p => p.value === position)?.label}
                    </Typography>
                    {video && (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={video.isActive}
                            onChange={() => handleToggle(position)}
                          />
                        }
                        label={video.isActive ? 'Active' : 'Inactive'}
                        sx={{ m: 0 }}
                      />
                    )}
                  </Box>

                  {video ? (
                    <>
                      <Typography variant="subtitle1" gutterBottom noWrap>
                        {video.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {video.youtubeUrl}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Video ID: {video.videoId}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      No video configured yet. Click "Edit" to add one.
                    </Typography>
                  )}
                </CardContent>

                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => handleOpen(position)}
                  >
                    {video ? 'Edit' : 'Add'} Video
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit {POSITIONS.find(p => p.value === editingPosition)?.label}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Video Title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              helperText="This title will be displayed on the homepage"
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
                  style={{ maxWidth: '100%', borderRadius: 8, marginTop: 8 }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Thumbnail Preview
                </Typography>
              </Box>
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              }
              label="Active (Display on homepage)"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" startIcon={<Save />}>
            Save Video
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
