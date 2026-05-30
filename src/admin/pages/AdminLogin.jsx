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
        backgroundColor: '#f8f9fa',
        backgroundImage: `
          linear-gradient(to right, #f8f9fa 1px, transparent 1px),
          linear-gradient(to bottom, #f8f9fa 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255, 152, 0, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(230, 81, 0, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Logo/Icon */}
          <Stack alignItems="center" spacing={2} mb={4}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: 2,
                backgroundColor: '#FF9800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(255, 152, 0, 0.25)',
              }}
            >
              <AdminPanelSettings sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: '#1a1a1a',
                  mb: 0.5,
                  fontSize: { xs: '1.75rem', sm: '2rem' },
                }}
              >
                Admin Panel
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.95rem' }}
              >
                Muni Pramansagar Management System
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ mb: 4 }} />

          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  color: '#d32f2f',
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
                      borderColor: '#FF9800',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF9800',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#FF9800',
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
                      borderColor: '#FF9800',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF9800',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#FF9800',
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
                  backgroundColor: '#FF9800',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 14px rgba(255, 152, 0, 0.25)',
                  '&:hover': {
                    backgroundColor: '#F57C00',
                    boxShadow: '0 6px 20px rgba(255, 152, 0, 0.35)',
                  },
                  '&:disabled': {
                    backgroundColor: '#FFB74D',
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
              sx={{ color: '#9e9e9e', fontSize: '0.85rem' }}
            >
              Protected Area • Authorized Access Only
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
