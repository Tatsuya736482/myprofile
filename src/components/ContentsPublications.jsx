import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import publications from "../data/publications.json";
import ArticleIcon from '@mui/icons-material/Article';

const getText = (value, lng) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lng] || value.en || value.ja || "";
};

const normalizeName = (name) => (name || "").replace(/\s+/g, "").toLowerCase();

const isMyFirstAuthor = (authors) => {
  if (!Array.isArray(authors) || authors.length === 0) return false;

  const firstAuthorName = normalizeName(authors[0]?.name);
  return ["一瀬達矢", "tatsuyaichinose"].includes(firstAuthorName);
};

const renderAuthors = (authors) =>
  authors.map((author, index) => (
    <React.Fragment key={`${author.name}-${index}`}>
      {index > 0 && ", "}
      {author.bold ? <strong>{author.name}</strong> : author.name}
    </React.Fragment>
  ));

const renderBadges = (badges, lng) =>
  (badges || []).map((badge, index) => {
    const label = typeof badge === "string" ? badge : getText(badge.label || badge, lng);
    const color = typeof badge === "object" && badge.color ? badge.color : "warning";

    return (
      <Chip
        key={`${label}-${index}`}
        label={label}
        size="small"
        color={color}
        sx={{ fontWeight: 700, height: 24 }}
      />
    );
  });

export default function ContentsPublications({ lng = "en" }) {
  const theme = useTheme();
  const title = lng === "ja" ? "論文・発表" : "Publications & Presentations";
  const mainAuthorTitle = lng === "ja" ? "主著" : "First-author";
  const coAuthorTitle = lng === "ja" ? "共著" : "Co-authored";
  const sortedItems = Object.entries(publications).sort(([keyA], [keyB]) => keyB.localeCompare(keyA));

  const mainAuthorItems = sortedItems.filter(([, item]) => isMyFirstAuthor(item.authors));
  const coAuthorItems = sortedItems.filter(([, item]) => !isMyFirstAuthor(item.authors));

  const renderPublicationItem = ([key, item]) => (
    <Box
      component="li"
      key={key}
      id={`publication-${key}`}
      sx={{ mb: 2, pl: 1, lineHeight: 1.75, fontSize: { xs: "0.98rem", sm: "1.08rem" } }}
    >
      {(getText(item.venue, lng) || (item.badges && item.badges.length > 0)) && (
        <Stack component="div" direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ alignItems: "center", mb: 0.25 }}>
          {getText(item.venue, lng) && (
            <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
              {getText(item.venue, lng)}.
            </Box>
          )}
          {renderBadges(item.badges, lng)}
        </Stack>
      )}
      <Box component="div" sx={{ mb: 0.25 }}>
        {item.url ? (
          <Box
            component="a"
            href={item.url}
            target="_blank"
            rel="noreferrer"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              textDecoration: "underline",
              textDecorationThickness: "2px",
              textDecorationColor: theme.palette.primary.main,
            }}
          >
            {item.title[lng] || item.title.en}
          </Box>
        ) : (
          <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
            {item.title[lng] || item.title.en}
          </Box>
        )}
      </Box>
      <Box component="div">{renderAuthors(item.authors)}</Box>
      {getText(item.date, lng) && (
        <Box component="div">
          {getText(item.date, lng)}.
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ArticleIcon fontSize="inherit" />
        {title}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {mainAuthorTitle}
        </Typography>
        <Box component="ol" sx={{ pl: { xs: 3, sm: 4 }, m: 0 }}>
          {mainAuthorItems.map(renderPublicationItem)}
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" component="h3" gutterBottom>
          {coAuthorTitle}
        </Typography>
        <Box component="ol" sx={{ pl: { xs: 3, sm: 4 }, m: 0 }}>
          {coAuthorItems.map(renderPublicationItem)}
        </Box>
      </Box>
    </Box>
  );
}