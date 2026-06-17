import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import LiveVideo from "./LiveVideo";


import apiService from '../../services/apiService';
import { API_ENDPOINTS } from '../../config/api';

export default function ShankaSamadhan() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await apiService.get(API_ENDPOINTS.shankaSamadhan.getHome);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="section" sx={{ width: "100%", py: { xs: 6, md: 8 }, backgroundColor: "#FAFAFA" }}>
      
      {/* 1. Elegant Spiritual Divider */}
      <Box sx={{ mb: 4, px: 2 }}>
        <Divider sx={{ "&::before, &::after": { borderColor: "rgba(230, 81, 0, 0.2)" } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#E65100", opacity: 0.7 }}>
            <Brightness7Icon sx={{ fontSize: "24px" }} />
          </Box>
        </Divider>
      </Box>

      {/* 2. Section Header Container */}
      <Box sx={{ maxWidth: "800px", mx: "auto", px: { xs: 2, sm: 4 }, mb: 5, textAlign: "center" }}>
        <Box 
          sx={{ 
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#FFF3E0", 
            borderRadius: "50px", 
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1.5 },
            mb: 2,
            border: "1px solid rgba(230, 81, 0, 0.15)",
            boxShadow: "0 4px 12px rgba(230, 81, 0, 0.05)"
          }}
        >
          <ForumOutlinedIcon sx={{ color: "#E65100", mr: { xs: 1, sm: 1.5 }, fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              color: "#E65100",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" }
            }}
          >
            आपके सवाल गुरुदेव के जवाब
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: "#000000", fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" } }}>
          हर शंका का समाधान
        </Typography>
      </Box>

      <LiveVideo />

    

    </Box>
  );
}