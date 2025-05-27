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
import ElementsOutline from './ElementsOutline';
export default function ContentsSelfIntroduction({ lng = "en" }) {
  const greeting = lng === "ja" ? "一瀬 達矢(Tatsuya Ichinose)" : "Hi👋 I'm Tatsuya Ichinose!";
  const welcomeMessage = lng === "ja" ? "Welcome to my website! 🎉" : "Welcome to my website! 🎉";
  const studentInfo = lng === "ja" 
    ? "東京科学大学 情報理工学院 情報工学科,岡崎研究室所属の学部4年生です。"
    : "I'm an undergraduate student at Institute of Science Tokyo majoring in Computer Science.";
  const interestInfo = lng === "ja" 
    ? "自然言語処理に関する研究を中心に扱う岡崎研究室に所属しています。 研究室では、 Swallow Projectの一員として Swallow LLMの構築やLLMの評価基盤の構築、Swallow LLM Leaderboardに評価結果を公開するなどの活動をしています。"
    : "I joined the Okazaki Laboratory, which focuses primarily on research in natural language processing (NLP).As a member of the Swallow Project, I have been involved in the development of the Swallow LLM, the construction of evaluation infrastructure for large language models (LLMs), and the publication of evaluation results on the Swallow LLM Leaderboard.";

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


        
        <Box minHeight={'200px'} pt={'10px'}>
        <h1>{greeting}</h1>
        <TypeIt options={{ speed: 30, waitUntilVisible: true, cursor: false }}>
          <h2>{welcomeMessage}</h2>
        </TypeIt>
        </Box>
        
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
        <Typography variant="body2" color="white" component="p" width={{'md':'600px'}}>
          {studentInfo}
          <br />
          {interestInfo}
          <br />
        </Typography>
        <br />
        <br />
        <Box>
          <ElementsOutline lng={lng}/>
        </Box>
      </Box>
    </TypeBackgroundBox>
  );
}