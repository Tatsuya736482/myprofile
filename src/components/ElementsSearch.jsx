import React, { useState, useMemo, useEffect } from "react";
import {
  IconButton,
  Dialog,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  InputAdornment,
  Box,
  Typography,
  useTheme,
  DialogContent,
  Stack,
  Chip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import ArticleIcon from "@mui/icons-material/Article";
import CodeIcon from "@mui/icons-material/Code";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CloseIcon from "@mui/icons-material/Close";

import posts from "../data/posts.json";
import projects from "../data/projects.json";
import researches from "../data/researches.json";

// Helper to safely get text from multilingual objects
const getText = (obj, lng) => {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lng] || obj["en"] || obj["ja"] || "";
};

// Helper to determine icon based on category/tag
const getIcon = (category, tags) => {
  if (category === "project") return <CodeIcon />;
  if (category === "research") return <ArticleIcon />;
  
  // Timeline tags
  if (tags && Array.isArray(tags)) {
    if (tags.includes("education")) return <SchoolIcon />;
    if (tags.includes("work") || tags.includes("career")) return <WorkIcon />;
    if (tags.includes("papers")) return <ArticleIcon />;
  }
  
  return <EventNoteIcon />;
};

export default function ElementsSearch({ lng = "en", setTimelineFilter, setResearchFilter }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const theme = useTheme();

  // Prepare index
  const index = useMemo(() => {
    const data = [];

    // Process Timeline (posts.json)
    Object.entries(posts).forEach(([key, item]) => {
      data.push({
        id: `timeline-${key}`,
        key: key,
        title: item.title,
        subtitle: item.subtitle,
        date: item.date,
        tags: item.tag,
        category: "timeline",
        source: item
      });
    });

    // Process Projects (projects.json)
    Object.entries(projects).forEach(([key, item]) => {
      data.push({
        id: `project-${key}`,
        key: key,
        title: item.title,
        subtitle: item.subtitle,
        date: item.date,
        tags: ["project"],
        category: "project",
        source: item
      });
    });

    // Process Researches (researches.json)
    Object.entries(researches).forEach(([key, item]) => {
      data.push({
        id: `research-${key}`,
        key: key,
        title: item.title,
        subtitle: item.subtitle,
        date: item.date,
        tags: ["research"],
        category: "research",
        source: item
      });
    });
    
    // Add Intro manually if needed? 
    // Maybe just content items for now.

    return data;
  }, []);

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    
    return index.filter(item => {
      const titleEn = getText(item.title, "en").toLowerCase();
      const titleJa = getText(item.title, "ja").toLowerCase();
      const subEn = getText(item.subtitle, "en").toLowerCase();
      const subJa = getText(item.subtitle, "ja").toLowerCase();
      const date = (item.date || "").toLowerCase();
      
      return (
        titleEn.includes(lowerQuery) ||
        titleJa.includes(lowerQuery) ||
        subEn.includes(lowerQuery) ||
        subJa.includes(lowerQuery) ||
        date.includes(lowerQuery)
      );
    });
  }, [query, index]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setQuery("");
  };

  const handleItemClick = (id) => {
    handleClose();
    // Assuming search logic: if user searches and clicks a timeline item, 
    // we want to ensure it is visible, so we reset filter to 'All'.
    if (setTimelineFilter) {
        setTimelineFilter("All");
    }
    if (setResearchFilter) {
        setResearchFilter("All");
    }

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Header offset
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        // Optional: Highlight effect could be added here
        element.style.transition = "background-color 0.5s";
        const originalBg = element.style.backgroundColor;
        element.style.backgroundColor = theme.palette.action.selected;
        setTimeout(() => {
            element.style.backgroundColor = originalBg;
        }, 1500);
      }
    }, 100);
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ color: "inherit" }}>
        <SearchIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            position: 'absolute',
            top: 50,
            borderRadius: 2,
            maxHeight: '80vh'
          }
        }}
      >
        <Box sx={{ p: 2, pb: 0 }}>
            <TextField
                autoFocus
                fullWidth
                placeholder={lng === "ja" ? "検索..." : "Search..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                             <IconButton onClick={handleClose} edge="end" size="small">
                                <CloseIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                variant="outlined"
            />
        </Box>
        <DialogContent sx={{ px: 0, py: 1 }}>
            {!query && (
                <Box sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
                     <SearchIcon sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
                     <Typography variant="body1" sx={{ mb: 3, opacity: 0.6 }}>
                        {lng === "ja" ? "キーワードを入力して検索" : "Type meaningful keywords to search"}
                     </Typography>
                     <Stack direction="row" spacing={2} justifyContent="center" useFlexGap flexWrap="wrap">
                        {(lng === "ja" ? ["留学", "LLM", "Web"] : ["Swallow", "LLM", "Web"]).map((keyword) => (
                           <Chip 
                              key={keyword} 
                              label={keyword} 
                              onClick={() => setQuery(keyword)}
                              clickable
                              variant="outlined"
                              sx={{
                                fontSize: '1rem',
                                fontWeight: 500,
                                height: 'auto',
                                py: 1.5,
                                px: 2, 
                                borderRadius: 8,
                                border: '1px solid',
                                borderColor: 'divider',
                                transition: 'all 0.2s',
                                '&:hover': {
                                  borderColor: 'primary.main',
                                  color: 'primary.main',
                                  backgroundColor: 'action.hover',
                                  transform: 'scale(1.05)',
                                }
                              }}
                           />
                        ))}
                     </Stack>
                </Box>
            )}

            {query && results.length === 0 && (
                <Box sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
                    <Typography>No results found</Typography>
                </Box>
            )}
            
            <List>
                {results.map((item) => (
                    <ListItemButton 
                        key={item.id} 
                        onClick={() => handleItemClick(item.id)}
                        divider
                    >
                        <ListItemIcon>
                            {getIcon(item.category, item.tags)}
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {getText(item.title, lng)}
                                </Typography>
                            }
                            secondary={
                                <Stack component="span" spacing={0.5}>
                                    <Typography variant="body2" component="span" color="text.secondary">
                                       {item.date}
                                    </Typography>
                                    <Typography variant="caption" component="span" color="text.secondary" sx={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {getText(item.subtitle, lng)}
                                    </Typography>
                                </Stack>
                            }
                        />
                    </ListItemButton>
                ))}
            </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
