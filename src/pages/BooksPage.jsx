import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const booksData = [
  { id: 1, title: "जैन धर्म के मूल सिद्धांत", author: "आचार्य श्री निर्भय सागर जी", placeholder: true },
  { id: 2, title: "अहिंसा का महत्व", author: "आचार्य श्री निर्भय सागर जी", placeholder: true },
  { id: 3, title: "आत्मा और कर्म", author: "आचार्य श्री निर्भय सागर जी", placeholder: true },
  { id: 4, title: "ध्यान और साधना", author: "आचार्य श्री निर्भय सागर जी", placeholder: true },
  { id: 5, title: "जीवन दर्शन", author: "आचार्य श्री निर्भय सागर जी", placeholder: true },
  { id: 6, title: "धर्म और समाज", author: "आचार्य श्री निर्भय सागर जी", placeholder: true },
  { id: 7, title: "आध्यात्मिक यात्रा", author: "आचार्य श्री निर्भय सागर जी", placeholder: true },
  { id: 8, title: "सत्य की खोज", author: "आचार्य श्री निर्भय सागर जी", placeholder: true },
  { id: 9, title: "मोक्ष मार्ग", author: "आचार्य श्री निर्भय सागर जी", placeholder: true },
  { id: 10, title: "जैन दर्शन", author: "आचार्य श्री निर्भय सागर जी", placeholder: true },
  { id: 11, title: "कर्म सिद्धांत", author: "आचार्य श्री निर्भय सागर जी", placeholder: true },
  { id: 12, title: "आत्म चिंतन", author: "आचार्य श्री निर्भय सागर जी", placeholder: true }
];

export default function BooksPage() {
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
              fontSize: { xs: "2rem", md: "3rem" }
            }}
          >
            पुस्तकें
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
            आचार्य श्री निर्भय सागर जी की रचनाएं
          </Typography>
        </Box>

        {/* Info Box */}
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
          <Typography variant="body1" sx={{ color: "#E65100", fontWeight: 600, mb: 1 }}>
            📚 ज्ञान का भंडार
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            महाराज जी की पुस्तकें जैन धर्म, आध्यात्मिकता और जीवन दर्शन पर आधारित हैं
          </Typography>
        </Box>

        {/* Books Grid */}
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
          {booksData.map((book) => (
            <Card
              key={book.id}
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
                  "& .book-icon": {
                    transform: "scale(1.1)",
                    color: "#E65100"
                  }
                }
              }}
            >
              {/* Book Cover Placeholder */}
              <Box 
                sx={{ 
                  position: "relative",
                  aspectRatio: "3/4",
                  backgroundColor: "#E0E0E0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 2,
                  p: 3
                }}
              >
                <MenuBookIcon 
                  className="book-icon"
                  sx={{ 
                    fontSize: "64px", 
                    color: "#9E9E9E",
                    transition: "all 0.3s ease"
                  }} 
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: "#757575",
                    textAlign: "center",
                    fontWeight: 600
                  }}
                >
                  पुस्तक कवर
                </Typography>
              </Box>

              <CardContent sx={{ p: 3 }}>
                {/* Book Title */}
                <Typography 
                  variant="h6" 
                  component="h3"
                  sx={{ 
                    fontWeight: 700,
                    color: "#333333",
                    mb: 1,
                    fontSize: "1.1rem",
                    lineHeight: 1.3,
                    minHeight: "50px"
                  }}
                >
                  {book.title}
                </Typography>

                {/* Author */}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: "#757575",
                    mb: 2
                  }}
                >
                  {book.author}
                </Typography>

                {/* Read Button */}
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: "#E0E0E0",
                    color: "#555555",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontWeight: 600,
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#E65100",
                      backgroundColor: "#FFF3E0",
                      color: "#E65100"
                    }
                  }}
                >
                  पढ़ें
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Bottom Info Section */}
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
            ज्ञान का प्रसार
          </Typography>
          <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.8, maxWidth: "800px", mx: "auto" }}>
            आचार्य श्री निर्भय सागर जी की पुस्तकें जैन धर्म के गहन ज्ञान, आध्यात्मिक मार्गदर्शन और जीवन के व्यावहारिक पहलुओं को सरल भाषा में प्रस्तुत करती हैं। 
            ये रचनाएं पाठकों को सत्य, अहिंसा और आत्म-साक्षात्कार की ओर प्रेरित करती हैं।
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}
