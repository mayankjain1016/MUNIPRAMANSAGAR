import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FavoriteIcon from "@mui/icons-material/Favorite";

const storyVideos = [
  { id: 1, title: "महावीर स्वामी की कहानी", description: "भगवान महावीर के जीवन की प्रेरक कहानी" },
  { id: 2, title: "अहिंसा की शिक्षा", description: "जैन धर्म में अहिंसा का महत्व" },
  { id: 3, title: "राजा श्रेयांस की कहानी", description: "त्याग और वैराग्य की प्रेरणादायक कथा" },
  { id: 4, title: "चंदनबाला की कहानी", description: "धैर्य और विश्वास की अद्भुत कहानी" },
  { id: 5, title: "सत्य की शक्ति", description: "सत्य बोलने का महत्व" },
  { id: 6, title: "अपरिग्रह की कहानी", description: "संग्रह न करने की शिक्षा" },
  { id: 7, title: "मेथी कुमार की कथा", description: "दया और करुणा की कहानी" },
  { id: 8, title: "24 तीर्थंकरों की कहानी", description: "जैन धर्म के महान तीर्थंकर" },
  { id: 9, title: "अणुव्रत की शिक्षा", description: "छोटे व्रतों का पालन" },
  { id: 10, title: "जैन संस्कृति और परंपरा", description: "हमारी समृद्ध संस्कृति को जानें" },
  { id: 11, title: "पंच परमेष्ठी", description: "जैन धर्म के पांच परमेष्ठी" },
  { id: 12, title: "नवकार मंत्र की महिमा", description: "सबसे पवित्र मंत्र का महत्व" }
];

export default function KahaniyaPage() {
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
            कहानियाँ
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
            जैन धर्म की प्रेरक कहानियाँ - बच्चों के लिए सरल और रोचक
          </Typography>
        </Box>

        <Box 
          sx={{ 
            backgroundColor: "#FFF8E1", 
            borderRadius: "16px", 
            p: 3, 
            mb: 6,
            border: "1px solid rgba(230, 81, 0, 0.2)",
            textAlign: "center"
          }}
        >
          <Typography variant="body1" sx={{ color: "#E65100", fontWeight: 600, mb: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
            <MenuBookIcon /> जैन धर्म को सरल तरीके से समझें
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            ये कहानियाँ बच्चों को अहिंसा, सत्य, अपरिग्रह और जैन संस्कृति की गहरी शिक्षा देती हैं
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: "grid",
            gridTemplateColumns: { 
              xs: "1fr", 
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)"
            },
            gap: { xs: 3, md: 4 },
            mb: 6
          }}
        >
          {storyVideos.map((video) => (
            <Card
              key={video.id}
              elevation={0}
              sx={{
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
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

                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: "#757575"
                  }}
                >
                  {video.description}
                </Typography>
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
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#E65100", mb: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
            <FavoriteIcon /> जैन धर्म की शिक्षा
          </Typography>
          <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.8, maxWidth: "800px", mx: "auto" }}>
            ये कहानियाँ बच्चों को जैन धर्म के मूल सिद्धांतों - अहिंसा, सत्य, अस्तेय, ब्रह्मचर्य और अपरिग्रह - को सरल और रोचक तरीके से सिखाती हैं। 
            प्रत्येक कहानी में एक महत्वपूर्ण जीवन पाठ छिपा है जो बच्चों के चरित्र निर्माण में सहायक है।
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}
