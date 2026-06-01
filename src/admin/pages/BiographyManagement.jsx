import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, TextField, Paper, Alert, CircularProgress, IconButton, Divider } from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import {
  FormatBold, FormatItalic, FormatUnderlined, FormatListBulleted,
  FormatListNumbered, FormatAlignLeft, FormatAlignCenter, FormatAlignRight,
  Link as LinkIcon, Image as ImageIcon, Code
} from '@mui/icons-material';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function BiographyManagement() {
  const [biography, setBiography] = useState(null);
  const [title, setTitle] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [images, setImages] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
      Link.configure({ openOnClick: false }),
      Color,
      TextStyle,
    ],
    content: '',
  });

  useEffect(() => {
    fetchBiography();
  }, []);

  useEffect(() => {
    if (editor && biography) {
      editor.commands.setContent(biography.content);
    }
  }, [editor, biography]);

  const fetchBiography = async () => {
    try {
      const response = await fetch(`${API_URL}/biography`);
      if (response.ok) {
        const data = await response.json();
        setBiography(data);
        setTitle(data.title);
        setHeroImage(data.heroImage);
        setImages(data.images?.join(', ') || '');
      }
    } catch (error) {
      console.error('Error fetching biography:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const imagesArray = images.split(',').map(img => img.trim()).filter(img => img);
      const content = editor.getHTML();
      
      const payload = { title, content, heroImage, images: imagesArray };
      
      const url = biography ? `${API_URL}/biography/${biography._id}` : `${API_URL}/biography`;
      const method = biography ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        setBiography(data);
        setMessage({ type: 'success', text: 'Biography saved successfully!' });
        fetchBiography();
      } else {
        setMessage({ type: 'error', text: 'Failed to save biography' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5, fontSize: '1.875rem' }}>
          Biography Management
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>
          Manage biography content with rich text editor
        </Typography>
      </Box>

      {message.text && (
        <Alert 
          severity={message.type} 
          sx={{ 
            mb: 3,
            borderRadius: 2,
            border: message.type === 'success' ? '1px solid #bbf7d0' : '1px solid #fecaca',
            backgroundColor: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
          }} 
          onClose={() => setMessage({ type: '', text: '' })}
        >
          {message.text}
        </Alert>
      )}

      <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, border: '1px solid #e2e8f0', borderRadius: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Hero Image URL"
            value={heroImage}
            onChange={(e) => setHeroImage(e.target.value)}
            required
            sx={{ mb: 3 }}
            helperText="Enter the URL of the hero/banner image"
          />

          <TextField
            fullWidth
            label="Additional Images (comma-separated URLs)"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            sx={{ mb: 3 }}
            helperText="Enter image URLs separated by commas"
          />

          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#0f172a' }}>
            Content
          </Typography>
          
          {/* Editor Toolbar */}
          <Paper elevation={0} sx={{ p: 1.5, mb: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap', border: '1px solid #e2e8f0', borderRadius: 2, backgroundColor: '#f8fafc' }}>
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBold().run()}
              sx={{ 
                bgcolor: editor?.isActive('bold') ? '#fff7ed' : 'transparent',
                color: editor?.isActive('bold') ? '#f97316' : '#64748b',
                '&:hover': { bgcolor: '#fff7ed' }
              }}
            >
              <FormatBold fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              sx={{ 
                bgcolor: editor?.isActive('italic') ? '#fff7ed' : 'transparent',
                color: editor?.isActive('italic') ? '#f97316' : '#64748b',
                '&:hover': { bgcolor: '#fff7ed' }
              }}
            >
              <FormatItalic fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              sx={{ 
                bgcolor: editor?.isActive('strike') ? '#fff7ed' : 'transparent',
                color: editor?.isActive('strike') ? '#f97316' : '#64748b',
                '&:hover': { bgcolor: '#fff7ed' }
              }}
            >
              <FormatUnderlined fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              sx={{ 
                bgcolor: editor?.isActive('heading', { level: 2 }) ? '#fff7ed' : 'transparent',
                color: editor?.isActive('heading', { level: 2 }) ? '#f97316' : '#64748b',
                '&:hover': { bgcolor: '#fff7ed' }
              }}
            >
              <Typography variant="caption" fontWeight="bold">H2</Typography>
            </IconButton>
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              sx={{ 
                bgcolor: editor?.isActive('heading', { level: 3 }) ? '#fff7ed' : 'transparent',
                color: editor?.isActive('heading', { level: 3 }) ? '#f97316' : '#64748b',
                '&:hover': { bgcolor: '#fff7ed' }
              }}
            >
              <Typography variant="caption" fontWeight="bold">H3</Typography>
            </IconButton>
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              sx={{ 
                bgcolor: editor?.isActive('heading', { level: 4 }) ? '#fff7ed' : 'transparent',
                color: editor?.isActive('heading', { level: 4 }) ? '#f97316' : '#64748b',
                '&:hover': { bgcolor: '#fff7ed' }
              }}
            >
              <Typography variant="caption" fontWeight="bold">H4</Typography>
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              sx={{ 
                bgcolor: editor?.isActive('bulletList') ? '#fff7ed' : 'transparent',
                color: editor?.isActive('bulletList') ? '#f97316' : '#64748b',
                '&:hover': { bgcolor: '#fff7ed' }
              }}
            >
              <FormatListBulleted fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              sx={{ 
                bgcolor: editor?.isActive('orderedList') ? '#fff7ed' : 'transparent',
                color: editor?.isActive('orderedList') ? '#f97316' : '#64748b',
                '&:hover': { bgcolor: '#fff7ed' }
              }}
            >
              <FormatListNumbered fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              sx={{ 
                bgcolor: editor?.isActive({ textAlign: 'left' }) ? '#fff7ed' : 'transparent',
                color: editor?.isActive({ textAlign: 'left' }) ? '#f97316' : '#64748b',
                '&:hover': { bgcolor: '#fff7ed' }
              }}
            >
              <FormatAlignLeft fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              sx={{ 
                bgcolor: editor?.isActive({ textAlign: 'center' }) ? '#fff7ed' : 'transparent',
                color: editor?.isActive({ textAlign: 'center' }) ? '#f97316' : '#64748b',
                '&:hover': { bgcolor: '#fff7ed' }
              }}
            >
              <FormatAlignCenter fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              sx={{ 
                bgcolor: editor?.isActive({ textAlign: 'right' }) ? '#fff7ed' : 'transparent',
                color: editor?.isActive({ textAlign: 'right' }) ? '#f97316' : '#64748b',
                '&:hover': { bgcolor: '#fff7ed' }
              }}
            >
              <FormatAlignRight fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
            <IconButton
              size="small"
              onClick={() => {
                const url = window.prompt('Enter image URL:');
                if (url) editor.chain().focus().setImage({ src: url }).run();
              }}
              sx={{ color: '#64748b', '&:hover': { bgcolor: '#fff7ed' } }}
            >
              <ImageIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                const url = window.prompt('Enter link URL:');
                if (url) editor.chain().focus().setLink({ href: url }).run();
              }}
              sx={{ color: '#64748b', '&:hover': { bgcolor: '#fff7ed' } }}
            >
              <LinkIcon fontSize="small" />
            </IconButton>
          </Paper>

          {/* Editor Content */}
          <Box
            sx={{
              mb: 3,
              border: '1px solid #e2e8f0',
              borderRadius: 2,
              p: 3,
              minHeight: '400px',
              backgroundColor: '#ffffff',
              '& .ProseMirror': {
                outline: 'none',
                minHeight: '380px',
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  fontWeight: 700,
                  color: '#0f172a',
                  mb: 2,
                  mt: 3
                },
                '& p': {
                  color: '#475569',
                  lineHeight: 1.8,
                  mb: 2
                },
                '& strong': {
                  fontWeight: 600,
                  color: '#1e293b'
                },
                '& ul, & ol': {
                  color: '#475569',
                  lineHeight: 2,
                  pl: 3
                },
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  my: 2
                }
              }
            }}
          >
            <EditorContent editor={editor} />
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ 
              backgroundColor: '#f97316',
              color: '#ffffff',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#ea580c',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
              },
              '&:disabled': {
                backgroundColor: '#fdba74',
                color: 'white',
              }
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : biography ? 'Update Biography' : 'Create Biography'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
