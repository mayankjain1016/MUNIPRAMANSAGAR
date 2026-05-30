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
  Chip,
  Alert,
} from '@mui/material';
import { Edit, Delete, Add, DragIndicator } from '@mui/icons-material';
import apiService from '../../services/apiService';
import { API_ENDPOINTS } from '../../config/api';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    title: '',
    description: '',
    isActive: true,
    order: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await apiService.get(API_ENDPOINTS.events.getAll);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleOpen = (event = null) => {
    if (event) {
      setCurrentEvent(event);
      setEditMode(true);
    } else {
      setCurrentEvent({
        title: '',
        description: '',
        isActive: true,
        order: events.length,
      });
      setEditMode(false);
    }
    setError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleSave = async () => {
    if (!currentEvent.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      if (editMode) {
        await apiService.put(`${API_ENDPOINTS.events.getAll}/${currentEvent._id}`, currentEvent);
      } else {
        await apiService.post(API_ENDPOINTS.events.getAll, currentEvent);
      }
      fetchEvents();
      handleClose();
    } catch (error) {
      setError('Error saving event. Please try again.');
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this upcoming event?')) {
      try {
        await apiService.delete(`${API_ENDPOINTS.events.getAll}/${id}`);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleToggleActive = async (event) => {
    try {
      await apiService.put(`${API_ENDPOINTS.events.getAll}/${event._id}`, {
        ...event,
        isActive: !event.isActive
      });
      fetchEvents();
    } catch (error) {
      console.error('Error toggling event status:', error);
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newEvents = [...events];
    const draggedEvent = newEvents[draggedIndex];
    
    // Remove dragged item
    newEvents.splice(draggedIndex, 1);
    // Insert at new position
    newEvents.splice(dropIndex, 0, draggedEvent);
    
    // Update order for all events
    const updatedEvents = newEvents.map((event, index) => ({
      ...event,
      order: index
    }));
    
    setEvents(updatedEvents);
    setDraggedIndex(null);
    
    // Save new order to backend
    try {
      await Promise.all(
        updatedEvents.map(event =>
          apiService.put(`${API_ENDPOINTS.events.getAll}/${event._id}`, event)
        )
      );
    } catch (error) {
      console.error('Error updating event order:', error);
      fetchEvents(); // Revert on error
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5, fontSize: '1.875rem' }}>Upcoming Events</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>
            Drag and drop to reorder events • Manage upcoming events displayed on the homepage
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
          Add Event
        </Button>
      </Box>

      {events.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, textAlign: 'center', border: '1px solid #e2e8f0', borderRadius: 3 }}>
          <Typography variant="body1" sx={{ color: '#64748b', fontSize: '0.95rem' }}>
            No upcoming events yet. Click "Add Event" to create one.
          </Typography>
        </Paper>
      ) : (
        events.map((event, index) => (
          <Paper 
            key={event._id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            elevation={0}
            sx={{ 
              p: 3, 
              mb: 2.5,
              border: event.isActive ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
              backgroundColor: draggedIndex === index ? '#fef3c7' : (event.isActive ? '#ffffff' : '#f8fafc'),
              borderRadius: 3,
              cursor: 'move',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
                <DragIndicator 
                  sx={{ 
                    color: '#f97316', 
                    mt: 0.5,
                    cursor: 'grab',
                    '&:active': {
                      cursor: 'grabbing'
                    }
                  }} 
                />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a', fontSize: '1.1rem' }}>{event.title}</Typography>
                    <Chip 
                      label={event.isActive ? 'Active' : 'Inactive'}
                      size="small"
                      sx={{
                        backgroundColor: event.isActive ? '#dcfce7' : '#f1f5f9',
                        color: event.isActive ? '#166534' : '#64748b',
                        fontWeight: 600,
                        border: `1px solid ${event.isActive ? '#bbf7d0' : '#e2e8f0'}`,
                      }}
                    />
                    <Chip 
                      label={`Position: ${index + 1}`}
                      size="small"
                      sx={{ 
                        backgroundColor: '#fff7ed',
                        color: '#f97316',
                        fontWeight: 600,
                        border: '1px solid #fed7aa',
                      }}
                    />
                  </Box>
                  {event.description && (
                    <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                      {event.description}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                  onClick={() => handleToggleActive(event)}
                  sx={{
                    color: event.isActive ? '#10b981' : '#64748b',
                    '&:hover': { backgroundColor: event.isActive ? '#f0fdf4' : '#f1f5f9' }
                  }}
                  title={event.isActive ? 'Deactivate' : 'Activate'}
                >
                  <Switch checked={event.isActive} size="small" />
                </IconButton>
                <IconButton 
                  onClick={() => handleOpen(event)}
                  sx={{
                    color: '#3b82f6',
                    '&:hover': { backgroundColor: '#eff6ff' }
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton 
                  onClick={() => handleDelete(event._id)}
                  sx={{
                    color: '#ef4444',
                    '&:hover': { backgroundColor: '#fef2f2' }
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? 'Edit Upcoming Event' : 'Add Upcoming Event'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Event Title *"
            value={currentEvent.title}
            onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
            margin="normal"
            placeholder="e.g., भावना योग शिविर - आपके शहर में (Register)"
            helperText="This will be displayed on the homepage"
          />
          <TextField
            fullWidth
            label="Description (Optional)"
            value={currentEvent.description}
            onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
            margin="normal"
            multiline
            rows={2}
            placeholder="Brief description of the event"
          />
          <FormControlLabel
            control={
              <Switch
                checked={currentEvent.isActive}
                onChange={(e) => setCurrentEvent({ ...currentEvent, isActive: e.target.checked })}
              />
            }
            label="Active (Show on homepage)"
            sx={{ mt: 2 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
            👉 Tip: Use drag and drop to reorder events after creating them
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
