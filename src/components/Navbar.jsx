import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import logo from "../assets/Page.jpeg";

const NAV_LINKS = [
  { label: "प्रवचन", href: "#pravachan" },
  { label: "शंका समाधान", href: "#shanka-samadhan" },
  { label: "भावना योग", href: "#bhavna-yog" },
  { label: "गुणायतन", href: "#gunayatan" },
  { label: "पाठशाला", href: "#pathshala" },
  { label: "कहानियाँ", href: "#kahaniyan" }
];

export default function Navbar() {
  // MUI uses an HTML element reference to anchor the dropdown menu
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
            style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          >
            <img 
              src={logo} 
              alt="Muni Praman Sagar" 
              style={{ height: "45px", width: "auto" }} 
            />
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
                <MenuItem key={link.label} onClick={handleCloseNavMenu}>
                  <a 
                    href={link.href} 
                    style={{ 
                      textDecoration: "none", 
                      color: "inherit", 
                      width: "100%", 
                      display: "block",
                      padding: "4px 16px"
                    }}
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
                href={link.href}
                onClick={handleCloseNavMenu}
                style={{ 
                  color: "#555555", 
                  display: "block", 
                  fontSize: "16px", 
                  textTransform: "none", // Prevents MUI from making all text uppercase
                  fontWeight: 500
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