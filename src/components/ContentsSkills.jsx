import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import others from "../data/others.json";

export default function ContentsSkills({ lng = "en" }) {
  const title = lng === "ja" ? "その他" : "Others";

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {title}
      </Typography>

      <Box>
        <ul style={{ padding: 0 }}>
          {Object.entries(others).map(([key, item]) => (
            <React.Fragment key={key}>
              <li id={`others-${key}`}>
                <strong>{item.title[lng]}</strong>
                {item.items && item.items.length > 0 && (
                  <ul style={{ paddingLeft: "20px" }}>
                    {item.items.map((subItem, idx) => (
                      <li key={idx}>{subItem[lng]}</li>
                    ))}
                  </ul>
                )}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </Box>
    </Box>
  );
}
