import React, { useState, useMemo } from "react";
import { Typography, Stack, Box, useTheme, Link } from "@mui/material";

export default function TypeTimeline({
  date,
  title,
  subtitle,
  detail,
  image,
  links,
  lng = "ja",
  topLine = true,
  bottomLine = true,
  logoSize = 100,   // デフォルトを少し小さめに
  minH = 120,       // デフォルト縦幅を小さめに
  id,
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const lineColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)";
  const dotColor = theme.palette.primary.main;

  const pickText = (value, lng) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object" && (value.en || value.ja)) {
      return value[lng] || value.en || value.ja || "";
    }
    return String(value);
  };


  return (
    <Stack
      id={id}
      direction="row"
      spacing={2}
      alignItems="stretch"
      sx={{
        py: 2,          // 縦のパディングを小さめに
        position: "relative",
        minHeight: minH,
      }}
    >
      {/* タイムライン（縦線＋ドット） */}
      <Box
        sx={{
          position: "relative",
          width: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
        aria-hidden
      >
        {topLine && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: "50%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 2,
              bgcolor: lineColor,
            }}
          />
        )}
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: dotColor,
            border: `2px solid ${theme.palette.background.paper}`,
          }}
        />
        {bottomLine && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 2,
              bgcolor: lineColor,
            }}
          />
        )}
      </Box>

      {/* 本文エリア */}
      <Stack direction="column" spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 0.5, opacity: 0.9 }}>
          {date}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: logoSize,
              height: logoSize,
              borderRadius: 2,
              bgcolor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/images/timeLineIcons/${image}`}
              alt={`${pickText(title, lng)} logo`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.05rem" }}>
              {pickText(title, lng)}
            </Typography>

            {subtitle && (
              <Typography variant="subtitle2" sx={{ mt: 0.2, fontSize: "0.9rem" }}>
                {pickText(subtitle, lng)}
              </Typography>
            )}

            {links && links[lng] && Array.isArray(links[lng]) && (
              <Box sx={{ mt: 0.5, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {links[lng].map((link, index) => (
                  <Link
                    key={index}
                    component="button"
                    type="button"
                    onClick={() => window.open(link.url, "_blank")}
                    sx={{
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {link.title}
                  </Link>
                ))}
              </Box>
            )}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
