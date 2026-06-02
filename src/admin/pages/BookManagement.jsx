import { useState, useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardMedia, CardContent, Typography, IconButton, Grid, Alert, LinearProgress } from '@mui/material';
import { Add, Edit, Delete, CloudUpload, PictureAsPdf } from '@mui/icons-material';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function BookManagement() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: 'आचार्य श्री निर्भय सागर जी', description: '', order: 0 });
  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/books`);
      setBooks(data);
    } catch (err) {
      setError('Failed to fetch books');
    }
  };

  const handleOpen = (book = null) => {
    if (book) {
      setEditMode(true);
      setCurrentBook(book);
      setFormData({ title: book.title, author: book.author, description: book.description, order: book.order });
      setCoverPreview(`http://localhost:5000/uploads/books/${book.coverImage}`);
    } else {
      setEditMode(false);
      setCurrentBook(null);
      setFormData({ title: '', author: 'आचार्य श्री निर्भय सागर जी', description: '', order: 0 });
      setCoverPreview('');
    }
    setCoverImage(null);
    setPdfFile(null);
    setOpen(true);
  };

  const handleClose = () => {
    if (uploading) return;
    setOpen(false);
    setError('');
    setCoverPreview('');
    setUploadProgress(0);
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      setError('');
      setUploading(true);
      setUploadProgress(0);

      const data = new FormData();
      data.append('title', formData.title);
      data.append('author', formData.author);
      data.append('description', formData.description);
      data.append('order', formData.order);
      
      if (coverImage) data.append('coverImage', coverImage);
      if (pdfFile) data.append('pdfFile', pdfFile);

      const config = {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      };

      if (editMode) {
        await axios.put(`${API_URL}/books/${currentBook._id}`, data, config);
      } else {
        if (!coverImage || !pdfFile) {
          setError('Cover image and PDF file are required');
          setUploading(false);
          return;
        }
        await axios.post(`${API_URL}/books`, data, config);
      }
      
      fetchBooks();
      handleClose();
    } catch (err) {
      const errorMsg = err.response?.status === 413 
        ? 'File too large! Please reduce PDF size or contact admin to increase server limit.'
        : err.response?.data?.message || 'Failed to save book';
      setError(errorMsg);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await axios.delete(`${API_URL}/books/${id}`, {
        withCredentials: true
      });
      fetchBooks();
    } catch (err) {
      setError('Failed to delete book');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5, fontSize: { xs: '1.5rem', sm: '1.875rem' } }}>
            Book Management
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>
            Manage books and PDF files
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
          Add Book
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
        >
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
            <Card elevation={0} sx={{ 
              height: '100%',
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
                height="320"
                image={`http://localhost:5000/uploads/books/${book.coverImage}`}
                alt={book.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a', mb: 1, fontSize: '1rem' }}>
                  {book.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontSize: '0.85rem' }}>
                  {book.author}
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
                  {book.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleOpen(book)}
                      sx={{
                        color: '#3b82f6',
                        '&:hover': { backgroundColor: '#eff6ff' }
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDelete(book._id)}
                      sx={{
                        color: '#ef4444',
                        '&:hover': { backgroundColor: '#fef2f2' }
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                  <IconButton 
                    size="small" 
                    href={`http://localhost:5000/uploads/books/${book.pdfFile}`} 
                    target="_blank"
                    sx={{
                      color: '#10b981',
                      '&:hover': { backgroundColor: '#f0fdf4' }
                    }}
                  >
                    <PictureAsPdf fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, color: '#0f172a' }}>
          {editMode ? 'Edit Book' : 'Add Book'}
        </DialogTitle>
        <DialogContent>
          {uploading && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                  Uploading... {uploadProgress}%
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  {pdfFile && `${(pdfFile.size / (1024 * 1024)).toFixed(2)} MB`}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={uploadProgress} 
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#f97316',
                    borderRadius: 4,
                  }
                }}
              />
            </Box>
          )}
          <TextField
            fullWidth
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Order"
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: e.target.value })}
            margin="normal"
          />
          <Button 
            variant="outlined" 
            component="label" 
            fullWidth 
            sx={{ 
              mt: 2,
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
            startIcon={<CloudUpload />}
          >
            {coverImage ? coverImage.name : (editMode ? 'Change Cover Image' : 'Upload Cover Image')}
            <input type="file" hidden accept="image/*" onChange={handleCoverChange} />
          </Button>
          {coverPreview && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <img 
                src={coverPreview} 
                alt="Cover Preview" 
                style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} 
              />
            </Box>
          )}
          <Button 
            variant="outlined" 
            component="label" 
            fullWidth 
            sx={{ 
              mt: 2,
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
            startIcon={<PictureAsPdf />}
          >
            {pdfFile ? pdfFile.name : (editMode ? 'Change PDF File' : 'Upload PDF File')}
            <input type="file" hidden accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} />
          </Button>
          {editMode && currentBook && !pdfFile && (
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#64748b' }}>
              Current PDF: {currentBook.pdfFile}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleClose}
            disabled={uploading}
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
            disabled={uploading}
            sx={{
              backgroundColor: '#f97316',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#ea580c',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
              },
              '&:disabled': {
                backgroundColor: '#cbd5e1',
                color: '#ffffff',
              }
            }}
          >
            {uploading ? 'Uploading...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
