import React from 'react';
import Box from '@mui/material/Box';
import TypeIt from "typeit-react";

export default function ContentsEducation({ lng = "en" }) {
  const title = lng === "ja" ? "📚 所属" : "📚 Education";
  const institute = lng === "ja" ? "東京科学大学" : "Institute of Science Tokyo";
  const degree = lng === "ja" ? "情報理工学院 情報工学科" : "Bachelor of Computer Science";
  const period = lng === "ja" ? "2022年4月 - 現在" : "April 2022 - Present";

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
      <h2>{institute}</h2>
      <p>
        {degree}
        <br />
        {period}
      </p>
    </Box>
  );
}