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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Sidebar Header */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              backgroundColor: '#FF9800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DashboardIcon sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a1a' }}>
              Admin Panel
            </Typography>
            <Typography variant="caption" sx={{ color: '#757575', fontSize: '0.75rem' }}>
              Management System
            </Typography>
          </Box>
        </Stack>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Navigation Menu */}
      <List sx={{ flex: 1, px: 2, py: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2,
                  backgroundColor: isActive ? '#FFF3E0' : 'transparent',
                  '&:hover': {
                    backgroundColor: isActive ? '#FFE0B2' : '#f5f5f5',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? '#FF9800' : '#757575',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#FF9800' : '#424242',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Sidebar Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
        <Typography variant="caption" sx={{ color: '#9e9e9e', display: 'block', textAlign: 'center' }}>
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
        <Toolbar sx={{ justifyContent: 'space-between' }}>
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
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', fontSize: '1.1rem' }}>
                {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
              </Typography>
              <Typography variant="caption" sx={{ color: '#757575' }}>
                Manage your content
              </Typography>
            </Box>
          </Box>

          {/* User Menu */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip
              label={admin?.role || 'Admin'}
              size="small"
              sx={{
                backgroundColor: '#FFF3E0',
                color: '#FF9800',
                fontWeight: 600,
                fontSize: '0.75rem',
                display: { xs: 'none', sm: 'flex' },
              }}
            />
            <IconButton onClick={handleMenu} sx={{ p: 0 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#FF9800',
                  fontWeight: 600,
                  fontSize: '1rem',
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
              borderRight: '1px solid #e0e0e0',
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
          p: { xs: 2, sm: 3 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
