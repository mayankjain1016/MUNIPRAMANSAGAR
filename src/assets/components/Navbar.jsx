import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import logo from "../Nirbhaylogo.jpeg";

const NAV_LINKS = [
  { label: "Home Section", href: "/" },
  { label: "Biography", href: "#biography" },
  { label: "Gallery", href: "/gallery" },
  { label: "News Media", href: "#news-media" },
  { label: "Event Gallery", href: "#event-gallery" }
];

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavClick = (href) => {
    handleCloseNavMenu();
    if (href.startsWith("/")) {
      navigate(href);
    }
  };

  return (
    <AppBar 
      position="sticky" 
      style={{ 
        backgroundColor: "#ffffff", 
        color: "#333333", 
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)" 
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters style={{ justifyContent: "space-between" }}>
          
          {/* 1. Logo Area */}
          <a 
            href="/" 
            style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: "12px" }}
          >
            <img 
              src={logo} 
              alt="Nirbhaya Logo" 
              style={{ 
                height: "50px", 
                width: "50px", 
                objectFit: "cover", 
                borderRadius: "50%" 
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                color: "#333333", 
                fontWeight: 600, 
                fontSize: "1rem",
                fontFamily: "system-ui, -apple-system, sans-serif"
              }}
            >
              आचार्य श्री निर्भय सागर जी
            </Typography>
          </a>

          {/* 2. Mobile Menu (Hamburger & Dropdown) */}
          {/* sx prop used here for responsive display: flex on mobile (xs), hidden on desktop (md) */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              style={{ color: "#333333" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {NAV_LINKS.map((link) => (
                <MenuItem key={link.label} onClick={() => handleNavClick(link.href)}>
                  <a 
                    href={link.href.startsWith("/") ? undefined : link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("/")) {
                        e.preventDefault();
                      }
                    }}
                    style={{ 
                      textDecoration: "none", 
                      color: "inherit", 
                      width: "100%", 
                      display: "block",
                      padding: "4px 16px",
                      transition: "color 0.3s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#D2691E"}
                    onMouseLeave={(e) => e.target.style.color = "inherit"}
                  >
                    {link.label}
                  </a>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* 3. Desktop Menu */}
          {/* sx prop used here for responsive display: hidden on mobile (xs), flex on desktop (md) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "16px" }}>
            {NAV_LINKS.map((link) => (
              <Button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                sx={{ 
                  color: "#555555", 
                  display: "block", 
                  fontSize: "16px", 
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    color: "#D2691E",
                    backgroundColor: "transparent"
                  }
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}