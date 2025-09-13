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
import ElementsDarkmode from "../components/ElementsDarkmode";
import { Stack, Box } from "@mui/material";
import ElementsLanguagemenu from "../components/ElementsLanguagemenu";

export default function Home({ lng = "en" }) {
  const lngSupported = lng.startsWith("ja") ? "ja" : "en";

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
          <ElementsDarkmode />
          <ElementsLanguagemenu />
        </Stack>
      </Box>
      <Paper>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          textAlign="center"
        >
          <ContentsSelfIntroduction lng={lngSupported} />
        </Box>
        <Paper elevation={4} sx={{ p: 2 }}>
          <br />
          <Element name="Timeline" />
          <Box ustifyContent="center" width="100%" minHeight={600}>
            <ContentsTimeline lng={lngSupported} />
          </Box>
          <br />
          <Divider />
          <Element name="Skills" />
          <ContentsSkills lng={lngSupported} />
          <br />
        </Paper>
        <br />
        <footer
          style={{ textAlign: "center", padding: "10px", fontSize: "14px" }}
        >
          © {new Date().getFullYear()} Tatsuya Ichinose. All rights reserved.
        </footer>
      </Paper>
    </AppProvider>
  );
}
