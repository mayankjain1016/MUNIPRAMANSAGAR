import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import logo from "../assets/Page.jpeg";

// MUI Icons
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";

const navLinks = [
  "Gunayatan", 
  "Best of Shanka Samadhan", 
  "Latest Pravachans", 
  "Pramanik Samooh"
];

const socialLinks = [
  { icon: <AndroidIcon fontSize="small" />, label: "Android App", url: "#" },
  { icon: <AppleIcon fontSize="small" />, label: "Apple Store", url: "#" },
  { icon: <InstagramIcon fontSize="small" />, label: "Instagram", url: "#" },
  { icon: <FacebookIcon fontSize="small" />, label: "Facebook", url: "#" },
  { icon: <YouTubeIcon fontSize="small" />, label: "Youtube", url: "#" },
  { icon: <TwitterIcon fontSize="small" />, label: "Twitter", url: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: "#3E2723", // Deep, rich earthy brown
        color: "#D7CCC8", // Soft warm text color (not harsh pure white)
        pt: { xs: 8, md: 10 },
        pb: 4,
        borderTop: "4px solid #E65100" // Saffron top border to tie into the theme
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 4 }} justifyContent="space-between">
          
          {/* 1. About Section (Takes up 4 columns on desktop) */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <img 
                src={logo} 
                alt="Muni Praman Sagar" 
                style={{ height: "45px", width: "auto" }} 
              />
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                lineHeight: 1.8, 
                color: "#BCAAA4",
                fontSize: "0.95rem"
              }}
            >
              जिस प्रकार से सूर्य की किरणों से जगत का अन्धकार मिट जाता है, ऐसे ही मुनि श्री 108 प्रमाण सागर जी सिद्धांतों में छुपे वैज्ञानिक तथ्यों को अपनी सरल वाणी से शंका समाधान, प्रवचनों और साहित्य से समस्त दुनिया के जीवों का मार्ग दर्शन करते हैं।
            </Typography>
          </Grid>

          {/* 2. Direct Navigation */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ color: "#ffffff", fontWeight: 700, mb: 3, letterSpacing: "0.5px" }}>
              DIRECT NAVIGATION
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href="#"
                  underline="none"
                  sx={{
                    color: "#BCAAA4",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "#FFB74D", // Highlights to Saffron on hover
                      transform: "translateX(4px)" // Subtle nudge effect
                    }
                  }}
                >
                  {link}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* 3. Contact Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ color: "#ffffff", fontWeight: 700, mb: 3, letterSpacing: "0.5px" }}>
              CONTACT US
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <LocationOnOutlinedIcon sx={{ color: "#FFB74D", mr: 1.5, mt: 0.2, fontSize: "20px" }} />
                <Typography variant="body2" sx={{ color: "#BCAAA4", lineHeight: 1.6 }}>
                  Gunayatan, Kundkund Marg, <br />
                  Madhuban, Jharkhand 825329
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PhoneOutlinedIcon sx={{ color: "#FFB74D", mr: 1.5, fontSize: "20px" }} />
                <Typography variant="body2" sx={{ color: "#BCAAA4" }}>
                  +91-7543076063
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* 4. Social Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ color: "#ffffff", fontWeight: 700, mb: 3, letterSpacing: "0.5px" }}>
              STAY CONNECTED
            </Typography>
            {/* 2-column grid for social links to save space */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.url}
                  underline="none"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#BCAAA4",
                    fontSize: "0.85rem",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "#FFB74D",
                    }
                  }}
                >
                  <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                    {social.icon}
                  </Box>
                  {social.label}
                </Link>
              ))}
            </Box>
          </Grid>

        </Grid>

        {/* 5. Copyright Area */}
        <Divider sx={{ mt: 8, mb: 4, borderColor: "rgba(255,255,255,0.1)" }} />
        
        <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "#8D6E63", fontSize: "0.85rem", fontWeight: 500 }}>
            © {currentYear} ALL RIGHTS RESERVED BY PRAMANIK SAMOOH
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}