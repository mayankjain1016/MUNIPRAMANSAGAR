import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import YouTubeIcon from "@mui/icons-material/YouTube";

const videoPlaceholders = [
  { id: 1, title: "Video 1", description: "Curated pravachan series" },
  { id: 2, title: "Video 2", description: "Special discourse collection" },
  { id: 3, title: "Video 3", description: "Selected pravachan mala" },
  { id: 4, title: "Video 4", description: "Themed discourse series" },
  { id: 5, title: "Video 5", description: "Curated spiritual teachings" },
  { id: 6, title: "Video 6", description: "Special pravachan collection" }
];

export default function PravachanMalaPage() {
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
            प्रवचन माला
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
            प्रवचन श्रंखलाओं को देखें
          </Typography>
        </Box>

        {/* Video Cards Grid */}
        <Box 
          sx={{ 
            display: "grid",
            gridTemplateColumns: { 
              xs: "1fr", 
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)" 
            },
            gap: { xs: 3, md: 4 },
            mb: 6
          }}
        >
          {videoPlaceholders.map((video) => (
            <Card
              key={video.id}
              elevation={0}
              sx={{
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 16px 40px rgba(230, 81, 0, 0.15)",
                  borderColor: "rgba(230, 81, 0, 0.2)",
                  "& .youtube-icon": {
                    transform: "scale(1.1)",
                    color: "#FF0000"
                  }
                }
              }}
            >
              {/* Video Thumbnail Placeholder */}
              <Box 
                sx={{ 
                  position: "relative",
                  aspectRatio: "16/9",
                  backgroundColor: "#E0E0E0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <YouTubeIcon 
                  className="youtube-icon"
                  sx={{ 
                    fontSize: "64px", 
                    color: "#9E9E9E",
                    transition: "all 0.3s ease"
                  }} 
                />
              </Box>

              <CardContent sx={{ p: 3 }}>
                {/* Video Title */}
                <Typography 
                  variant="h6" 
                  component="h3"
                  sx={{ 
                    fontWeight: 600,
                    color: "#333333",
                    mb: 1,
                    fontSize: "1.1rem"
                  }}
                >
                  {video.title}
                </Typography>

                {/* Video Description */}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: "#757575",
                    lineHeight: 1.6
                  }}
                >
                  {video.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

      </Container>
    </Box>
  );
}
