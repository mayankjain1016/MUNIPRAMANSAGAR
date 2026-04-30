import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { keyframes } from "@mui/system";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

// Gentle pulse animation to draw attention to the WhatsApp action
const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
`;

export default function Subscribe() {
  return (
    <Box 
      component="section" 
      sx={{ 
        width: "100%", 
        py: { xs: 4, md: 6 }, 
        px: { xs: 2, sm: 4 }, 
        display: "flex", 
        justifyContent: "center",
        backgroundColor: "#ffffff"
      }}
    >
      <Paper 
        elevation={0} 
        sx={{
          maxWidth: "600px", 
          width: "100%",
          // Warm spiritual gradient background
          background: "linear-gradient(135deg, #FFF3E0 0%, #FFFFFF 100%)",
          borderRadius: "12px",
          border: "1px solid rgba(230, 81, 0, 0.1)",
          p: { xs: 1.5, sm: 2, md: 2.5 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stacks on mobile, row on desktop
          alignItems: "center",
          gap: { xs: 1.5, sm: 2, md: 2.5 },
          boxShadow: "0 4px 16px rgba(230, 81, 0, 0.05)"
        }}
      >
        {/* 1. Pulsing Icon Badge */}
        <Box 
          sx={{
            backgroundColor: "#25D366", // Official WhatsApp Green
            borderRadius: "50%",
            p: { xs: 0.8, sm: 1, md: 1.2 },
            display: "flex",
            color: "white",
            animation: `${pulseAnimation} 2s infinite`,
            flexShrink: 0
          }}
        >
          <WhatsAppIcon sx={{ fontSize: { xs: "18px", sm: "20px", md: "24px" } }} />
        </Box>

        {/* 2. Text Content Area */}
        <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 800, 
              color: "#333333", 
              mb: { xs: 0.5, md: 0.8 },
              fontSize: { xs: "0.85rem", sm: "1rem", md: "1.2rem" },
              letterSpacing: "-0.5px"
            }}
          >
            WhatsApp Channel से जुड़ें
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: "#616161", 
              mb: { xs: 0.8, md: 1.2 }, 
              lineHeight: 1.5,
              fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" }
            }}
          >
            मुनिश्री से सम्बंधित सभी नवीनतम अपडेट, प्रवचन और कार्यक्रम की जानकारी सीधे अपने फोन पर पाने के लिए अभी सब्सक्राइब करें।
          </Typography>
          
          {/* Subtle Reminder Badge */}
          <Box 
            sx={{ 
              display: "inline-flex", 
              alignItems: "center", 
              backgroundColor: "#FFF8E1",
              border: "1px solid rgba(230, 81, 0, 0.2)",
              borderRadius: "8px",
              px: { xs: 1, sm: 1.5 },
              py: 0.5
            }}
          >
            <NotificationsActiveOutlinedIcon sx={{ fontSize: { xs: "16px", sm: "18px" }, color: "#E65100", mr: { xs: 0.5, sm: 1 } }} />
            <Typography variant="body2" sx={{ color: "#E65100", fontWeight: 600, fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
              Notifications ऑन रखना न भूलें!
            </Typography>
          </Box>
        </Box>

        {/* 3. Call to Action Button */}
        <Box sx={{ mt: { xs: 1, md: 0 }, flexShrink: 0 }}>
          <Button
            variant="contained"
            component="a"
            href="YOUR_WHATSAPP_LINK_HERE"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<WhatsAppIcon sx={{ fontSize: { xs: "18px", sm: "20px", md: "24px" } }} />}
            sx={{
              backgroundColor: "#25D366", // Official WhatsApp Green
              color: "white",
              borderRadius: "50px", // Pill shape
              px: { xs: 3, sm: 3.5, md: 4 },
              py: { xs: 1, sm: 1.25, md: 1.5 },
              fontWeight: 700,
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
              textTransform: "none",
              boxShadow: "0 8px 20px rgba(37, 211, 102, 0.3)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                backgroundColor: "#128C7E", // Darker WhatsApp Green for hover
                boxShadow: "0 12px 28px rgba(37, 211, 102, 0.45)",
                transform: "translateY(-3px)" // Lifts up when hovered
              }
            }}
          >
            Subscribe
          </Button>
        </Box>
        
      </Paper>
    </Box>
  );
}