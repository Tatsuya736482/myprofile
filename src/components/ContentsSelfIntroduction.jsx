import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TypeIt from 'typeit-react';
import { Stack } from '@mui/material';
import { CiMail } from 'react-icons/ci';
import TypeBackgroundBox from './TypeBackgroundbox';
import ElementsSnslinks from './ElementsSnslinks';
import ElementsDarkmode from './ElementsDarkmode';
import ElementsLanguagemenu from './ElementsLanguagemenu';

export default function ContentsSelfIntroduction({ lng = "en" }) {
  const greeting = lng === "ja" ? "一瀬 達矢(Tatsuya Ichinose)" : "Hi👋 I'm Tatsuya Ichinose!";
  const welcomeMessage = lng === "ja" ? "Welcome to my website! 🎉" : "Welcome to my website! 🎉";
  const studentInfo = lng === "ja" 
    ? "東京科学大学 情報理工学院 情報工学科の学部生です。"
    : "I'm an undergraduate student at Institute of Science Tokyo majoring in Computer Science.";
  const interestInfo = lng === "ja" 
    ? "自然言語処理に興味があります。"
    : "I'm interested in Natural Language Processing, especially about the generation of text.";

  return (
    <TypeBackgroundBox backgroundImage={`${process.env.PUBLIC_URL}/images/sf.jpeg`}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        textAlign="center"
        sx={{ p: 2, color: "white" }}  
      >
        <Box
          position="absolute"
          top={16}
          right={16}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'white' }}>
            <ElementsDarkmode />
            <ElementsLanguagemenu />
          </Stack>
        </Box>
        
        <TypeIt options={{ speed: 35, waitUntilVisible: true, lifeLike: true, cursor: false }}>
          <h1>{greeting}</h1>
          <h2>{welcomeMessage}</h2>
        </TypeIt>
        <Avatar alt="Tatsuya Ichinose" src={`${process.env.PUBLIC_URL}/images/me.jpg`} sx={{ width: 150, height: 150 }} />
        <br />
        <Typography variant="body2">
          <CiMail />
          &nbsp;
          <a href="mailto:ichinose.t.2dcf@m.isct.ac.jp" style={{ color: "white" }}>
            <strong>ichinose.t.2dcf@m.isct.ac.jp</strong>
          </a>
          <br />
          <br />
          <ElementsSnslinks style={{ width: '150px', height: '150px' }}/>
        </Typography>
        <br />
        <Typography variant="body2" color="white" component="p">
          {studentInfo}
          <br />
          {interestInfo}
          <br />
        </Typography>
      </Box>
    </TypeBackgroundBox>
  );
}