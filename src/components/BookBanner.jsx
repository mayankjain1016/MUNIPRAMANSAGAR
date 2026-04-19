import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"; // Sparkle icon for the "New" badge

// Assuming this is your local path
import backgroundImg from "../assets/backgroundimg1.jpeg";

export default function BookBanner() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: { xs: 2, md: 4 } }}>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Stacks on mobile, side-by-side on desktop
          alignItems: "center",
          background: "linear-gradient(135deg, #FFF8E1 0%, #ffffff 100%)", // Warm dawn gradient
          borderRadius: "24px",
          padding: { xs: "24px", sm: "32px" },
          border: "1px solid rgba(230, 81, 0, 0.1)",
          boxShadow: "0 12px 32px rgba(230, 81, 0, 0.05)",
          maxWidth: "750px",
          width: "100%",
          gap: { xs: 3, sm: 5 }, // Spacing between image and text
        }}
      >
        {/* Book Cover Image Section */}
        <Box
          sx={{
            width: { xs: "160px", sm: "200px" },
            height: { xs: "240px", sm: "280px" },
            flexShrink: 0,
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)", // Deeper shadow to make the book look 3D
          }}
        >
          <img
            src={backgroundImg}
            alt="Bhavna Yog - Feel to Heal Book Cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Text and Call-to-Action Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            alignItems: { xs: "center", sm: "flex-start" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {/* "New Release" Badge */}
          <Chip
            icon={<AutoAwesomeIcon style={{ color: "#E65100" }} />}
            label="नई पुस्तक उपलब्ध है"
            size="small"
            sx={{
              mb: 2,
              backgroundColor: "#FFE0B2",
              color: "#E65100",
              fontWeight: 600,
              fontSize: "0.85rem",
              padding: "4px 4px",
            }}
          />

          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              color: "#333333",
              fontFamily: "system-ui, -apple-system, sans-serif",
              mb: 0.5,
            }}
          >
            भावना योग
          </Typography>

          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: 400,
              color: "#757575",
              mb: 4,
            }}
          >
            फील टू हील
          </Typography>

          <Button
            variant="contained"
            startIcon={<LocalMallOutlinedIcon />}
            sx={{
              backgroundColor: "#E65100",
              color: "white",
              borderRadius: "50px", // Pill-shaped button
              padding: "10px 32px",
              fontSize: "1.05rem",
              fontWeight: 600,
              textTransform: "none", // Prevents MUI from making it ALL CAPS
              boxShadow: "0 4px 14px rgba(230, 81, 0, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#F57C00",
                boxShadow: "0 6px 20px rgba(230, 81, 0, 0.4)",
                transform: "translateY(-2px)", // Gentle lift on hover
              },
            }}
          >
            आर्डर करें
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}