import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, IconButton, Card, CardContent,
  CardMedia, Grid, Chip, Alert
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
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
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await pravachanService.updatePravachan(currentId, formData);
        setSuccess('Pravachan updated successfully');
      } else {
        await pravachanService.createPravachan(formData);
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

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">प्रवचन Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          Add Pravachan
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Grid container spacing={3}>
        {pravachans.map((pravachan) => (
          <Grid item xs={12} sm={6} md={4} key={pravachan._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={pravachan.thumbnail || 'https://via.placeholder.com/400x200?text=No+Thumbnail'}
                alt={pravachan.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom noWrap>{pravachan.title}</Typography>
                <Chip 
                  label={CATEGORIES.find(c => c.value === pravachan.category)?.label} 
                  size="small" 
                  color="primary" 
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {pravachan.description?.substring(0, 80)}...
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip icon={<Visibility />} label={pravachan.views} size="small" />
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton size="small" color="primary" onClick={() => handleOpen(pravachan)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(pravachan._id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Pravachan' : 'Add New Pravachan'}</DialogTitle>
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
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
            <TextField
              label="Thumbnail URL (Optional)"
              fullWidth
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              helperText="Leave empty to auto-generate from YouTube"
            />
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
