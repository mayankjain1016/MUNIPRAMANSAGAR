import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Stack,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  AdminPanelSettings,
  Email,
  Lock,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 5 },
            borderRadius: 3,
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Logo/Icon */}
          <Stack alignItems="center" spacing={2} mb={4}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: 2.5,
                backgroundColor: '#f97316',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)',
              }}
            >
              <AdminPanelSettings sx={{ fontSize: 38, color: 'white' }} />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: '#0f172a',
                  mb: 0.5,
                  fontSize: { xs: '1.75rem', sm: '2rem' },
                }}
              >
                Admin Panel
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#64748b', fontSize: '0.95rem' }}
              >
                Muni Pramansagar Management System
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ mb: 4, borderColor: '#e2e8f0' }} />

          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#991b1b',
                '& .MuiAlert-icon': {
                  color: '#ef4444',
                },
              }}
            >
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#757575' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#f97316',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#f97316',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#f97316',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#757575' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#757575' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#f97316',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#f97316',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#f97316',
                  },
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#f97316',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#ea580c',
                    boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
                  },
                  '&:disabled': {
                    backgroundColor: '#fdba74',
                    color: 'white',
                  },
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Stack>
          </form>

          {/* Footer */}
          <Box mt={4} textAlign="center">
            <Typography
              variant="caption"
              sx={{ color: '#94a3b8', fontSize: '0.85rem' }}
            >
              Protected Area • Authorized Access Only
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
