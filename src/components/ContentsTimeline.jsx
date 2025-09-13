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

export default function SimpleSlide({ lng = "en" }) {
  const [selected, setSelected] = React.useState("All");
  const theme = useTheme();
  const isMobile = window.innerWidth <= 600;

  const isDark = theme.palette.mode === "dark";

  const handleChange = (event, newSelected) => {
    if (newSelected !== null) {
      setSelected(newSelected);
    }
  };

  const renderContent = () => {
    const allowedTags = ["education", "work", "papers"];
    
    switch (selected) {
      case "All":
        return <TimelineFilter filterTag={null} lng={lng} />;
      case "education":
      case "work":
      case "papers":
        return <TimelineFilter filterTag={selected} lng={lng} />;
      default:
        // 許可されていないタグの場合はAllを表示
        return <TimelineFilter filterTag={null} lng={lng} />;
    }
  };

  const title = lng === "ja" ? "⏳経歴" : "⏳Personal history";
  const filterInstruction =
    lng === "ja"
      ? "・ボタンを選択すると、経歴をフィルタリングできます。"
      : "✔︎Click on the buttons to filter the timeline.";
  const filterBy = lng === "ja" ? "フィルター：" : "Filter by:";

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {lng === "ja"
          ? "学歴・職歴 / Education & Career"
          : "Education & Career"}
      </Typography>

      <p>{filterInstruction}</p>
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
          <ToggleButton value="education">
            <SchoolIcon fontSize="inherit" />
            &nbsp;Education
          </ToggleButton>
          <ToggleButton value="papers">
            <ArticleIcon fontSize="inherit" />
            &nbsp;Papers
          </ToggleButton>
          <ToggleButton value="work">
            <WorkIcon fontSize="inherit" />
            &nbsp;Work
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
