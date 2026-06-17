import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
  Stack,
} from '@mui/material';
import { VideoLibrary, Save } from '@mui/icons-material';
import apiService from '../../services/apiService';
import { API_ENDPOINTS } from '../../config/api';

export default function LiveVideoManagement() {
  const [liveStatus, setLiveStatus] = useState({ isLive: false, videoUrl: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    fetchLiveStatus();
  }, []);

  const fetchLiveStatus = async () => {
    try {
      const data = await apiService.get(API_ENDPOINTS.liveVideo.get);
      setLiveStatus(data);
    } catch (error) {
      showAlert('error', 'Error loading live status');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiService.put(API_ENDPOINTS.liveVideo.update, liveStatus);
      showAlert('success', 'Live status updated successfully');
    } catch (error) {
      showAlert('error', 'Error updating live status');
    } finally {
      setSaving(false);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ color: '#f97316' }} />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>
          Live Video Management
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Control live stream display on homepage
        </Typography>
      </Box>

      {alert.show && (
        <Alert severity={alert.type} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          border: '1px solid #e2e8f0',
          maxWidth: 800,
        }}
      >
        <Stack spacing={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <VideoLibrary sx={{ fontSize: 40, color: '#f97316' }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Live Stream Control
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Enable or disable live video on homepage
              </Typography>
            </Box>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={liveStatus.isLive}
                onChange={(e) => setLiveStatus({ ...liveStatus, isLive: e.target.checked })}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#f97316',
                    '&:hover': { backgroundColor: 'rgba(249, 115, 22, 0.08)' },
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#f97316',
                  },
                }}
              />
            }
            label={
              <Typography sx={{ fontWeight: 500 }}>
                {liveStatus.isLive ? 'Live Now 🔴' : 'Not Live'}
              </Typography>
            }
          />

          <TextField
            label="YouTube Video URL"
            placeholder="https://www.youtube.com/watch?v=..."
            value={liveStatus.videoUrl}
            onChange={(e) => setLiveStatus({ ...liveStatus, videoUrl: e.target.value })}
            fullWidth
            multiline
            rows={2}
            disabled={!liveStatus.isLive}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: '#f97316' },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: '#f97316' },
            }}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
              onClick={handleSave}
              disabled={saving}
              sx={{
                backgroundColor: '#f97316',
                '&:hover': { backgroundColor: '#ea580c' },
                textTransform: 'none',
                px: 4,
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Instructions:
            </Typography>
            <Typography variant="body2" component="div">
              • Toggle the switch to enable/disable live stream
              <br />
              • Paste YouTube video URL when going live
              <br />
              • Turn off the switch when stream ends
              <br />• "Coming Soon" will show when live is disabled
            </Typography>
          </Alert>
        </Stack>
      </Paper>
    </Box>
  );
}
