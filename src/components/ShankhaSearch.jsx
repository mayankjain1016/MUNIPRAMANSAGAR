import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import SearchIcon from "@mui/icons-material/Search";
import SpaIcon from "@mui/icons-material/Spa"; // A lotus-like icon for spiritual context

const SUGGESTIONS = ["भावना योग", "सुख", "शांति", "कर्म सिद्धांत", "ध्यान"];

export default function ShankhaSearch() {
  const [query, setQuery] = useState("");

  // Professional UX: Handle actual search submission
  const handleSearch = () => {
    if (!query.trim()) return;
    console.log("Triggering search for:", query);
    // Add your API call or routing logic here
  };

  // Professional UX: Allow users to press "Enter" to search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "center", 
        padding: { xs: "20px", md: "40px" },
        // A very subtle, warm gradient background representing dawn/enlightenment
        background: "linear-gradient(135deg, #FFF8E1 0%, #FAFAFA 100%)",
        borderRadius: "16px",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: "600px",
          width: "100%",
          padding: { xs: "24px", sm: "40px" },
          borderRadius: "24px",
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 40px rgba(230, 81, 0, 0.08)", // Soft saffron shadow
          border: "1px solid rgba(230, 81, 0, 0.1)",
        }}
      >
        {/* Header Section */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent: "center" }}>
          <SpaIcon sx={{ color: "#E65100", fontSize: "32px", mr: 1.5 }} />
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              color: "#333333", 
              fontWeight: 600,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            शंका खोजें
          </Typography>
        </Box>

        {/* Search Input Bar */}
        <Paper
          component="form"
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#F9F9F9",
            borderRadius: "50px", // Fully rounded pill shape for a softer feel
            border: "1px solid #E0E0E0",
            padding: "4px 8px",
            mb: 4,
            transition: "all 0.3s ease",
            "&:focus-within": {
              backgroundColor: "#ffffff",
              borderColor: "#FFB74D",
              boxShadow: "0 0 0 4px rgba(255, 183, 77, 0.1)",
            }
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1, fontSize: "1.1rem", color: "#424242" }}
            placeholder="शंका के मुख्य शब्द यहाँ लिखें..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            inputProps={{ "aria-label": "search spirituality questions" }}
          />
          <IconButton 
            type="button" 
            onClick={handleSearch}
            sx={{ 
              p: "12px", 
              backgroundColor: "#E65100", 
              color: "white",
              "&:hover": {
                backgroundColor: "#F57C00",
              }
            }} 
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        {/* Suggestions Section */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography 
            variant="body2" 
            sx={{ color: "#757575", mb: 2, fontSize: "0.9rem" }}
          >
            सुझाए गए विषय:
          </Typography>
          
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1.5 }}>
            {SUGGESTIONS.map((suggestion) => (
              <Chip
                key={suggestion}
                label={suggestion}
                onClick={() => setQuery(suggestion)}
                sx={{
                  backgroundColor: "#FFF3E0", // Very light orange
                  color: "#E65100",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  padding: "4px 8px",
                  border: "1px solid rgba(230, 81, 0, 0.2)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#FFE0B2",
                    transform: "translateY(-1px)",
                    boxShadow: "0 2px 5px rgba(230, 81, 0, 0.1)",
                  }
                }}
              />
            ))}
          </Box>
        </Box>

      </Paper>
    </Box>
  );
}