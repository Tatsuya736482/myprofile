import React from 'react';
import Box from '@mui/material/Box';
import TypeIt from "typeit-react";

export default function ContentsSkills({ lng = "en" }) {
  const title = lng === "ja" ? "📚 資格など" : "📚 Skills";
  const languageAbility = lng === "ja" ? "✔︎ 言語" : "✔︎ Language Ability";
  const english = lng === "ja" ? "英語" : "English";
  const englishDetail = lng === "ja" ? "TOEIC 895 (2025年1月26日取得)" : "TOEIC 895 (Obtained on January 26, 2025)";
  const japanese = lng === "ja" ? null : "Japanese";
  const japaneseDetail = lng === "ja" ? null : "Native";

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      sx={{ p: 2, "& h2, & p": { margin: 0 } }}
    >
      <TypeIt options={{ speed: 35, waitUntilVisible: true, lifeLike: true, cursor: false }}>
        <h1>{title}</h1>
      </TypeIt>
      <h2>{languageAbility}</h2>
      <Box>
        <ul style={{ padding: 0 }}>
          <li>
            <strong>{english}</strong>
            <ul style={{ paddingLeft: '20px' }}>
              <li>{englishDetail}</li>
            </ul>
          </li>
          {japanese && (
            <li>
              <strong>{japanese}</strong>
              <ul style={{ paddingLeft: '20px' }}>
                <li>{japaneseDetail}</li>
              </ul>
            </li>
          )}
        </ul>
      </Box>
    </Box>
  );
}