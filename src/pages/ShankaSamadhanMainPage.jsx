import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SendIcon from "@mui/icons-material/Send";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const shankaSamadhanCategories = [
  { 
    id: 1, 
    title: "सारी क्लिप्स", 
    icon: <VideoLibraryIcon sx={{ fontSize: "48px" }} />,
    description: "सभी शंका समाधान वीडियो देखें",
    color: "#FF6B6B",
    route: "/shanka-samadhan/all-clips"
  },
  { 
    id: 2, 
    title: "नई क्लिप्स", 
    icon: <FiberNewIcon sx={{ fontSize: "48px" }} />,
    description: "नवीनतम शंका समाधान वीडियो",
    color: "#4ECDC4",
    route: "/shanka-samadhan/new-clips"
  },
  { 
    id: 3, 
    title: "लोकप्रिय क्लिप्स", 
    icon: <TrendingUpIcon sx={{ fontSize: "48px" }} />,
    description: "सबसे ज्यादा देखे गए वीडियो",
    color: "#95E1D3",
    route: "/shanka-samadhan/popular-clips"
  },
  { 
    id: 4, 
    title: "सभी शंका समाधान", 
    icon: <ListAltIcon sx={{ fontSize: "48px" }} />,
    description: "प्रश्नों की पूरी सूची देखें",
    color: "#F38181",
    route: "/shanka-samadhan/all-questions"
  }
];

export default function ShankaSamadhanMainPage() {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    question: ''
  });

  const handleCardClick = (route) => {
    navigate(route);
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setFormData({ name: '', email: '', phone: '', question: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('आपका प्रश्न सफलतापूर्वक भेज दिया गया है। धन्यवाद!');
    handleCloseForm();
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FAFAFA", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{ 
              fontWeight: 800, 
              color: "#333333",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" }
            }}
          >
            शंका समाधान
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: "#757575",
              fontWeight: 400,
              maxWidth: "700px",
              mx: "auto"
            }}
          >
            आपके सवाल गुरुदेव के जवाब
          </Typography>
        </Box>

        {/* Category Cards Grid */}
        <Box 
          sx={{ 
            display: "grid",
            gridTemplateColumns: { 
              xs: "1fr", 
              sm: "repeat(2, 1fr)"
            },
            gap: { xs: 3, md: 4 },
            mb: 6
          }}
        >
          {shankaSamadhanCategories.map((category) => (
            <Card
              key={category.id}
              elevation={0}
              onClick={() => handleCardClick(category.route)}
              sx={{
                borderRadius: "20px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 16px 40px rgba(230, 81, 0, 0.15)",
                  borderColor: "rgba(230, 81, 0, 0.2)",
                  "& .icon-wrapper": {
                    transform: "scale(1.1) rotate(5deg)",
                    color: "#E65100"
                  },
                  "& .explore-btn": {
                    backgroundColor: "#E65100",
                    color: "#ffffff",
                    transform: "translateX(4px)"
                  }
                }
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                
                {/* Icon */}
                <Box 
                  className="icon-wrapper"
                  sx={{ 
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: `${category.color}15`,
                    color: category.color,
                    mb: 3,
                    transition: "all 0.3s ease"
                  }}
                >
                  {category.icon}
                </Box>

                {/* Title */}
                <Typography 
                  variant="h5" 
                  component="h3"
                  sx={{ 
                    fontWeight: 700,
                    color: "#333333",
                    mb: 1.5,
                    fontSize: { xs: "1.25rem", md: "1.5rem" }
                  }}
                >
                  {category.title}
                </Typography>

                {/* Description */}
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: "#757575",
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                  {category.description}
                </Typography>

                {/* Explore Button */}
                <Button
                  className="explore-btn"
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    borderColor: "#E0E0E0",
                    color: "#555555",
                    borderRadius: "50px",
                    padding: "8px 24px",
                    fontWeight: 600,
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#E65100"
                    }
                  }}
                >
                  देखें
                </Button>

              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Submit Question Section */}
        <Box 
          sx={{ 
            textAlign: "center", 
            backgroundColor: "#ffffff", 
            borderRadius: "16px", 
            p: 4,
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)"
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#E65100", mb: 2 }}>
            अपनी शंका भेजें
          </Typography>
          <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.8, maxWidth: "800px", mx: "auto", mb: 3 }}>
            यदि आपके मन में कोई प्रश्न या शंका है, तो कृपया हमें भेजें। गुरुदेव आपकी शंका का समाधान करेंगे।
          </Typography>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleOpenForm}
            sx={{
              backgroundColor: "#E65100",
              color: "#ffffff",
              borderRadius: "50px",
              padding: "12px 32px",
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#BF360C"
              }
            }}
          >
            शंका भेजें
          </Button>
        </Box>

      </Container>

      {/* Question Submission Form Dialog */}
      <Dialog 
        open={openForm} 
        onClose={handleCloseForm}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#E65100", fontSize: "1.5rem" }}>
          अपनी शंका भेजें
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="आपका नाम"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="ईमेल"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="मोबाइल नंबर"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="आपका प्रश्न"
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleCloseForm}
            sx={{ color: "#666" }}
          >
            रद्द करें
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#E65100",
              "&:hover": {
                backgroundColor: "#BF360C"
              }
            }}
          >
            भेजें
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
