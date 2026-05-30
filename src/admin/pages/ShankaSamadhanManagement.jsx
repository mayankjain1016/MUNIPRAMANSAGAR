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
import { Edit, Delete, Add, VideoLibrary, QuestionAnswer } from '@mui/icons-material';
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
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      if (editMode) {
        await apiService.put(`${API_ENDPOINTS.shankaSamadhan.clips.getAll}/${currentClip._id}`, currentClip);
      } else {
        await apiService.post(API_ENDPOINTS.shankaSamadhan.clips.getAll, currentClip);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Shanka Samadhan Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => tabValue === 0 ? handleOpenQuestion() : handleOpenClip()}
        >
          {tabValue === 0 ? 'Add Question' : 'Add Clip'}
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
        <Tab icon={<QuestionAnswer />} label="Questions (FAQ)" />
        <Tab icon={<VideoLibrary />} label="Clips" />
      </Tabs>

      {tabValue === 0 && (
        <Box>
          {questions.map((item) => (
            <Paper key={item._id} sx={{ p: 3, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6">{item.question}</Typography>
                    {item.isPopular && <Chip label="Popular" color="primary" size="small" />}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {item.answer.substring(0, 150)}...
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Category: {item.category} | Slug: {item.slug} | 
                    Status: {item.isPublished ? 'Published' : 'Draft'} | Views: {item.views}
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => handleOpenQuestion(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteQuestion(item._id)}>
                    <Delete />
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
            <Paper key={item._id} sx={{ p: 3, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6">{item.title}</Typography>
                    {item.isPopular && <Chip label="Popular" color="primary" size="small" />}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Duration: {item.duration} | Views: {item.views}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Video URL: {item.videoUrl}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Status: {item.isPublished ? 'Published' : 'Draft'}
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => handleOpenClip(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClip(item._id)}>
                    <Delete />
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
            onChange={(e) => setCurrentClip({ ...currentClip, videoUrl: e.target.value })}
            margin="normal"
            helperText="Enter YouTube or Vimeo video URL"
          />
          <TextField
            fullWidth
            label="Duration (e.g., 12:45)"
            value={currentClip.duration}
            onChange={(e) => setCurrentClip({ ...currentClip, duration: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Thumbnail URL (optional)"
            value={currentClip.thumbnail}
            onChange={(e) => setCurrentClip({ ...currentClip, thumbnail: e.target.value })}
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
