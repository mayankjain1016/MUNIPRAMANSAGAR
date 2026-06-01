import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Stack,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  LocationOn as LocationIcon,
  Event as EventIcon,
  Article as ArticleIcon,
  Collections as GalleryIcon,
  QuestionAnswer as QuestionIcon,
  AccountCircle,
  Logout,
  Close as CloseIcon,
  VideoLibrary as VideoIcon,
  AutoStories as StoriesIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  MenuBook as BookIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Homepage', icon: <VideoIcon />, path: '/admin/homepage' },
  { text: 'Biography', icon: <PersonIcon />, path: '/admin/biography' },
  { text: 'Disciples (शिष्य)', icon: <GroupIcon />, path: '/admin/disciples' },
  { text: 'Books (पुस्तकें)', icon: <BookIcon />, path: '/admin/books' },
  { text: 'Location', icon: <LocationIcon />, path: '/admin/location' },
  { text: 'Events', icon: <EventIcon />, path: '/admin/events' },
  { text: 'News', icon: <ArticleIcon />, path: '/admin/news' },
  { text: 'Gallery', icon: <GalleryIcon />, path: '/admin/gallery' },
  { text: 'Pravachan', icon: <VideoIcon />, path: '/admin/pravachan' },
  { text: 'Kahaniya', icon: <StoriesIcon />, path: '/admin/kahaniya' },
  { text: 'Shanka Samadhan', icon: <QuestionIcon />, path: '/admin/shanka-samadhan' },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0' }}>
      {/* Sidebar Header */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #e2e8f0',
          minHeight: 80,
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2.5,
              backgroundColor: '#f97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.25)',
            }}
          >
            <DashboardIcon sx={{ color: 'white', fontSize: 26 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.15rem', color: '#0f172a', lineHeight: 1.2 }}>
              Admin Panel
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.75rem' }}>
              Management System
            </Typography>
          </Box>
        </Stack>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} size="small" sx={{ color: '#64748b' }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Navigation Menu */}
      <List sx={{ flex: 1, px: 2, py: 3, overflowY: 'auto', overflowX: 'hidden' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2.5,
                  backgroundColor: isActive ? '#fff7ed' : 'transparent',
                  border: isActive ? '1px solid #fed7aa' : '1px solid transparent',
                  '&:hover': {
                    backgroundColor: isActive ? '#fff7ed' : '#f8fafc',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? '#f97316' : '#64748b',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: '0.9rem',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? '#f97316' : '#475569',
                      }
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Sidebar Footer */}
      <Box sx={{ p: 3, borderTop: '1px solid #e2e8f0' }}>
        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', textAlign: 'center', fontSize: '0.75rem' }}>
          v1.0.0 • Muni Pramansagar
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 64, sm: 70 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, color: '#424242' }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a', fontSize: '1.125rem' }}>
                {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.8rem' }}>
                Manage your content
              </Typography>
            </Box>
          </Box>

          {/* User Menu */}
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Chip
              label={admin?.role || 'Admin'}
              size="small"
              sx={{
                backgroundColor: '#fef3c7',
                color: '#92400e',
                fontWeight: 600,
                fontSize: '0.75rem',
                border: '1px solid #fde68a',
                display: { xs: 'none', sm: 'flex' },
              }}
            />
            <IconButton onClick={handleMenu} sx={{ p: 0 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#f97316',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  border: '2px solid #fed7aa',
                }}
              >
                {admin?.username?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Stack>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              elevation: 0,
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2,
                border: '1px solid #e0e0e0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e0e0e0' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                {admin?.username}
              </Typography>
              <Typography variant="caption" sx={{ color: '#757575' }}>
                {admin?.email}
              </Typography>
            </Box>
            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 1.5,
                px: 2,
                color: '#d32f2f',
                '&:hover': {
                  backgroundColor: '#ffebee',
                },
              }}
            >
              <Logout sx={{ mr: 1.5, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, sm: 9 },
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: '#f8fafc',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
