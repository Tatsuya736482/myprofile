import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";

// material-ui
// https://mui.com/
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

// Scroll
//https://github.com/fisshy/react-scroll?tab=readme-ov-file
import { Element, scroller } from "react-scroll";

// Defined by myself
import ContentsSelfIntroduction from "../components/ContentsSelfIntroduction";
import ContentsEducation from "../components/ContentsEducation";
import ContentsSkills from "../components/ContentsSkills";
import ContentsTimeline from "../components/ContentsTimeline";
import ContentsPhotos from "../components/ContentsPhotos";
import ContentsResearches from "../components/ContentsResearches";
import ElementsDarkmode from "../components/ElementsDarkmode";
import ElementsSearch from "../components/ElementsSearch";
import { Stack, Box } from "@mui/material";
import ElementsLanguagemenu from "../components/ElementsLanguagemenu";
import ContentsProjects from "../components/ContentsProjects";
import SideNav from "../components/SideNav";

export default function Home({ lng = "en" }) {
  const lngSupported = lng.startsWith("ja") ? "ja" : "en";
  const [isMobile, setIsMobile] = React.useState(false);
  const [mode, setMode] = React.useState("light");
  const [timelineFilter, setTimelineFilter] = React.useState("All");
  const [researchFilter, setResearchFilter] = React.useState("All");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    // 初回実行
    checkIsMobile();

    // リサイズイベントリスナーを追加
    window.addEventListener("resize", checkIsMobile);

    // クリーンアップ関数
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const tocItems = [
    { id: "introduction", label: "Hello👋" },
    { id: "timeline", label: "Education & Career" },
    {id: "researches", label: "Research"},
    { id: "projects", label: "Work / Projects" },
    { id: "skills", label: "Others" },
  ];

  return (
    <AppProvider>
      <Box
        position="fixed"
        top={{ xs: 8, sm: 16 }}
        right={{ xs: 8, sm: 16 }}
        bgcolor="rgba(0, 0, 0, 0.4)"
        p={1}
        borderRadius={10}
        zIndex={9999}
        sx={{
          transition: "background-color 0.3s",
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.6)",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ color: "white" }}
        >
          <ElementsSearch 
            lng={lngSupported} 
            setTimelineFilter={setTimelineFilter} 
            setResearchFilter={setResearchFilter} 
          />
          <ElementsDarkmode setModeFromParent={setMode} />
          <ElementsLanguagemenu />
        </Stack>
      </Box>
      <SideNav items={tocItems} headerOffset={72} lng={lngSupported} />

      <Box
        id="introduction" // ← セクションID
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        textAlign="center"
      >
        <ContentsSelfIntroduction lng={lngSupported} />
      </Box>

      <Box
        sx={{
          display: "flex",
          bgcolor: mode === "dark" ? "grey.900" : "grey.100",
        }}
      >
        {/* メイン本文 */}
        <Box
          component="main"
          sx={{
            flex: 1,
            bgcolor: "background.default", // 本文側（白など）
            mr: isMobile ? 0 : "300px",
            ml: isMobile ? 0 : "100px",
          }}
        >
          <Box id="timeline">
            <ContentsTimeline lng={lngSupported} timelineFilter={timelineFilter} setTimelineFilter={setTimelineFilter} />
          </Box>
          <Box id="researches">
            <ContentsResearches lng={lngSupported} researchFilter={researchFilter} setResearchFilter={setResearchFilter} />
          </Box>
          
          <Box id="projects">
            <ContentsProjects lng={lngSupported} />
          </Box>
          <Box id="skills" display="flex" justifyContent="center" width="100%">
            <Box margin="0 auto">
              <ContentsSkills lng={lngSupported} />
            </Box>
          </Box>

          {/* <Box id="projects">
            <ContentsPhotos lng={lngSupported} />
          </Box> */}

          <Box
            sx={{
              textAlign: "right", // 右寄せ
              fontSize: "0.875rem", // 少し小さめに
              color: "text.secondary",
              mt: 4, // 上に余白
            }}
          >
            © {new Date().getFullYear()} Tatsuya Ichinose. All rights reserved.
          </Box>
        </Box>
      </Box>
    </AppProvider>
  );
}
