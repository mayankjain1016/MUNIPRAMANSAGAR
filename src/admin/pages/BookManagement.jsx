import { useState, useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardMedia, CardContent, Typography, IconButton, Grid, Alert } from '@mui/material';
import { Add, Edit, Delete, CloudUpload, PictureAsPdf } from '@mui/icons-material';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function BookManagement() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: 'आचार्य श्री निर्भय सागर जी', description: '', order: 0 });
  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/books`);
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
    } else {
      setEditMode(false);
      setCurrentBook(null);
      setFormData({ title: '', author: 'आचार्य श्री निर्भय सागर जी', description: '', order: 0 });
    }
    setCoverImage(null);
    setPdfFile(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('title', formData.title);
      data.append('author', formData.author);
      data.append('description', formData.description);
      data.append('order', formData.order);
      
      if (coverImage) data.append('coverImage', coverImage);
      if (pdfFile) data.append('pdfFile', pdfFile);

      if (editMode) {
        await axios.put(`${API_URL}/api/books/${currentBook._id}`, data, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
      } else {
        if (!coverImage || !pdfFile) {
          setError('Cover image and PDF file are required');
          return;
        }
        await axios.post(`${API_URL}/api/books`, data, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
      }
      
      fetchBooks();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save book');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBooks();
    } catch (err) {
      setError('Failed to delete book');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Book Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          Add Book
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={`${API_URL}/uploads/books/${book.coverImage}`}
                alt={book.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>{book.title}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>{book.author}</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>{book.description}</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton color="primary" onClick={() => handleOpen(book)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(book._id)}><Delete /></IconButton>
                  <IconButton color="success" href={`${API_URL}/uploads/books/${book.pdfFile}`} target="_blank"><PictureAsPdf /></IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Book' : 'Add Book'}</DialogTitle>
        <DialogContent>
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
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }} startIcon={<CloudUpload />}>
            Upload Cover Image {coverImage && '✓'}
            <input type="file" hidden accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} />
          </Button>
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }} startIcon={<PictureAsPdf />}>
            Upload PDF {pdfFile && '✓'}
            <input type="file" hidden accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
