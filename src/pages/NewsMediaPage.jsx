import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HistoryIcon from "@mui/icons-material/History";
import StarIcon from "@mui/icons-material/Star";

const newsCategories = {
  latest: [
    { id: 0, date: "15 Apr 2026", title: "अहिंसा और बातचीत से ही संभव है विश्व शांति – मुनि श्री गुरु दत्त सागर", description: "संघर्ष नहीं संवाद अपनाएं, तभी मानवता का उद्धार संभव – मुनि श्री मेघ दत्त सागर" },
    { id: 1, date: "12 Apr 2026", title: "मुनिश्री ससंघ का गोमिया, जिला-बोकारो, झारखण्ड में मंगल प्रवेश हुआ", description: "आचार्य श्री निर्भय सागर जी महाराज ससंघ गोमिया में पधारे" },
    { id: 2, date: "11 Apr 2026", title: "मुनिश्री ससंघ का साड़म, जिला-बोकारो, झारखण्ड में मंगल प्रवेश हुआ", description: "भव्य स्वागत समारोह का आयोजन" },
    { id: 3, date: "09 Apr 2026", title: "मुनिश्री ससंघ का पेटरवार, जिला-बोकारो, झारखण्ड में मंगल प्रवेश हुआ", description: "हजारों श्रद्धालुओं ने लिया आशीर्वाद" },
    { id: 4, date: "06 Apr 2026", title: "श्री राधाकृष्ण किशोर जी (झारखंड वित्त मंत्री) राँची में गुरु चरणों में", description: "वित्त मंत्री ने महाराज जी से मुलाकात की" },
    { id: 5, date: "05 Apr 2026", title: "राँची पंचकल्याणक दिवस-5 झलकियाँ", description: "भव्य धार्मिक आयोजन संपन्न" }
  ],
  old: [
    { id: 7, date: "15 Mar 2026", title: "दिल्ली में विशाल धर्म सभा का आयोजन", description: "हजारों श्रद्धालुओं ने प्रवचन सुना" },
    { id: 8, date: "28 Feb 2026", title: "जयपुर में मंगल प्रवेश समारोह", description: "भव्य स्वागत और धार्मिक कार्यक्रम" },
    { id: 9, date: "10 Feb 2026", title: "मुंबई में आध्यात्मिक प्रवचन", description: "तीन दिवसीय प्रवचन श्रृंखला" },
    { id: 10, date: "25 Jan 2026", title: "अहमदाबाद में धर्म महोत्सव", description: "विशाल जनसमूह ने भाग लिया" },
    { id: 11, date: "05 Jan 2026", title: "इंदौर में नववर्ष प्रवचन", description: "नए साल की शुभकामनाएं और आशीर्वाद" },
    { id: 12, date: "20 Dec 2025", title: "पुणे में धार्मिक शिविर", description: "सात दिवसीय शिविर का समापन" }
  ],
  famous: [
    { id: 13, date: "15 Aug 2025", title: "स्वतंत्रता दिवस पर विशेष प्रवचन", description: "राष्ट्रीय एकता और अहिंसा पर विशेष संदेश" },
    { id: 14, date: "02 Oct 2024", title: "गांधी जयंती पर अहिंसा सम्मेलन", description: "अंतर्राष्ट्रीय स्तर पर चर्चित कार्यक्रम" },
    { id: 15, date: "14 Apr 2024", title: "महावीर जयंती महोत्सव", description: "लाखों श्रद्धालुओं का जमावड़ा" },
    { id: 16, date: "26 Jan 2024", title: "गणतंत्र दिवस पर धर्म संदेश", description: "राष्ट्रीय टीवी पर प्रसारित" },
    { id: 17, date: "10 Nov 2023", title: "विश्व शांति सम्मेलन में भागीदारी", description: "अंतर्राष्ट्रीय मंच पर जैन धर्म का प्रतिनिधित्व" },
    { id: 18, date: "21 Jun 2023", title: "अंतर्राष्ट्रीय योग दिवस पर भावना योग", description: "हजारों लोगों ने ऑनलाइन भाग लिया" }
  ]
};

export default function NewsMediaPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getCurrentNews = () => {
    switch (selectedTab) {
      case 0:
        return newsCategories.latest;
      case 1:
        return newsCategories.old;
      case 2:
        return newsCategories.famous;
      default:
        return newsCategories.latest;
    }
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
              fontSize: { xs: "2rem", md: "3rem" }
            }}
          >
            समाचार मीडिया
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
            आचार्य श्री निर्भय सागर जी महाराज से संबंधित समाचार
          </Typography>
        </Box>

        {/* Tabs for Categories */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs 
            value={selectedTab} 
            onChange={handleTabChange}
            centered
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#757575",
                "&.Mui-selected": {
                  color: "#E65100"
                }
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#E65100",
                height: "3px"
              }
            }}
          >
            <Tab 
              icon={<NewspaperIcon />} 
              iconPosition="start" 
              label="नवीनतम समाचार" 
            />
            <Tab 
              icon={<HistoryIcon />} 
              iconPosition="start" 
              label="पुराने समाचार" 
            />
            <Tab 
              icon={<StarIcon />} 
              iconPosition="start" 
              label="प्रसिद्ध समाचार" 
            />
          </Tabs>
        </Box>

        {/* News Grid */}
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
          {getCurrentNews().map((news) => (
            <Card
              key={news.id}
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
                  borderColor: "rgba(230, 81, 0, 0.2)"
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Date Chip */}
                <Chip 
                  label={news.date} 
                  size="small" 
                  sx={{ 
                    mb: 2, 
                    backgroundColor: "#FFF8E1", 
                    color: "#E65100",
                    fontWeight: 600,
                    border: "1px solid rgba(230, 81, 0, 0.2)"
                  }} 
                />

                {/* News Title */}
                <Typography 
                  variant="h6" 
                  component="h3"
                  sx={{ 
                    fontWeight: 700,
                    color: "#333333",
                    mb: 2,
                    fontSize: "1.2rem",
                    lineHeight: 1.4
                  }}
                >
                  {news.title}
                </Typography>

                {/* News Description */}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: "#757575",
                    lineHeight: 1.6,
                    mb: 1
                  }}
                >
                  {news.description}
                </Typography>

                {/* View More Link */}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: "#E65100",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#D84315",
                      textDecoration: "underline"
                    }
                  }}
                >
                  view more....
                </Typography>
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
            📰 समाचार अपडेट
          </Typography>
          <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.8, maxWidth: "800px", mx: "auto" }}>
            आचार्य श्री निर्भय सागर जी महाराज की गतिविधियों, प्रवचनों और धार्मिक कार्यक्रमों से संबंधित नवीनतम समाचार यहाँ उपलब्ध हैं। 
            नियमित अपडेट के लिए इस पेज को देखते रहें।
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}
