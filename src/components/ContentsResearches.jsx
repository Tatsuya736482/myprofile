import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import ArticleIcon from "@mui/icons-material/Article";
import TimelineFilter from "./TypeTimelineFilter";
import AppsIcon from "@mui/icons-material/Apps";
import { Box, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import postsContent from "../data/researches.json"
import { Article } from "@mui/icons-material";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

export default function ContentsResearches({ lng = "en", researchFilter, setResearchFilter }) {
  // If props are provided use them, else fallback to internal state
  const [internalSelected, setInternalSelected] = React.useState("All");
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
  
  const selected = researchFilter !== undefined ? researchFilter : internalSelected;
  const setSelected = setResearchFilter !== undefined ? setResearchFilter : setInternalSelected;

  const theme = useTheme();
  const isMobile = window.innerWidth <= 600;

  const isDark = theme.palette.mode === "dark";

  const handleChange = (event, newSelected) => {
    if (newSelected !== null) {
      setSelected(newSelected);
    }
  };

  const renderContent = () => {
    const allowedTags = [ "presentations","publications"];
    
    switch (selected) {
      case "All":
        return <TimelineFilter filterTag={null} lng={lng} posts={postsContent} idPrefix="research-" bibtexMap={bibtexMap} />;
      case "presentations":
      case "publications":
        return <TimelineFilter filterTag={selected} lng={lng} posts={postsContent} idPrefix="research-" bibtexMap={bibtexMap} />;
      default:
        // 許可されていないタグの場合はAllを表示
        return <TimelineFilter filterTag={null} lng={lng} posts={postsContent} idPrefix="research-" bibtexMap={bibtexMap} />;
    }
  };


  const filterBy = lng === "ja" ? "フィルター：" : "Filter by:";

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {lng === "ja"
          ? "研究業績・受賞歴 / Research"
          : "Research Achievements and Awards"}
      </Typography>


      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
          width: "100%",
          justifyContent: "center",
          textAlign: "center",
          flexWrap: "wrap", // 折り返しを許可
        }}
      >
        <p>{filterBy}</p>
        <ToggleButtonGroup
          color="primary"
          value={selected}
          exclusive
          onChange={handleChange}
          aria-label="Timeline Selection"
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              fontSize: { xs: "0.5rem", sm: "0.7rem", md: "0.75rem" }, // フォントサイズ縮小
              padding: { xs: "2px 6px", sm: "4px 8px" }, // 余白を小さく
              minWidth: { xs: "50px", sm: "auto" }, // 最小幅を縮小
            },
            "& .MuiSvgIcon-root": {
              fontSize: { xs: "0.8rem", sm: "1rem" }, // アイコンサイズを小さく
            },
            display: "flex",
            flexWrap: "wrap", // 折り返しを許可
            justifyContent: "center", // 中央寄せ
            gap: "4px", // ボタン間の間隔を調整
          }}
        >
          <ToggleButton value="All">
            <AppsIcon fontSize="inherit" />
            &nbsp;All
          </ToggleButton>
          <ToggleButton value="presentations">
            <RecordVoiceOverIcon fontSize="inherit" />
            &nbsp;Presentations
          </ToggleButton>
          <ToggleButton value="publications">
            <ArticleIcon fontSize="inherit" />
            &nbsp;Publications
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          width: isMobile ? "100%" : "75%", // コンテンツ幅を75%に
          marginLeft: isMobile ? 0 : "25%", // 左に25%の余白を取る
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}
