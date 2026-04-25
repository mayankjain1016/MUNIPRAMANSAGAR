import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const bhavanaYogFeatures = [
  { 
    id: 1, 
    title: "क्या है भावना योग", 
    icon: <InfoIcon sx={{ fontSize: "48px" }} />,
    description: "भावना योग के बारे में जानें",
    color: "#FF6B6B"
  },
  { 
    id: 2, 
    title: "भावना योग कैसे करें", 
    icon: <HowToRegIcon sx={{ fontSize: "48px" }} />,
    description: "भावना योग करने की विधि",
    color: "#4ECDC4"
  },
  { 
    id: 3, 
    title: "भावना योग का चमत्कार", 
    icon: <AutoAwesomeIcon sx={{ fontSize: "48px" }} />,
    description: "भावना योग के लाभ और प्रभाव",
    color: "#95E1D3"
  },
  { 
    id: 4, 
    title: "ऑनलाइन भावना योग", 
    icon: <OndemandVideoIcon sx={{ fontSize: "48px" }} />,
    description: "ऑनलाइन भावना योग सत्र",
    color: "#F38181"
  }
];

export default function BhavanaYogPage() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FAFAFA", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        
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
            भावना योग
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
            आत्मिक शांति और मानसिक संतुलन का मार्ग
          </Typography>
        </Box>

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
          {bhavanaYogFeatures.map((feature) => (
            <Card
              key={feature.id}
              elevation={0}
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
            भावना योग का महत्व
          </Typography>
          <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.8, maxWidth: "800px", mx: "auto" }}>
            भावना योग एक आध्यात्मिक साधना है जो मन को शांत करती है और आत्मा को शुद्ध करती है। 
            यह हमें जीवन में सकारात्मक ऊर्जा और आंतरिक शांति प्रदान करता है।
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}
