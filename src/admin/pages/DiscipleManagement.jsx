import { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, TextField, Paper, Alert, CircularProgress, 
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Grid, Card, 
  CardMedia, CardContent
} from '@mui/material';
import { Add, Edit, Delete, Close } from '@mui/icons-material';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function DiscipleManagement() {
  const [disciples, setDisciples] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDisciple, setEditingDisciple] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    image: '',
    description: '',
    order: 0
  });

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
    }
  };

  const handleOpenDialog = (disciple = null) => {
    if (disciple) {
      setEditingDisciple(disciple);
      setFormData({
        name: disciple.name,
        title: disciple.title,
        image: disciple.image,
        description: disciple.description || '',
        order: disciple.order
      });
    } else {
      setEditingDisciple(null);
      setFormData({
        name: '',
        title: '',
        image: '',
        description: '',
        order: 0
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDisciple(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const url = editingDisciple 
        ? `${API_URL}/disciples/${editingDisciple._id}` 
        : `${API_URL}/disciples`;
      const method = editingDisciple ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: `शिष्य ${editingDisciple ? 'updated' : 'created'} successfully!` });
        fetchDisciples();
        handleCloseDialog();
      } else {
        setMessage({ type: 'error', text: 'Failed to save शिष्य' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this शिष्य?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/disciples/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'शिष्य deleted successfully!' });
        fetchDisciples();
      } else {
        setMessage({ type: 'error', text: 'Failed to delete शिष्य' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#E65100' }}>
            शिष्य Management
          </Typography>
          <Typography variant="body2" sx={{ color: '#757575', mt: 0.5 }}>
            Total शिष्य: {disciples.length}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ 
            background: 'linear-gradient(135deg, #FF9800 0%, #E65100 100%)',
            '&:hover': { background: 'linear-gradient(135deg, #FB8C00 0%, #D84315 100%)' }
          }}
        >
          Add शिष्य
        </Button>
      </Box>

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 3 }} onClose={() => setMessage({ type: '', text: '' })}>
          {message.text}
        </Alert>
      )}

      <Grid container spacing={3}>
        {disciples.map(disciple => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={disciple._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={disciple.image}
                alt={disciple.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {disciple.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {disciple.title}
                </Typography>
                {disciple.description && (
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {disciple.description}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleOpenDialog(disciple)}
                    sx={{ color: '#FF9800' }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDelete(disciple._id)}
                    sx={{ color: '#f44336' }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {disciples.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No शिष्य added yet. Click "Add शिष्य" to get started.
          </Typography>
        </Paper>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {editingDisciple ? 'Edit शिष्य' : 'Add New शिष्य'}
            </Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              sx={{ mb: 2 }}
              placeholder="e.g., मुनि श्री अभय सागर जी"
            />
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              sx={{ mb: 2 }}
              placeholder="e.g., वरिष्ठ शिष्य"
            />
            <TextField
              fullWidth
              label="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
              sx={{ mb: 2 }}
              placeholder="/src/assets/disciple.jpg"
            />
            <TextField
              fullWidth
              label="Description (Optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
              sx={{ mb: 2 }}
              placeholder="Brief description about the शिष्य"
            />
            <TextField
              fullWidth
              type="number"
              label="Order"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              helperText="Lower numbers appear first"
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained"
              disabled={loading}
              sx={{ 
                background: 'linear-gradient(135deg, #FF9800 0%, #E65100 100%)',
                '&:hover': { background: 'linear-gradient(135deg, #FB8C00 0%, #D84315 100%)' }
              }}
            >
              {loading ? <CircularProgress size={24} /> : editingDisciple ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}
