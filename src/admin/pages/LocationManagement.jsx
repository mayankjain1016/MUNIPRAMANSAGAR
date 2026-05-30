import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import apiService from '../../services/apiService';
import { API_ENDPOINTS } from '../../config/api';

export default function LocationManagement() {
  const [location, setLocation] = useState({
    address: '',
    addressEnglish: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      const data = await apiService.get(API_ENDPOINTS.location.getAll);
      setLocation(data);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);
    try {
      await apiService.put(API_ENDPOINTS.location.getAll, location);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving location:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5, fontSize: '1.875rem' }}>
          Location Management
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>
          Update current location information
        </Typography>
      </Box>
      
      {success && (
        <Alert 
          severity="success" 
          sx={{ 
            mb: 3,
            borderRadius: 2,
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#166534',
          }}
        >
          Location updated successfully!
        </Alert>
      )}

      <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, border: '1px solid #e2e8f0', borderRadius: 3 }}>
        <TextField
          fullWidth
          label="Address (Hindi)"
          value={location.address}
          onChange={(e) => setLocation({ ...location, address: e.target.value })}
          margin="normal"
          multiline
          rows={2}
        />
        <TextField
          fullWidth
          label="Address (English)"
          value={location.addressEnglish}
          onChange={(e) => setLocation({ ...location, addressEnglish: e.target.value })}
          margin="normal"
          multiline
          rows={2}
        />
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          disabled={loading}
          sx={{ 
            mt: 3,
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
          {loading ? 'Saving...' : 'Save Location'}
        </Button>
      </Paper>
    </Box>
  );
}
