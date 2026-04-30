import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

const shankas = [
  "क्रोध से मुक्ति कैसे पाएँ?",
  "निर्णय कैसे लें?",
  "युवा वर्ग ब्रांडेड सामान को पाने की दौड़ और चकाचौंध से कैसे बचें?",
  "मानसिक अशांति कैसे दूर करें?",
  "क्या निराशा और लाचारी में किया गया परिवर्तन स्थायी होता है?",
  "संयम कैसे रखें?",
];

export default function ShankaSamadhan() {
  const navigate = useNavigate();

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

      {/* 3. The Interactive Questions List */}
      <Box sx={{ maxWidth: "800px", mx: "auto", px: { xs: 2, sm: 4 } }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
          {shankas.map((q, index) => (
            <Paper
              key={index}
              elevation={0}
              onClick={() => navigate(`/shanka-samadhan/answer/${index}`)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: { xs: 2.5, sm: 3 },
                borderRadius: "16px",
                backgroundColor: "#ffffff",
                border: "1px solid rgba(0,0,0,0.04)",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateX(8px)",
                  backgroundColor: "#FFF8E1",
                  borderColor: "rgba(230, 81, 0, 0.2)",
                  boxShadow: "0 8px 24px rgba(230, 81, 0, 0.08)",
                  "& .arrow-icon": {
                    color: "#E65100",
                    transform: "translateX(4px)"
                  },
                  "& .question-text": {
                    color: "#E65100"
                  }
                }
              }}
            >
              <Typography 
                className="question-text"
                variant="h6" 
                sx={{ 
                  fontWeight: 500, 
                  color: "#333333",
                  fontSize: { xs: "1.05rem", sm: "1.15rem" },
                  lineHeight: 1.5,
                  pr: 2,
                  transition: "color 0.3s ease"
                }}
              >
                {q}
              </Typography>

              {/* The "Read More" Arrow */}
              <Box 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  flexShrink: 0,
                  color: "#BDBDBD"
                }}
              >
                <Typography 
                  sx={{ 
                    display: { xs: "none", sm: "block" },
                    fontSize: "0.85rem", 
                    fontWeight: 600, 
                    mr: 1,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}
                >
                  पढ़ें
                </Typography>
                <ArrowForwardIosIcon className="arrow-icon" sx={{ fontSize: "16px", transition: "all 0.3s ease" }} />
              </Box>
            </Paper>
          ))}
        </Box>

        {/* 4. Footer Action */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button 
            variant="text" 
            onClick={() => navigate('/shanka-samadhan')}
            endIcon={<AutoStoriesOutlinedIcon />}
            sx={{ 
              color: "#5D4037",
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(93, 64, 55, 0.05)",
              }
            }}
          >
            सभी शंका समाधान देखें...
          </Button>
        </Box>
      </Box>

    </Box>
  );
}