import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

// Import biography images
import Bioimg1 from "../assets/Bioimg1.jpeg";
import Bioimg2 from "../assets/Bioimg2.jpeg";
import Bioimg3 from "../assets/Bioimg3.jpeg";

export default function BiographyPage() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FAFAFA", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        
        {/* Hero Section with Background Image and Text Overlay */}
        <Box 
          sx={{ 
            position: "relative",
            mb: 8,
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            height: { xs: "300px", sm: "400px", md: "500px", lg: "600px" },
            backgroundImage: `url(${Bioimg1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#2c1810",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* Dark Gradient Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)",
              zIndex: 1
            }}
          />
          
          {/* Text Overlay */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              width: "90%",
              maxWidth: "900px",
              px: 2,
              transform: "translateY(180px)",
              animation: "fadeInUp 1s ease-out",
              "@keyframes fadeInUp": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(210px)"
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(180px)"
                }
              }
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "clamp(18px, 4vw, 42px)",
                letterSpacing: "-0.5px",
                textShadow: "0 4px 20px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.4)",
                lineHeight: 1.3
              }}
            >
              वैज्ञानिक संत 108 आचार्य श्री निर्भय सागर जी महाराज
            </Typography>
          </Box>
        </Box>

        {/* Introduction Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#E65100", mb: 3 }}>
            परिचय आचार्य श्री — एक दिव्य आत्मा का अवतरण
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 2 }}>
            इस पावन धरा पर समय-समय पर ऐसी महान विभूतियों का जन्म होता है जो न केवल अपने जीवन को धर्म के मार्ग पर समर्पित करती हैं, बल्कि लाखों लोगों के जीवन में आस्था, ज्ञान और वैराग्य की ज्योति जलाती हैं। ऐसे ही एक दिव्य पुरुष हैं — <strong>परम पूज्य वैज्ञानिक संत, वीतरागी आचार्य श्री १०८ निर्भय सागर जी महाराज।</strong>
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 2 }}>
            आचार्य श्री निर्भय सागर जी महाराज एक दिगम्बर जैन आचार्य हैं जिन्होंने उच्च शिक्षा प्राप्त करने के बावजूद सांसारिक जीवन को त्यागकर संन्यास मार्ग अपनाया और आज वे दिगम्बर जैन परम्परा के एक अत्यंत प्रभावशाली, सम्मानित एवं प्रेरणादायी आचार्य के रूप में सम्पूर्ण भारत में विख्यात हैं।
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8 }}>
            उनका व्यक्तित्व उतना ही निर्भय है जितना उनका नाम। विज्ञान की उच्च शिक्षा प्राप्त एक युवक जब अध्यात्म की गहराइयों में उतरता है, तो वह "वैज्ञानिक संत" का रूप धारण कर लेता है — यही उनकी पहचान है।
          </Typography>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Birth and Family Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#E65100", mb: 3 }}>
            जन्म एवं परिवार का परिचय
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 2 }}>
            दिगम्बर जैन मुनि सवाई सिंघई अभयकुमार जैन का जन्म <strong>24 फरवरी 1963</strong> को मध्यप्रदेश के जिला सागर, तालुका बाँदा के <strong>ग्राम धबोली</strong> में हुआ।
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 2 }}>
            उनकी माताजी का नाम <strong>श्रीमती सुहागरानी जैन</strong> था और पिताजी का नाम <strong>श्री हुकुमचंद जी जैन (सिंघई)</strong> था।
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8 }}>
            यह एक धर्मपरायण जैन परिवार था जहाँ धर्म, त्याग और सदाचार के संस्कार बालपन से ही मिले। घर में जिनेन्द्र भगवान की पूजा-अर्चना, साधु-संतों का सत्संग और जैन आगम के प्रति आस्था का वातावरण था। इसी धार्मिक परिवेश में अभयकुमार का बाल्यकाल बीता।
          </Typography>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Two Column Layout - Text and Image */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={7}>
            {/* Education Section */}
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#E65100", mb: 3 }}>
                शिक्षा एवं बौद्धिक प्रतिभा
              </Typography>
              <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 2 }}>
                उन्होंने <strong>M.Sc. (मास्टर ऑफ साइंस)</strong> की उच्च शिक्षा प्राप्त की।
              </Typography>
              <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 2 }}>
                यह उल्लेखनीय है कि एक विज्ञान स्नातकोत्तर छात्र जब संन्यास मार्ग अपनाता है, तो उसके प्रवचनों में वैज्ञानिक सोच और आध्यात्मिक ज्ञान का अद्भुत समन्वय होता है। यही कारण है कि उन्हें <strong>"वैज्ञानिक संत"</strong> की उपाधि से सम्मानित किया गया।
              </Typography>
              <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8 }}>
                उनके प्रवचनों में जहाँ एक ओर आगम-शास्त्रों की गहरी व्याख्या होती है, वहीं दूसरी ओर विज्ञान के सिद्धांतों से जैन दर्शन को जोड़कर वे आधुनिक पीढ़ी को सरल भाषा में धर्म समझाते हैं।
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card elevation={0} sx={{ borderRadius: "16px", overflow: "hidden", height: "100%", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
              <CardMedia
                component="img"
                image={Bioimg2}
                alt="Biography Image 2"
                sx={{ 
                  width: "100%", 
                  height: "100%",
                  minHeight: "350px",
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />

        {/* Diksha Journey Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#E65100", mb: 3 }}>
            दीक्षा यात्रा — त्याग से मुक्ति की ओर
          </Typography>
          
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#333", mb: 2, mt: 4 }}>
            क्षुल्लक दीक्षा — वैराग्य का पहला कदम
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 2 }}>
            उन्होंने <strong>19 फरवरी 1987</strong> को मध्यप्रदेश के <strong>सिद्धक्षेत्र नैनागिरी</strong> में आचार्य श्री १०८ विद्यासागर जी महाराज के सान्निध्य में <strong>क्षुल्लक दीक्षा</strong> ग्रहण की।
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, color: "#333", mb: 2, mt: 4 }}>
            ऐलक दीक्षा — गहन तपस्या की ओर
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 2 }}>
            <strong>28 जुलाई 1988</strong> को उन्होंने सन्त शिरोमणि <strong>आचार्य श्री विद्यासागर जी महाराज</strong> के सान्निध्य में <strong>ऐलक दीक्षा</strong> ग्रहण की।
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, color: "#333", mb: 2, mt: 4 }}>
            मुनि दीक्षा — पूर्ण संन्यास का स्वीकार
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 2 }}>
            <strong>28 जनवरी 2007</strong> को राजस्थान के <strong>उदयपुर</strong> में आचार्य श्री १०८ अभिनंदन सागर जी महाराज के निर्देशन में उन्होंने <strong>मुनि दीक्षा</strong> ग्रहण की।
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, color: "#333", mb: 2, mt: 4 }}>
            आचार्य पद — सर्वोच्च सम्मान
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8 }}>
            <strong>वर्ष 2017</strong> में उन्हें दिगम्बर जैन परम्परा की सर्वोच्च उपाधि <strong>"आचार्य"</strong> से विभूषित किया गया।
          </Typography>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Disciples Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#E65100", mb: 3 }}>
            शिष्यों का परिवार
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 2 }}>
            आचार्य श्री निर्भय सागर जी महाराज के द्वारा दीक्षित <strong>कुल 613 शिष्य</strong> हैं — जिनमें <strong>406 मुनि</strong> (आचार्य, ऐलाचार्य, उपाध्याय, मुनि), <strong>172 आर्यिका माताजी</strong> (गणिनी आर्यिका, आर्यिका), और <strong>35 जूनियर</strong> (ऐलक, क्षुल्लक, क्षुल्लिका) शामिल हैं।
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8 }}>
            इतनी विशाल शिष्य संख्या उनके आध्यात्मिक प्रभाव और धर्म प्रचार की व्यापकता को दर्शाती है।
          </Typography>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Titles Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#E65100", mb: 3 }}>
            उपाधियाँ एवं विशेष पहचान
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 2 }}>
            उन्हें <strong>'वीतरागी संत'</strong> और <strong>'वैज्ञानिक संत'</strong> की विशेष उपाधियों से सम्मानित किया गया है।
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 2 }}>
            <strong>वैज्ञानिक संत</strong> — यह उपाधि उनके उस अनूठे व्यक्तित्व को दर्शाती है जिसमें विज्ञान और अध्यात्म का दुर्लभ समन्वय है।
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8 }}>
            <strong>वीतरागी संत</strong> — वीतरागता अर्थात् राग-द्वेष से मुक्ति, यही जैन मुनि का आदर्श है।
          </Typography>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Pravachan Style Section with Image */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={5}>
            <Card elevation={0} sx={{ borderRadius: "16px", overflow: "hidden", height: "100%", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
              <CardMedia
                component="img"
                image={Bioimg3}
                alt="Biography Image 3"
                sx={{ 
                  width: "100%", 
                  height: "100%",
                  minHeight: "350px",
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            {/* Pravachan Style Section */}
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#E65100", mb: 3 }}>
                प्रवचन शैली — विज्ञान और अध्यात्म का संगम
              </Typography>
              <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: 2 }}>
                आचार्य श्री निर्भय सागर जी महाराज की प्रवचन शैली अत्यंत रोचक, सरल और प्रभावशाली है।
              </Typography>
              <Box component="ul" sx={{ color: "#424242", lineHeight: 2, pl: 3 }}>
                <li><strong>वैज्ञानिक दृष्टिकोण</strong> — विज्ञान की भाषा में जैन सिद्धांतों की व्याख्या</li>
                <li><strong>सरल हिंदी</strong> — जटिल आगमिक सत्यों को सरल भाषा में समझाने की अद्भुत क्षमता</li>
                <li><strong>व्यावहारिक उपदेश</strong> — जीवन की दैनिक समस्याओं का धर्म के माध्यम से समाधान</li>
                <li><strong>युवा-केंद्रित</strong> — आधुनिक युवाओं को विशेष रूप से आकर्षित करने वाली शैली</li>
                <li><strong>अहिंसा, सत्य, अपरिग्रह</strong> — इन मूल्यों पर गहन प्रकाश</li>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />

        {/* Conclusion Section */}
        <Box sx={{ mb: 6, textAlign: "center", backgroundColor: "#FFF8E1", p: { xs: 2, sm: 3, md: 4 }, borderRadius: { xs: "12px", md: "16px" } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#E65100", mb: { xs: 2, md: 3 }, fontSize: { xs: "1.3rem", sm: "1.75rem", md: "2.125rem" } }}>
            श्रद्धाञ्जलि एवं प्रेरणा
          </Typography>
          <Typography variant="body1" sx={{ color: "#424242", lineHeight: 1.8, mb: { xs: 2, md: 3 }, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            आचार्य श्री निर्भय सागर जी महाराज का जीवन इस बात का प्रमाण है कि यदि हृदय में वैराग्य हो तो उच्च शिक्षा, आधुनिक ज्ञान और सांसारिक समृद्धि — सब कुछ होते हुए भी मनुष्य मोक्षमार्ग अपना सकता है। वे आज की पीढ़ी के लिए एक जीवंत प्रेरणास्रोत हैं।
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: "#E65100", 
              fontStyle: "italic", 
              fontWeight: 600,
              borderLeft: "4px solid #E65100",
              pl: 2,
              py: 1,
              fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" }
            }}
          >
            "आत्मा को जानो, आत्मा में रमो — यही सच्चा धर्म है।"
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}
