import * as React from "react";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import TimelineFilter from "./TypeTimelineFilter";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function ContentsTimeline({ lng = "en", tag = "education" }) {
const isEducation = tag === "education";

  const title = isEducation
    ? lng === "ja" ? "学歴 / Education" : "Education"
    : lng === "ja" ? "職歴 / Career" : "Career";

  const Icon = isEducation ? SchoolIcon : WorkIcon;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Icon fontSize="inherit" />
        {title}
      </Typography>

      <Box>
        <TimelineFilter filterTag={tag} lng={lng} idPrefix="timeline-" />
      </Box>
    </Box>
  );
}
