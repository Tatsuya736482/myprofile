import React from 'react';
import Box from '@mui/material/Box';
import TypeIt from "typeit-react";
import Stack from '@mui/material/Stack';
import SchoolIcon from '@mui/icons-material/School';

export default function ContentsEducation({ lng = "en" }) {
  const institute = lng === "ja" ? "東京科学大学" : "Institute of Science Tokyo";
  const degree =
    lng === "ja"
      ? "2022年4月 入学\n2026年3月 卒業式代表・優秀学生証"
      : "Admitted in April 2022\nGraduated in March 2026 as commencement representative and recipient of the Excellent Student Award";
  const period = lng === "ja" ? "2022年4月 - 2026年3月" : "April 2022 - March 2026";

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      sx={{ p: 2, "& h2, & p": { margin: 0 }, "& p": { whiteSpace: "pre-line" } }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <SchoolIcon fontSize="large" />
        <TypeIt options={{ speed: 35, waitUntilVisible: true, lifeLike: true, cursor: false }}>
          <h1>{lng === "ja" ? "所属" : "Education"}</h1>
        </TypeIt>
      </Stack>
      <h2>{institute}</h2>
      <p>
        {degree}
        <br />
        {period}
      </p>
    </Box>
  );
}