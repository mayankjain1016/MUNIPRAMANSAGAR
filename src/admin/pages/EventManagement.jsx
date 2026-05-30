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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4">Upcoming Event Management</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Drag and drop to reorder events • Manage upcoming events displayed on the homepage
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
          sx={{ 
            background: 'linear-gradient(135deg, #FF9800 0%, #E65100 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #F57C00 0%, #D84315 100%)'
            }
          }}
        >
          Add Event
        </Button>
      </Box>

      {events.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
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
            sx={{ 
              p: 3, 
              mb: 2,
              border: event.isActive ? '2px solid #E8F5E9' : '1px solid #EEEEEE',
              backgroundColor: draggedIndex === index ? '#FFF3E0' : (event.isActive ? '#FAFAFA' : '#F5F5F5'),
              cursor: 'move',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
                <DragIndicator 
                  sx={{ 
                    color: '#FF9800', 
                    mt: 0.5,
                    cursor: 'grab',
                    '&:active': {
                      cursor: 'grabbing'
                    }
                  }} 
                />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6">{event.title}</Typography>
                    <Chip 
                      label={event.isActive ? 'Active' : 'Inactive'}
                      size="small"
                      color={event.isActive ? 'success' : 'default'}
                    />
                    <Chip 
                      label={`Position: ${index + 1}`}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        borderColor: '#FF9800',
                        color: '#FF9800'
                      }}
                    />
                  </Box>
                  {event.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {event.description}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                  onClick={() => handleToggleActive(event)}
                  color={event.isActive ? 'success' : 'default'}
                  title={event.isActive ? 'Deactivate' : 'Activate'}
                >
                  <Switch checked={event.isActive} size="small" />
                </IconButton>
                <IconButton onClick={() => handleOpen(event)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(event._id)} color="error">
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
