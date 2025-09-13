import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TypeIt from "typeit-react";
import { Stack } from "@mui/material";
import { CiMail } from "react-icons/ci";
import TypeBackgroundBox from "./TypeBackgroundbox";
import ElementsSnslinks from "./ElementsSnslinks";
import ElementsDarkmode from "./ElementsDarkmode";
import ElementsLanguagemenu from "./ElementsLanguagemenu";
import ElementsOutline from "./ElementsOutline";
export default function ContentsSelfIntroduction({ lng = "en" }) {
  const isMobile = window.innerWidth <= 600;
  const greeting =
    lng === "ja" ? (
      <Stack direction="row" spacing={1} alignItems="center">
        <h1>一瀬 達矢</h1>
        <h1 style={{ fontWeight: 100 }}>|</h1>
        <h2>Tatsuya Ichinose</h2>{" "}
      </Stack>
    ) : (
      <Stack direction="row" spacing={1} alignItems="center">
        <h1>Tatsuya Ichinose</h1>
      </Stack>
    );

  const belonging =
    lng === "ja" ? (
      <Stack direction="column" spacing={1}>
        <h3>
          東京科学大学{" "}
          <a
            style={{ color: "#ffff" }}
            href="https://www.nlp.c.titech.ac.jp/index.ja.html"
          >
            岡崎研究室
          </a>{" "}
          学部4年
        </h3>
        <h3>
          <a
            style={{ color: "#ffff" }}
            href="https://swallow-llm.github.io/index.ja.html"
          >
            Swallow LLM Team
          </a>
        </h3>
      </Stack>
    ) : (
      <Stack direction="column" spacing={1}>
        <h3>Institute of Science Tokyo, B.Sc. Candidate (4th Year)</h3>
        <h3>
          <a
            href="https://www.nlp.c.titech.ac.jp/index.en.html"
            style={{ color: "#ffff" }}
          >
            Okazaki Laboratory
          </a>
        </h3>
        <h3>
          <a
            href="https://swallow-llm.github.io/index.en.html"
            style={{ color: "#ffff" }}
          >
            Swallow LLM Team
          </a>
        </h3>
      </Stack>
    );
  const welcomeMessage =
    lng === "ja" ? "Welcome to my website! 🎉" : "Welcome to my website! 🎉";

  return (
    <TypeBackgroundBox
      backgroundImage={`${process.env.PUBLIC_URL}/images/sf.jpeg`}
      durationSec={10}
      flightTopPercent={28}
      planeSize={40}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        minHeight="100vh"
        textAlign="center"
        sx={{ p: 2, color: "white" }}
      >
        <Box height={"150px"}></Box>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={6}
          alignItems="center"
        >
          <Stack
            direction="column"
            spacing={2}
            alignItems="flex-start"
            textAlign="left"
          >
            {greeting}
            {belonging}
          </Stack>

          <Avatar
            alt="Tatsuya Ichinose"
            src={`${process.env.PUBLIC_URL}/images/me.jpg`}
            sx={{ width: 150, height: 150 }}
          />
        </Stack>
        <Box minHeight={"150px"}>
          <TypeIt
            options={{ speed: 30, waitUntilVisible: true, cursor: false }}
          >
            <h2>{welcomeMessage}</h2>
          </TypeIt>
        </Box>
        <Typography variant="body2">
          <CiMail />
          &nbsp;
          <a
            href="mailto:tatsuya.ichinose@nlp.comp.isct.ac.jp"
            style={{ color: "white" }}
          >
            <strong>tatsuya.ichinose@nlp.comp.isct.ac.jp</strong>
          </a>
          <br />
          <br />
        </Typography>
        <ElementsSnslinks style={{ width: "150px", height: "150px" }} />
        <br />
      </Box>
    </TypeBackgroundBox>
  );
}
