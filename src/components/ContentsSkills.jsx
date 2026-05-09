import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import others from "../data/others.json";
import StarIcon from "@mui/icons-material/Star";
import TranslateIcon from "@mui/icons-material/Translate";
import ComputerIcon from "@mui/icons-material/Computer";
import SchoolIcon from "@mui/icons-material/School";

const iconMap = {
  "others-english": <TranslateIcon />,
  "others-applied-info": <ComputerIcon />,
  "others-scholarship": <SchoolIcon />,
};

export default function ContentsSkills({ lng = "en" }) {
  const title = lng === "ja" ? "その他" : "Others";

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <StarIcon fontSize="inherit" />
        {title}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        {Object.entries(others).map(([key, item]) => (
          <Paper
            key={key}
            id={`others-${key}`}
            variant="outlined"
            sx={{ p: 2.5, borderRadius: 2 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: item.items?.length > 0 ? 1 : 0 }}>
              {iconMap[key] && (
                <Box sx={{ color: "primary.main", display: "flex", alignItems: "center" }}>
                  {iconMap[key]}
                </Box>
              )}
              <Typography variant="subtitle1" fontWeight={600}>
                {item.title[lng]}
              </Typography>
            </Box>

            {item.items?.length > 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, pl: 4 }}>
                {item.items.map((subItem, idx) => (
                  <Typography key={idx} variant="body2" color="text.secondary">
                    {subItem[lng]}
                  </Typography>
                ))}
              </Box>
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
