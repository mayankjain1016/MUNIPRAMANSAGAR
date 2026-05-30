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
  Paper,
  IconButton,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import { Edit, Delete, Add, VideoLibrary, QuestionAnswer, CloudUpload } from '@mui/icons-material';
import apiService from '../../services/apiService';
import { API_ENDPOINTS } from '../../config/api';

export default function ShankaSamadhanManagement() {
  const [tabValue, setTabValue] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [clips, setClips] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    answer: '',
    category: 'general',
    slug: '',
    isPublished: true,
    isPopular: false,
  });
  const [currentClip, setCurrentClip] = useState({
    title: '',
    videoUrl: '',
    duration: '',
    thumbnail: '',
    isPublished: true,
    isPopular: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [useYoutubeThumbnail, setUseYoutubeThumbnail] = useState(true);

  useEffect(() => {
    fetchQuestions();
    fetchClips();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await apiService.get(API_ENDPOINTS.shankaSamadhan.getAll);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const fetchClips = async () => {
    try {
      const data = await apiService.get(API_ENDPOINTS.shankaSamadhan.clips.getAll);
      setClips(data);
    } catch (error) {
      console.error('Error fetching clips:', error);
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

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleOpenQuestion = (question = null) => {
    if (question) {
      setCurrentQuestion(question);
      setEditMode(true);
    } else {
      setCurrentQuestion({
        question: '',
        answer: '',
        category: 'general',
        slug: '',
        isPublished: true,
        isPopular: false,
      });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleOpenClip = (clip = null) => {
    if (clip) {
      setCurrentClip(clip);
      setEditMode(true);
      setThumbnailPreview(clip.thumbnail || '');
      setUseYoutubeThumbnail(!clip.thumbnail || clip.thumbnail.includes('youtube.com'));
    } else {
      setCurrentClip({
        title: '',
        videoUrl: '',
        duration: '',
        thumbnail: '',
        isPublished: true,
        isPopular: false,
      });
      setEditMode(false);
      setThumbnailPreview('');
      setUseYoutubeThumbnail(true);
    }
    setThumbnailFile(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    setCurrentClip({ ...currentClip, videoUrl: url });
    if (useYoutubeThumbnail) {
      const ytThumbnail = getYoutubeThumbnail(url);
      if (ytThumbnail) {
        setThumbnailPreview(ytThumbnail);
        setCurrentClip(prev => ({ ...prev, thumbnail: ytThumbnail }));
      }
    }
  };

  const handleSaveQuestion = async () => {
    try {
      const dataToSave = {
        ...currentQuestion,
        slug: currentQuestion.slug || generateSlug(currentQuestion.question),
      };

      if (editMode) {
        await apiService.put(`${API_ENDPOINTS.shankaSamadhan.getAll}/${currentQuestion._id}`, dataToSave);
      } else {
        await apiService.post(API_ENDPOINTS.shankaSamadhan.getAll, dataToSave);
      }
      fetchQuestions();
      handleClose();
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  const handleSaveClip = async () => {
    try {
      let finalData = { ...currentClip };
      
      // If using YouTube thumbnail, auto-generate it
      if (useYoutubeThumbnail && currentClip.videoUrl) {
        finalData.thumbnail = getYoutubeThumbnail(currentClip.videoUrl);
      } else if (thumbnailFile) {
        // For custom thumbnail, use preview (implement upload endpoint if needed)
        finalData.thumbnail = thumbnailPreview;
      }

      if (editMode) {
        await apiService.put(`${API_ENDPOINTS.shankaSamadhan.clips.getAll}/${currentClip._id}`, finalData);
      } else {
        await apiService.post(API_ENDPOINTS.shankaSamadhan.clips.getAll, finalData);
      }
      fetchClips();
      handleClose();
    } catch (error) {
      console.error('Error saving clip:', error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await apiService.delete(`${API_ENDPOINTS.shankaSamadhan.getAll}/${id}`);
        fetchQuestions();
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
  };

  const handleDeleteClip = async (id) => {
    if (window.confirm('Are you sure you want to delete this clip?')) {
      try {
        await apiService.delete(`${API_ENDPOINTS.shankaSamadhan.clips.getAll}/${id}`);
        fetchClips();
      } catch (error) {
        console.error('Error deleting clip:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5, fontSize: { xs: '1.5rem', sm: '1.875rem' } }}>
            Shanka Samadhan Management
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>
            Manage questions, answers, and video clips
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => tabValue === 0 ? handleOpenQuestion() : handleOpenClip()}
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
          {tabValue === 0 ? 'Add Question' : 'Add Clip'}
        </Button>
      </Box>

      <Tabs 
        value={tabValue} 
        onChange={(e, v) => setTabValue(v)} 
        sx={{ 
          mb: 3,
          borderBottom: 1,
          borderColor: '#e2e8f0',
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
        <Tab icon={<QuestionAnswer />} label="Questions (FAQ)" iconPosition="start" />
        <Tab icon={<VideoLibrary />} label="Clips" iconPosition="start" />
      </Tabs>

      {tabValue === 0 && (
        <Box>
          {questions.map((item) => (
            <Paper key={item._id} elevation={0} sx={{ 
              p: 3, 
              mb: 2.5,
              border: '1px solid #e2e8f0',
              borderRadius: 3,
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
              }
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a', fontSize: '1.1rem' }}>
                      {item.question}
                    </Typography>
                    {item.isPopular && (
                      <Chip 
                        label="Popular" 
                        size="small"
                        sx={{
                          backgroundColor: '#fef3c7',
                          color: '#92400e',
                          fontWeight: 600,
                          border: '1px solid #fde68a',
                        }}
                      />
                    )}
                    <Chip 
                      label={item.isPublished ? 'Published' : 'Draft'} 
                      size="small"
                      sx={{
                        backgroundColor: item.isPublished ? '#dcfce7' : '#f1f5f9',
                        color: item.isPublished ? '#166534' : '#64748b',
                        fontWeight: 600,
                        border: `1px solid ${item.isPublished ? '#bbf7d0' : '#e2e8f0'}`,
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: '#64748b', mt: 1.5, lineHeight: 1.6 }}>
                    {item.answer.substring(0, 150)}...
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                    <Typography variant="caption" sx={{ 
                      px: 1.5, 
                      py: 0.5, 
                      backgroundColor: '#f1f5f9', 
                      borderRadius: 1,
                      color: '#475569',
                      fontWeight: 500,
                    }}>
                      {item.category}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                      {item.views} views
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton 
                    onClick={() => handleOpenQuestion(item)}
                    sx={{
                      color: '#3b82f6',
                      '&:hover': { backgroundColor: '#eff6ff' }
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDeleteQuestion(item._id)}
                    sx={{
                      color: '#ef4444',
                      '&:hover': { backgroundColor: '#fef2f2' }
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          {clips.map((item) => (
            <Paper key={item._id} elevation={0} sx={{ 
              p: 3, 
              mb: 2.5,
              border: '1px solid #e2e8f0',
              borderRadius: 3,
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
              }
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a', fontSize: '1.1rem' }}>
                      {item.title}
                    </Typography>
                    {item.isPopular && (
                      <Chip 
                        label="Popular" 
                        size="small"
                        sx={{
                          backgroundColor: '#fef3c7',
                          color: '#92400e',
                          fontWeight: 600,
                          border: '1px solid #fde68a',
                        }}
                      />
                    )}
                    <Chip 
                      label={item.isPublished ? 'Published' : 'Draft'} 
                      size="small"
                      sx={{
                        backgroundColor: item.isPublished ? '#dcfce7' : '#f1f5f9',
                        color: item.isPublished ? '#166534' : '#64748b',
                        fontWeight: 600,
                        border: `1px solid ${item.isPublished ? '#bbf7d0' : '#e2e8f0'}`,
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                    <Typography variant="caption" sx={{ 
                      px: 1.5, 
                      py: 0.5, 
                      backgroundColor: '#f1f5f9', 
                      borderRadius: 1,
                      color: '#475569',
                      fontWeight: 500,
                    }}>
                      {item.duration}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                      {item.views} views
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton 
                    onClick={() => handleOpenClip(item)}
                    sx={{
                      color: '#3b82f6',
                      '&:hover': { backgroundColor: '#eff6ff' }
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDeleteClip(item._id)}
                    sx={{
                      color: '#ef4444',
                      '&:hover': { backgroundColor: '#fef2f2' }
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {/* Question Dialog */}
      <Dialog open={open && tabValue === 0} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Question' : 'Add Question'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Question"
            value={currentQuestion.question}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
            margin="normal"
            multiline
            rows={2}
          />
          <TextField
            fullWidth
            label="Answer"
            value={currentQuestion.answer}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, answer: e.target.value })}
            margin="normal"
            multiline
            rows={6}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={currentQuestion.category}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, category: e.target.value })}
              label="Category"
            >
              <MenuItem value="spiritual">Spiritual</MenuItem>
              <MenuItem value="moral">Moral</MenuItem>
              <MenuItem value="life">Life</MenuItem>
              <MenuItem value="youth">Youth</MenuItem>
              <MenuItem value="family">Family</MenuItem>
              <MenuItem value="general">General</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Slug"
            value={currentQuestion.slug}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, slug: e.target.value })}
            margin="normal"
            helperText="Leave empty to auto-generate from question"
          />
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={currentQuestion.isPublished}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, isPublished: e.target.checked })}
                />
              }
              label="Published"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={currentQuestion.isPopular}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, isPopular: e.target.checked })}
                />
              }
              label="Popular"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveQuestion} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Clip Dialog */}
      <Dialog open={open && tabValue === 1} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Clip' : 'Add Clip'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={currentClip.title}
            onChange={(e) => setCurrentClip({ ...currentClip, title: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Video URL (YouTube/Vimeo)"
            value={currentClip.videoUrl}
            onChange={(e) => handleVideoUrlChange(e.target.value)}
            margin="normal"
            helperText="Enter YouTube or Vimeo video URL"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={useYoutubeThumbnail}
                onChange={(e) => {
                  setUseYoutubeThumbnail(e.target.checked);
                  if (e.target.checked && currentClip.videoUrl) {
                    const ytThumbnail = getYoutubeThumbnail(currentClip.videoUrl);
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
              sx={{ mt: 2 }}
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
                style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
              />
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                Thumbnail Preview
              </Typography>
            </Box>
          )}
          
          <TextField
            fullWidth
            label="Duration (e.g., 12:45)"
            value={currentClip.duration}
            onChange={(e) => setCurrentClip({ ...currentClip, duration: e.target.value })}
            margin="normal"
          />
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={currentClip.isPublished}
                  onChange={(e) => setCurrentClip({ ...currentClip, isPublished: e.target.checked })}
                />
              }
              label="Published"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={currentClip.isPopular}
                  onChange={(e) => setCurrentClip({ ...currentClip, isPopular: e.target.checked })}
                />
              }
              label="Popular"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveClip} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
