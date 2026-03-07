import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import DownloadIcon from "@mui/icons-material/Download";

import ElementsDarkmode from "../components/ElementsDarkmode";
import ElementsLanguagemenu from "../components/ElementsLanguagemenu";
import materialsData from "../data/materials.json";

export default function Materials({ lng = "en" }) {
  const lngSupported = lng.startsWith("ja") ? "ja" : "en";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mode, setMode] = useState("light");
  const isDark = mode === "dark";
  const darkTheme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const highlightId = searchParams.get("highlight");
  const materials = materialsData.materials;

  const sortedMaterials = useMemo(() => {
    return [...materials].sort((a, b) => {
      if (highlightId) {
        if (a.id === highlightId) return -1;
        if (b.id === highlightId) return 1;
      }
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.date.localeCompare(a.date);
    });
  }, [materials, highlightId]);

  const highlightedMaterial = highlightId
    ? materials.find((m) => m.id === highlightId)
    : materials.find((m) => m.featured);

  const basePath = (folder) =>
    `${process.env.PUBLIC_URL}/images/materials/${folder}`;
  const pdfUrl = (m) => `${basePath(m.folder)}/${m.file}`;
  const logoUrl = (m) => `${basePath(m.folder)}/${m.logo}`;
  const previewUrl = (m) => m.preview ? `${basePath(m.folder)}/${m.preview}` : null;

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <AppProvider>
      {/* 右上コントロール */}
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
          "&:hover": { bgcolor: "rgba(0, 0, 0, 0.6)" },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "white" }}>
          <Tooltip title={lngSupported === "ja" ? "プロフィールへ" : "Go to Profile"}>
            <IconButton
              onClick={() => navigate(`/${lngSupported}`)}
              size="small"
              sx={{ color: "white" }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <ElementsDarkmode setModeFromParent={setMode} />
          <ElementsLanguagemenu />
        </Stack>
      </Box>

      {/* 自己紹介 */}
      <Box
        sx={{
          pt: { xs: 6, sm: 8 },
          pb: { xs: 4, sm: 5 },
          px: { xs: 2, sm: 4 },
          position: "relative",
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/sf.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          maxWidth="900px"
          mx="auto"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Avatar
            alt="Tatsuya Ichinose"
            src={`${process.env.PUBLIC_URL}/images/me.jpg`}
            onClick={() => navigate(`/${lngSupported}`)}
            sx={{ width: 56, height: 56, border: "2px solid white", cursor: "pointer", transition: "opacity 0.2s", "&:hover": { opacity: 0.8 } }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: "white" }}>
              {lngSupported === "ja" ? "一瀬 達矢" : "Tatsuya Ichinose"}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
              {lngSupported === "ja"
                ? "東京科学大学 "
                : "Institute of Science Tokyo, B.Sc. Candidate (4th Year), "}
              
                {lngSupported === "ja" ? "岡崎研究室 学部4年" : "Okazaki Lab"}
             
            </Typography>
          </Box>
        </Stack>

        {/* 注目の発表 */}
        {highlightedMaterial && (
          <Box
            maxWidth="900px"
            mx="auto"
            mt={4}
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            alignItems={isMobile ? "flex-start" : "center"}
            gap={3}
            sx={{
              position: "relative",
              zIndex: 1,
              bgcolor: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(6px)",
              borderRadius: 2,
              p: { xs: 2, sm: 3 },
            }}
          >
            {/* ロゴ + プレビュー */}
            <Stack direction="row" spacing={2} alignItems="center" flexShrink={0}>
              <Box
                component="img"
                src={logoUrl(highlightedMaterial)}
                alt={highlightedMaterial.conference}
                sx={{
                  width: isMobile ? 60 : 80,
                  height: isMobile ? 60 : 80,
                  objectFit: "contain",
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.3)",
                  bgcolor: "rgba(255,255,255,0.9)",
                }}
              />
              {previewUrl(highlightedMaterial) && (
                <Box
                  component="img"
                  src={previewUrl(highlightedMaterial)}
                  alt="Preview"
                  onClick={() => window.open(pdfUrl(highlightedMaterial), "_blank")}
                  sx={{
                    width: isMobile ? 100 : 140,
                    height: isMobile ? 70 : 100,
                    objectFit: "cover",
                    objectPosition: "top left",
                    borderRadius: 1.5,
                    border: "1px solid rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    transition: "box-shadow 0.2s",
                    "&:hover": { boxShadow: 3 },
                  }}
                />
              )}
            </Stack>

            <Box flex={1}>
              <Chip
                icon={<StarIcon sx={{ fontSize: 16 }} />}
                label={lngSupported === "ja" ? "注目の発表" : "Featured"}
                size="small"
                variant="outlined"
                sx={{ mb: 1, color: "white", borderColor: "rgba(255,255,255,0.5)", "& .MuiChip-icon": { color: "#FFD700" } }}
              />
              <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5, color: "white" }}>
                {highlightedMaterial.title[lngSupported]}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: "rgba(255,255,255,0.85)" }}>
                {highlightedMaterial.description[lngSupported]}
                {highlightedMaterial.schedule && (
                  <> — {highlightedMaterial.schedule[lngSupported]}</>
                )}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<PictureAsPdfIcon />}
                  href={pdfUrl(highlightedMaterial)}
                  target="_blank"
                  rel="noopener noreferrer"
                  disableElevation
                  sx={{ bgcolor: "white", color: "black", "&:hover": { bgcolor: "grey.200" } }}
                >
                  {lngSupported === "ja" ? "PDFを開く" : "Open PDF"}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  href={pdfUrl(highlightedMaterial)}
                  download
                  sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)", "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)" } }}
                >
                  {lngSupported === "ja" ? "ダウンロード" : "Download"}
                </Button>
              </Stack>
            </Box>
          </Box>
        )}
      </Box>

      {/* メインコンテンツ */}
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <Box maxWidth="900px" mx="auto" px={{ xs: 2, sm: 3 }} py={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            {lngSupported === "ja" ? "発表資料" : "Presentation Materials"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {lngSupported === "ja"
              ? "学会やシンポジウムでの発表資料をまとめています。"
              : "A collection of presentation materials from conferences and symposiums."}
          </Typography>

          {/* テーブル風リスト */}
          <Stack divider={<Divider />} spacing={0}>
            {sortedMaterials.map((material) => {
              const isHL = material.id === highlightId;
              return (
                <Box
                  key={material.id}
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? 1.5 : 2.5,
                    py: 2.5,
                    px: isMobile ? 1 : 2,
                    borderLeft: isHL ? "3px solid" : "3px solid transparent",
                    borderColor: isHL ? "primary.main" : "transparent",
                    bgcolor: isHL
                      ? (isDark ? "rgba(25,118,210,0.08)" : "rgba(25,118,210,0.04)")
                      : "transparent",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      bgcolor: isDark ? "grey.900" : "grey.50",
                    },
                  }}
                >
                  {/* ロゴ + プレビュー */}
                  <Stack direction="row" spacing={1.5} alignItems="center" flexShrink={0}>
                    <Box
                      component="img"
                      src={logoUrl(material)}
                      alt={material.conference}
                      sx={{
                        width: isMobile ? 40 : 48,
                        height: isMobile ? 40 : 48,
                        objectFit: "contain",
                        borderRadius: 1.5,
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                      }}
                    />
                    {previewUrl(material) && (
                      <Box
                        component="img"
                        src={previewUrl(material)}
                        alt="Preview"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(pdfUrl(material), "_blank");
                        }}
                        sx={{
                          width: isMobile ? 64 : 80,
                          height: isMobile ? 44 : 56,
                          objectFit: "cover",
                          objectPosition: "top left",
                          borderRadius: 1,
                          border: "1px solid",
                          borderColor: "divider",
                          cursor: "pointer",
                          transition: "box-shadow 0.2s, transform 0.2s",
                          "&:hover": { boxShadow: 3, transform: "scale(1.05)" },
                        }}
                      />
                    )}
                  </Stack>

                  {/* 情報 */}
                  <Box flex={1} minWidth={0}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      flexWrap="wrap"
                      useFlexGap
                      sx={{ mb: 0.5 }}
                    >
                      <Typography variant="subtitle1" fontWeight={600} noWrap={!isMobile} sx={{ 
                        overflow: isMobile ? "visible" : "hidden",
                        textOverflow: isMobile ? "unset" : "ellipsis",
                        whiteSpace: isMobile ? "normal" : "nowrap",
                      }}>
                        {material.title[lngSupported]}
                      </Typography>
                      {material.featured && (
                        <Chip
                          icon={<StarIcon sx={{ fontSize: 14 }} />}
                          label="Featured"
                          size="small"
                          variant="outlined"
                          color="primary"
                          sx={{ height: 22, fontSize: "0.7rem" }}
                        />
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: isMobile ? 3 : 1,
                      WebkitBoxOrient: "vertical",
                    }}>
                      {material.description[lngSupported]}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                      <Typography variant="caption" color="text.disabled">
                        {material.date}
                      </Typography>
                      <Chip label={material.type} size="small" variant="outlined" sx={{ height: 20, fontSize: "0.65rem" }} />
                    </Stack>
                  </Box>

                  {/* アクション */}
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    flexShrink={0}
                    sx={{ ml: isMobile ? 0 : "auto" }}
                  >
                    <Tooltip title={lngSupported === "ja" ? "PDFを開く" : "Open PDF"}>
                      <IconButton
                        size="small"
                        href={pdfUrl(material)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <PictureAsPdfIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={lngSupported === "ja" ? "ダウンロード" : "Download"}>
                      <IconButton size="small" href={pdfUrl(material)} download>
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={lngSupported === "ja" ? "新しいタブで開く" : "Open in new tab"}>
                      <IconButton
                        size="small"
                        href={pdfUrl(material)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Box>

        {/* フッター */}
        <Box
          sx={{
            textAlign: "right",
            fontSize: "0.875rem",
            color: "text.secondary",
            mt: 4,
            px: 3,
            pb: 3,
          }}
        >
          <Button
            size="small"
            startIcon={<HomeIcon />}
            onClick={() => navigate(`/${lngSupported}`)}
            sx={{ mr: 2 }}
          >
            {lngSupported === "ja" ? "プロフィールに戻る" : "Back to Profile"}
          </Button>
          © {new Date().getFullYear()} Tatsuya Ichinose. All rights reserved.
        </Box>
      </Box>
    </AppProvider>
    </ThemeProvider>
  );
}
