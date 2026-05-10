import * as React from "react";
import TimelineFilter from "./TypeTimelineFilter";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import postsContent from "../data/researches.json"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function ContentsResearches({ lng = "en" }) {
  const [bibtexMap, setBibtexMap] = React.useState({});

  React.useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/references.bib`)
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
      })
      .then(text => {
        const entries = {};
        let currentKey = null;
        let currentEntry = "";
        let braceCount = 0;
        let inEntry = false;

        const lines = text.split('\n');
        for (const line of lines) {
             if (!inEntry) {
                 const match = line.match(/^\s*@\w+\s*\{([^,]+),/);
                 if (match) {
                     currentKey = match[1].trim();
                     inEntry = true;
                     currentEntry = line + "\n";
                     braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
                     
                     if (braceCount === 0) {
                         entries[currentKey] = currentEntry.trim();
                         inEntry = false;
                         currentKey = null;
                     }
                 }
             } else {
                 currentEntry += line + "\n";
                 braceCount += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
                 if (braceCount <= 0) {
                     entries[currentKey] = currentEntry.trim();
                     inEntry = false;
                     currentKey = null;
                     braceCount = 0;
                 }
             }
        }
        setBibtexMap(entries);
      })
      .catch(err => console.log("Bibtex file not found or load error", err));
  }, []);
  
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <EmojiEventsIcon fontSize="inherit" />
        {lng === "ja" ? "受賞歴 / Awards" : "Awards"}
      </Typography>


      <Box>
        <TimelineFilter filterTag={null} lng={lng} posts={postsContent} idPrefix="research-" bibtexMap={bibtexMap} />
      </Box>
    </Box>
  );
}
