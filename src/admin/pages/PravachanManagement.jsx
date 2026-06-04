import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, IconButton, Card, CardContent,
  CardMedia, Grid, Chip, Alert, FormControlLabel, Switch, Badge
} from '@mui/material';
import { Add, Edit, Delete, Visibility, CloudUpload, LiveTv } from '@mui/icons-material';
import { pravachanService } from '../../services/pravachanService';

const CATEGORIES = [
  { value: 'navin', label: 'नवीन प्रवचन' },
  { value: 'swadhyay', label: 'स्वाध्याय श्रृंखला' },
  { value: 'samast', label: 'समस्त प्रवचन' },
  { value: 'mala', label: 'प्रवचन माला' }
];

export default function PravachanManagement() {
  const [pravachans, setPravachans] = useState([]);
  const [open, setOpen] = useState(false);
  const [liveDialogOpen, setLiveDialogOpen] = useState(false);
  const [selectedPravachan, setSelectedPravachan] = useState(null);
  const [liveUrl, setLiveUrl] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
    thumbnail: '',
    category: 'navin',
    description: '',
    duration: ''
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [useYoutubeThumbnail, setUseYoutubeThumbnail] = useState(true);

  useEffect(() => {
    fetchPravachans();
  }, []);

  const fetchPravachans = async () => {
    try {
      const data = await pravachanService.getAllPravachans();
      setPravachans(data);
    } catch (err) {
      setError('Failed to fetch pravachans');
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

  const getYoutubeThumbnail = (url) => {
    const videoId = extractVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  };

  const handleOpen = (pravachan = null) => {
    if (pravachan) {
      setEditMode(true);
      setCurrentId(pravachan._id);
      setFormData({
        title: pravachan.title,
        videoUrl: pravachan.videoUrl,
        thumbnail: pravachan.thumbnail || '',
        category: pravachan.category,
        description: pravachan.description || '',
        duration: pravachan.duration || ''
      });
      setThumbnailPreview(pravachan.thumbnail || '');
      setUseYoutubeThumbnail(!pravachan.thumbnail || pravachan.thumbnail.includes('youtube.com'));
    } else {
      setEditMode(false);
      setCurrentId(null);
      setFormData({
        title: '',
        videoUrl: '',
        thumbnail: '',
        category: 'navin',
        description: '',
        duration: ''
      });
      setThumbnailPreview('');
      setUseYoutubeThumbnail(true);
    }
    setThumbnailFile(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    setThumbnailFile(null);
    setThumbnailPreview('');
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUrlChange = (url) => {
    setFormData({ ...formData, videoUrl: url });
    if (useYoutubeThumbnail) {
      const ytThumbnail = getYoutubeThumbnail(url);
      if (ytThumbnail) {
        setThumbnailPreview(ytThumbnail);
        setFormData(prev => ({ ...prev, thumbnail: ytThumbnail }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      let finalData = { ...formData };
      
      // If using YouTube thumbnail, auto-generate it
      if (useYoutubeThumbnail && formData.videoUrl) {
        finalData.thumbnail = getYoutubeThumbnail(formData.videoUrl);
      } else if (thumbnailFile) {
        // Upload custom thumbnail (implement upload endpoint if needed)
        // For now, we'll use the preview URL
        finalData.thumbnail = thumbnailPreview;
      }

      if (editMode) {
        await pravachanService.updatePravachan(currentId, finalData);
        setSuccess('Pravachan updated successfully');
      } else {
        await pravachanService.createPravachan(finalData);
        setSuccess('Pravachan created successfully');
      }
      fetchPravachans();
      handleClose();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pravachan?')) {
      try {
        await pravachanService.deletePravachan(id);
        setSuccess('Pravachan deleted successfully');
        fetchPravachans();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete pravachan');
      }
    }
  };

  const handleLiveDialogOpen = (pravachan) => {
    setSelectedPravachan(pravachan);
    setLiveUrl(pravachan.liveVideoUrl || pravachan.videoUrl);
    setLiveDialogOpen(true);
  };

  const handleSetLive = async () => {
    try {
      await pravachanService.setLiveVideo(selectedPravachan._id, liveUrl);
      setSuccess('Live video set successfully');
      fetchPravachans();
      setLiveDialogOpen(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to set live video');
    }
  };

  const handleUnsetLive = async (id) => {
    if (window.confirm('Stop live streaming?')) {
      try {
        await pravachanService.unsetLiveVideo(id);
        setSuccess('Live streaming stopped');
        fetchPravachans();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to stop live video');
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5, fontSize: { xs: '1.5rem', sm: '1.875rem' } }}>
            प्रवचन Management
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>
            Manage video pravachans and categories
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
          Add Pravachan
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
        {pravachans.map((pravachan) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pravachan._id}>
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
                height="180"
                image={pravachan.thumbnail || 'https://via.placeholder.com/400x200?text=No+Thumbnail'}
                alt={pravachan.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ p: 3 }}>
                {pravachan.isLive && (
                  <Chip
                    icon={<LiveTv />}
                    label="LIVE"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      fontWeight: 700,
                      animation: 'pulse 2s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%, 100%': { opacity: 1 },
                        '50%': { opacity: 0.8 }
                      }
                    }}
                  />
                )}
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
                  {pravachan.title}
                </Typography>
                <Chip 
                  label={CATEGORIES.find(c => c.value === pravachan.category)?.label} 
                  size="small" 
                  sx={{ 
                    mb: 1.5,
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    fontWeight: 600,
                    border: '1px solid #fde68a',
                  }}
                />
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
                  {pravachan.description?.substring(0, 80)}...
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                  <Chip 
                    icon={<Visibility sx={{ fontSize: 16 }} />} 
                    label={pravachan.views} 
                    size="small"
                    sx={{
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      fontWeight: 500,
                    }}
                  />
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {pravachan.isLive ? (
                      <IconButton
                        size="small"
                        onClick={() => handleUnsetLive(pravachan._id)}
                        sx={{
                          color: '#ef4444',
                          '&:hover': { backgroundColor: '#fee2e2' }
                        }}
                      >
                        <LiveTv fontSize="small" />
                      </IconButton>
                    ) : (
                      <IconButton
                        size="small"
                        onClick={() => handleLiveDialogOpen(pravachan)}
                        sx={{
                          color: '#10b981',
                          '&:hover': { backgroundColor: '#d1fae5' }
                        }}
                      >
                        <LiveTv fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton 
                      size="small" 
                      onClick={() => handleOpen(pravachan)}
                      sx={{
                        color: '#3b82f6',
                        '&:hover': { backgroundColor: '#eff6ff' }
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDelete(pravachan._id)}
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

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, color: '#0f172a' }}>
          {editMode ? 'Edit Pravachan' : 'Add New Pravachan'}
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
              label="Video URL"
              fullWidth
              value={formData.videoUrl}
              onChange={(e) => handleVideoUrlChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={useYoutubeThumbnail}
                  onChange={(e) => {
                    setUseYoutubeThumbnail(e.target.checked);
                    if (e.target.checked && formData.videoUrl) {
                      const ytThumbnail = getYoutubeThumbnail(formData.videoUrl);
                      setThumbnailPreview(ytThumbnail);
                    }
                  }}
                />
              }
              label="Auto-fetch thumbnail from YouTube"
            />
            
            {!useYoutubeThumbnail && (
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                fullWidth
                sx={{
                  borderColor: '#e2e8f0',
                  color: '#64748b',
                  textTransform: 'none',
                  py: 1.5,
                  '&:hover': {
                    borderColor: '#f97316',
                    backgroundColor: '#fff7ed',
                    color: '#f97316',
                  }
                }}
              >
                {thumbnailFile ? thumbnailFile.name : 'Upload Custom Thumbnail'}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />
              </Button>
            )}
            
            {thumbnailPreview && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <img 
                  src={thumbnailPreview} 
                  alt="Thumbnail Preview" 
                  style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mt: 1 }}>
                  Thumbnail Preview
                </Typography>
              </Box>
            )}
            <TextField
              select
              label="Category"
              fullWidth
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <TextField
              label="Duration"
              fullWidth
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., 45:30"
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

      {/* Live Video Dialog */}
      <Dialog open={liveDialogOpen} onClose={() => setLiveDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, color: '#0f172a' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LiveTv sx={{ color: '#ef4444' }} />
            Go Live
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              Set this pravachan as live. It will be displayed prominently on the Pravachan page.
            </Alert>
            <TextField
              label="Live Video URL"
              fullWidth
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              This URL will be used for the live stream. If not specified, the regular video URL will be used.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setLiveDialogOpen(false)}
            sx={{
              color: '#64748b',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSetLive}
            variant="contained"
            startIcon={<LiveTv />}
            sx={{
              backgroundColor: '#ef4444',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#dc2626',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
              }
            }}
          >
            Go Live
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
