import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

// Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import GridViewIcon from "@mui/icons-material/GridView";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PRAVACHAN_FEATURES = [
  {
    title: "नवीन प्रवचन",
    icon: <AccessTimeIcon sx={{ fontSize: "48px" }} />,
    description: "इस महीने के प्रवचन देखें",
    color: "#FF6B6B",
    route: "/pravachan/navin"
  },
  {
    title: "स्वाध्याय श्रृंखला",
    icon: <AutoStoriesIcon sx={{ fontSize: "48px" }} />,
    description: "सभी प्रवचनों की सूची देखें",
    color: "#4ECDC4",
    route: "/pravachan/swadhyay"
  },
  {
    title: "समस्त प्रवचन",
    icon: <GridViewIcon sx={{ fontSize: "48px" }} />,
    description: "सभी प्रवचनों की सूची देखें",
    color: "#95E1D3",
    route: "/pravachan/samast"
  },
  {
    title: "प्रवचन माला",
    icon: <MenuBookIcon sx={{ fontSize: "48px" }} />,
    description: "प्रवचन श्रंखलाओं को देखें",
    color: "#F38181",
    route: "/pravachan/mala"
  }
];

export default function PravachanPage() {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FAFAFA", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        
        {/* Page Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{ 
              fontWeight: 800, 
              color: "#333333",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
              letterSpacing: "-0.5px"
            }}
          >
            प्रवचन
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: "#757575",
              fontWeight: 400,
              maxWidth: "600px",
              mx: "auto"
            }}
          >
            आचार्य श्री निर्भय सागर जी
          </Typography>
        </Box>

        {/* Feature Cards Grid */}
        <Box 
          sx={{ 
            display: "grid",
            gridTemplateColumns: { 
              xs: "1fr", 
              md: "repeat(2, 1fr)" 
            },
            gap: { xs: 3, md: 4 },
            mb: 6
          }}
        >
          {PRAVACHAN_FEATURES.map((feature, index) => (
            <Card
              key={index}
              elevation={0}
              onClick={() => handleCardClick(feature.route)}
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
                    backgroundColor: `${feature.color}15`,
                    color: feature.color,
                    mb: 3,
                    transition: "all 0.3s ease"
                  }}
                >
                  {feature.icon}
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
                  {feature.title}
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
                  {feature.description}
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
                  Explore
                </Button>

              </CardContent>
            </Card>
          ))}
        </Box>

      </Container>
    </Box>
  );
}
