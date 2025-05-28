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
  const basicInfo = lng === "ja"
    ? <>東京科学大学 情報理工学院 情報工学科,
    <a
      href="https://www.nlp.c.titech.ac.jp/index.ja.html"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#42a5f5', textDecoration: 'underline' }} // 水色 + 下線
    >
      岡崎研究室
    </a>
    所属の学部4年生です。
    研究室では、 
    <a
      href="https://swallow-llm.github.io/index.ja.html"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#42a5f5', textDecoration: 'underline' }} // 水色 + 下線
    >
      Swallow Project
    </a>
    の一員としてLLMの評価基盤の構築、
    <a
      href="https://swallow-llm.github.io/leaderboard/index-chat.ja.html"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#42a5f5', textDecoration: 'underline' }} // 水色 + 下線
    >
      Swallow LLM Leaderboard
    </a>に評価結果を公開するなどの活動をしています。
    </> 
    : <>
    I'm an undergraduate student at Institute of Science Tokyo majoring in Computer Science.
    I'm a member of
    <a
      href="https://www.nlp.c.titech.ac.jp/index.ja.html"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#42a5f5', textDecoration: 'underline' }} // 水色 + 下線
    >
      Okazaki Laboratory
    </a>
    , which focuses primarily on research in natural language processing (NLP).
    As a member of the 
    <a
      href="https://swallow-llm.github.io/index.ja.html"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#42a5f5', textDecoration: 'underline' }} // 水色 + 下線
    >
      Swallow Project
    </a>
    ,I have been involved in the development of the Swallow LLM, the construction of evaluation infrastructure for large language models (LLMs), 
    and the publication of evaluation results on the 
    <a
      href="https://swallow-llm.github.io/leaderboard/index-chat.ja.html"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#42a5f5', textDecoration: 'underline' }} // 水色 + 下線
    >
      Swallow LLM Leaderboard
    </a>
    .
    </>
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
          {basicInfo}
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