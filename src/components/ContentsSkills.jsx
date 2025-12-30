import React from "react";
import Box from "@mui/material/Box";
import TypeIt from "typeit-react";
import Typography from "@mui/material/Typography";

export default function ContentsSkills({ lng = "en" }) {
  const title = lng === "ja" ? "その他" : "Others";
  const english = lng === "ja" ? "英語" : "English";
  const englishDetail =
    lng === "ja"
      ? "TOEIC 895 (2025年1月26日取得)"
      : "TOEIC 895 (Obtained on January 26, 2025)";

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {lng === "ja" ? "その他" : "Others"}
      </Typography>

      <Box>
        {lng === "ja" ? (
          <ul style={{ padding: 0 }}>
            <li>
              <strong>英語</strong>
              <ul style={{ paddingLeft: "20px" }}>
                <li>TOEIC 895 (2025年1月26日取得)</li>
              </ul>
            </li>
            <li>
              <strong>応用情報技術者 (2025年12月25日取得)</strong>
            </li>
            <li>
              <strong>奨学金</strong>
              <ul style={{ paddingLeft: "20px" }}>
                <li>公益財団法人キーエンス財団 給付型奨学金</li>
              </ul>
            </li>
          </ul>
        ) : (
          <ul style={{ padding: 0 }}>
            <li>
              <strong>English</strong>
              <ul style={{ paddingLeft: "20px" }}>
                <li>TOEIC 895 (Obtained on January 26, 2025)</li>
              </ul>
            </li>
            <li>
              <strong>Applied Information Technology Engineer Examination (25 Dec 2025)</strong>
            </li>
            <strong>Scholarships</strong>
            <ul style={{ paddingLeft: "20px" }}>
              <li>Keyence Foundation – Merit-based Scholarship (Grant)</li>
            </ul>
          </ul>
        )}
      </Box>
    </Box>
  );
}
