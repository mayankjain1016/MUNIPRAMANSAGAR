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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import { Edit, Delete, Add, Image as ImageIcon, Save, Cancel } from '@mui/icons-material';
import WordPadEditor from '../components/WordPadEditor';
import apiService from '../../services/apiService';
import { API_ENDPOINTS, SERVER_BASE_URL } from '../../config/api';

export default function NewsManagement() {
  const [news, setNews] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentNews, setCurrentNews] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'general',
    date: new Date().toISOString().split('T')[0],
    isPublished: true,
  });
  const [editMode, setEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await apiService.get(API_ENDPOINTS.news.getAll);
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (newsItem = null) => {
    if (newsItem) {
      setCurrentNews({
        ...newsItem,
        date: new Date(newsItem.date).toISOString().split('T')[0],
      });
      setImagePreview(newsItem.image ? `${SERVER_BASE_URL}${newsItem.image}` : '');
      setEditMode(true);
    } else {
      setCurrentNews({
        title: '',
        content: '',
        excerpt: '',
        category: 'general',
        date: new Date().toISOString().split('T')[0],
        isPublished: true,
      });
      setImagePreview('');
      setImageFile(null);
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImageFile(null);
    setImagePreview('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', currentNews.title);
      formData.append('content', currentNews.content);
      formData.append('excerpt', currentNews.excerpt);
      formData.append('category', currentNews.category);
      formData.append('date', currentNews.date);
      formData.append('isPublished', currentNews.isPublished);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (editMode) {
        await apiService.put(API_ENDPOINTS.news.update(currentNews._id), formData);
      } else {
        await apiService.post(API_ENDPOINTS.news.create, formData);
      }
      
      fetchNews();
      handleClose();
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Error saving news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      try {
        await apiService.delete(API_ENDPOINTS.news.delete(id));
        fetchNews();
      } catch (error) {
        console.error('Error deleting news:', error);
        alert('Failed to delete news article. Please try again.');
      }
    }
  };

  const getStatusColor = (isPublished) => {
    return isPublished ? 'success' : 'warning';
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: 'default',
      event: 'primary',
      announcement: 'secondary',
      media: 'info'
    };
    return colors[category] || 'default';
  };

  const publishedNews = news.filter(item => item.isPublished);
  const draftNews = news.filter(item => !item.isPublished);

  const renderNewsList = (newsList) => (
    <Grid container spacing={3}>
      {newsList.map((item) => (
        <Grid item xs={12} md={6} lg={4} key={item._id}>
          <Card elevation={0} sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            border: '1px solid #e2e8f0',
            borderRadius: 3,
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
            }
          }}>
            {item.image && (
              <Box
                component="img"
                src={`${SERVER_BASE_URL}${item.image}`}
                alt={item.title}
                sx={{
                  height: 200,
                  objectFit: 'cover',
                  width: '100%',
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
            )}
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label={item.isPublished ? 'Published' : 'Draft'} 
                  size="small"
                  sx={{
                    backgroundColor: item.isPublished ? '#dcfce7' : '#fef3c7',
                    color: item.isPublished ? '#166534' : '#92400e',
                    fontWeight: 600,
                    border: `1px solid ${item.isPublished ? '#bbf7d0' : '#fde68a'}`,
                  }}
                />
                <Chip 
                  label={item.category} 
                  size="small"
                  sx={{
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    fontWeight: 600,
                    border: '1px solid #e2e8f0',
                  }}
                />
              </Box>
              <Typography variant="h6" sx={{ 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                fontWeight: 600,
                color: '#0f172a',
                mb: 1.5,
                fontSize: '1.1rem',
              }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                mb: 2,
                color: '#64748b',
                lineHeight: 1.6,
              }}>
                {item.excerpt || item.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                {new Date(item.date).toLocaleDateString('hi-IN')} • {item.views} views
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
              <IconButton 
                size="small" 
                onClick={() => handleOpen(item)}
                sx={{
                  color: '#3b82f6',
                  '&:hover': { backgroundColor: '#eff6ff' }
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                onClick={() => handleDelete(item._id)}
                sx={{
                  color: '#ef4444',
                  '&:hover': { backgroundColor: '#fef2f2' }
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5, fontSize: '1.875rem' }}>News Management</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>
            Manage news articles with WordPad-style editor
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
          Create Article
        </Button>
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5 }}>{news.length}</Typography>
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Total Articles</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #bbf7d0', backgroundColor: '#f0fdf4' }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#10b981', mb: 0.5 }}>{publishedNews.length}</Typography>
            <Typography variant="body2" sx={{ color: '#059669', fontWeight: 500 }}>Published</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #fde68a', backgroundColor: '#fefce8' }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#f59e0b', mb: 0.5 }}>{draftNews.length}</Typography>
            <Typography variant="body2" sx={{ color: '#d97706', fontWeight: 500 }}>Drafts</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: '#e2e8f0', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#64748b',
              '&.Mui-selected': {
                color: '#f97316',
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#f97316',
            }
          }}
        >
          <Tab label={`All (${news.length})`} />
          <Tab label={`Published (${publishedNews.length})`} />
          <Tab label={`Drafts (${draftNews.length})`} />
        </Tabs>
      </Box>

      {/* News List */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {tabValue === 0 && renderNewsList(news)}
          {tabValue === 1 && renderNewsList(publishedNews)}
          {tabValue === 2 && renderNewsList(draftNews)}
        </>
      )}

      {/* Create/Edit Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="lg" 
        fullWidth
        disableScrollLock
      >
        <DialogTitle>
          {editMode ? 'Edit News Article' : 'Create News Article'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              value={currentNews.title}
              onChange={(e) => setCurrentNews({ ...currentNews, title: e.target.value })}
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Excerpt (Short Description)"
              value={currentNews.excerpt}
              onChange={(e) => setCurrentNews({ ...currentNews, excerpt: e.target.value })}
              margin="normal"
              multiline
              rows={2}
              helperText="Brief summary shown in news listings"
            />

            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Content (Rich Text Editor)
              </Typography>
              <WordPadEditor
                value={currentNews.content}
                onChange={(content) => setCurrentNews({ ...currentNews, content })}
              />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={currentNews.category}
                    onChange={(e) => setCurrentNews({ ...currentNews, category: e.target.value })}
                    label="Category"
                  >
                    <MenuItem value="general">General</MenuItem>
                    <MenuItem value="event">Event</MenuItem>
                    <MenuItem value="announcement">Announcement</MenuItem>
                    <MenuItem value="media">Media</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={currentNews.date}
                  onChange={(e) => setCurrentNews({ ...currentNews, date: e.target.value })}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Box sx={{ my: 3 }}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<ImageIcon />}
                fullWidth
              >
                Upload Featured Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {imagePreview && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
                  />
                </Box>
              )}
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={currentNews.isPublished}
                  onChange={(e) => setCurrentNews({ ...currentNews, isPublished: e.target.checked })}
                />
              }
              label="Publish immediately"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            startIcon={<Save />}
            disabled={loading || !currentNews.title || !currentNews.content}
          >
            {loading ? 'Saving...' : 'Save Article'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
