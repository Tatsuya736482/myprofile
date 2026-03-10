import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import DownloadIcon from "@mui/icons-material/Download";
import PlaceIcon from "@mui/icons-material/Place";
import ArticleIcon from "@mui/icons-material/Article";
import CloseIcon from "@mui/icons-material/Close";
import ListAltIcon from "@mui/icons-material/ListAlt";

import materialsData from "../data/materials.json";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Materials({ lng = "en" }) {
  const lngSupported = lng.startsWith("ja") ? "ja" : "en";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mode, setMode] = useState("light");
  const isDark = mode === "dark";
  const darkTheme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [listOpen, setListOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // コンテナ幅の監視
  useEffect(() => {
    const el = pdfContainerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages: n }) => {
    setNumPages(n);
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
  const previewUrl = (m) =>
    m.preview ? `${basePath(m.folder)}/${m.preview}` : null;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppProvider>
        {/* ===== 右上コントロール ===== */}
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
          <Box
            onClick={() => navigate(`/${lngSupported}`)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
              px: 1.2,
              py: 0.5,
              borderRadius: 2,
              "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
              "&:active": { bgcolor: "rgba(255,255,255,0.25)" },
            }}
          >
            <ArrowBackIcon sx={{ color: "white", fontSize: isMobile ? 16 : 18 }} />
            <Typography
              variant={isMobile ? "caption" : "body2"}
              sx={{ color: "white", fontWeight: 600, letterSpacing: 0.3 }}
            >
              {lngSupported === "ja" ? "自己紹介へ" : "About Me"}
            </Typography>
          </Box>
        </Box>

        {/* ===== フローティングメニュー (SideNav風) ===== */}
        <AnimatePresence>
          <motion.div
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 25, delay: 0.3 }}
            style={{
              position: "fixed",
              top: isMobile ? "auto" : 88,
              bottom: isMobile ? 16 : "auto",
              right: isMobile ? 16 : 16,
              zIndex: 10000,
            }}
          >
            {isMobile ? (
              /* モバイル: FABスタイル */
              <IconButton
                onClick={() => setListOpen(true)}
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
                  border: "1px solid",
                  borderColor: "divider",
                  width: 48,
                  height: 48,
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <ListAltIcon />
              </IconButton>
            ) : (
              /* デスクトップ: カード */
              <Box
                sx={{
                  width: 280,
                  px: 2.5,
                  py: 2,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                {/* プロフィール */}
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar
                    alt="Tatsuya Ichinose"
                    src={`${process.env.PUBLIC_URL}/images/me.jpg`}
                    onClick={() => navigate(`/${lngSupported}`)}
                    sx={{ width: 40, height: 40, cursor: "pointer", "&:hover": { opacity: 0.8 } }}
                  />
                  <Box>
                    <Typography variant="body2" fontWeight={700} lineHeight={1.3}>
                      {lngSupported === "ja" ? "一瀬 達矢" : "Tatsuya Ichinose"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" lineHeight={1.3}>
                      {lngSupported === "ja" ? "東京科学大学 岡崎研" : "Okazaki Lab, IST"}
                      <br />
                      Swallow LLM
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ mb: 1.5 }} />

                {/* 注目情報 */}
                {highlightedMaterial && (
                  <Box sx={{ mb: 1.5 }}>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 0.5 }}>
                      <StarIcon sx={{ fontSize: 14, color: "#FFD700" }} />
                      <Typography variant="caption" fontWeight={700}>
                        {lngSupported === "ja" ? "注目の発表" : "Featured"}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                      {highlightedMaterial.title[lngSupported]}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                      {highlightedMaterial.description[lngSupported]}
                    </Typography>
                    {highlightedMaterial.schedule && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.3, mb: 1 }}>
                        <PlaceIcon sx={{ fontSize: 13 }} />
                        {highlightedMaterial.schedule[lngSupported]}
                      </Typography>
                    )}
                    {highlightedMaterial.paperUrl && (
                      <Button
                        size="small"
                        startIcon={<ArticleIcon sx={{ fontSize: 14 }} />}
                        href={highlightedMaterial.paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ textTransform: "none", fontSize: "0.75rem", p: 0, minWidth: 0, "&:hover": { bgcolor: "transparent" } }}
                      >
                        {lngSupported === "ja" ? "論文" : "Paper"}
                      </Button>
                    )}
                  </Box>
                )}

                <Divider sx={{ mb: 1.5 }} />

                {/* 発表資料一覧ボタン */}
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  startIcon={<ListAltIcon />}
                  onClick={() => setListOpen(true)}
                  sx={{ textTransform: "none", borderRadius: 2, mb: 1 }}
                >
                  {lngSupported === "ja" ? "発表資料一覧" : "All Materials"}
                </Button>

                <Button
                  fullWidth
                  size="small"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate(`/${lngSupported}`)}
                  sx={{ textTransform: "none", borderRadius: 2, color: "text.secondary" }}
                >
                  {lngSupported === "ja" ? "自己紹介へ" : "About Me"}
                </Button>
              </Box>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ===== メイン: PDF表示 ===== */}
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {highlightedMaterial ? (
            <Box
              ref={pdfContainerRef}
              sx={{
                flex: 1,
                width: "100%",
                overflowY: "auto",
                bgcolor: isDark ? "grey.900" : "grey.200",
                display: "flex",
                flexDirection: "column",
                alignItems: isMobile ? "center" : "flex-start",
                pt: { xs: 8, sm: 10 },
                pb: 2,
                pl: isMobile ? 0 : 4,
                pr: isMobile ? 0 : "320px",
                gap: 2,
              }}
            >
              {/* モバイル: 日時・場所バナー */}
              {isMobile && highlightedMaterial.schedule && (
                <Box
                  sx={{
                    width: "100%",
                    px: 2,
                    py: 1,
                    bgcolor: isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.6)",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <PlaceIcon sx={{ fontSize: 16, color: "white" }} />
                  <Typography variant="caption" fontWeight={600} sx={{ color: "white" }}>
                    {highlightedMaterial.schedule[lngSupported]}
                  </Typography>
                </Box>
              )}
              <Document
                file={pdfUrl(highlightedMaterial)}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8, gap: 2 }}>
                    <CircularProgress />
                    <Typography variant="body2" color="text.secondary">
                      {lngSupported === "ja" ? "PDF を読み込み中..." : "Loading PDF..."}
                    </Typography>
                  </Box>
                }
                error={
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8, gap: 1 }}>
                    <PictureAsPdfIcon sx={{ fontSize: 48, color: "error.main" }} />
                    <Typography variant="body2" color="error">
                      {lngSupported === "ja" ? "PDF の読み込みに失敗しました" : "Failed to load PDF"}
                    </Typography>
                  </Box>
                }
              >
                {numPages && Array.from({ length: numPages }, (_, i) => (
                  <Page
                    key={i + 1}
                    pageNumber={i + 1}
                    width={containerWidth ? Math.min(containerWidth - 32, 1200) : undefined}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                ))}
              </Document>
            </Box>
          ) : (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "background.default",
              }}
            >
              <PictureAsPdfIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                {lngSupported === "ja" ? "発表資料が見つかりません" : "No material found"}
              </Typography>
            </Box>
          )}
        </Box>

        {/* ===== 発表資料一覧ダイアログ ===== */}
        <Dialog
          open={listOpen}
          onClose={() => setListOpen(false)}
          maxWidth="sm"
          fullWidth
          scroll="paper"
          PaperProps={{
            sx: {
              bgcolor: isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: 4,
              boxShadow: 10,
            },
          }}
          BackdropProps={{ sx: { backgroundColor: "rgba(0,0,0,0.3)" } }}
        >
          <DialogTitle sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
            <ListAltIcon />
            {lngSupported === "ja" ? "発表資料一覧" : "All Materials"}
            <IconButton
              onClick={() => setListOpen(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Stack divider={<Divider />} spacing={0}>
              {sortedMaterials.map((material, idx) => {
                const isHL = material.id === (highlightId || materials.find((m) => m.featured)?.id);
                const prevDate = idx > 0 ? sortedMaterials[idx - 1].date : null;
                const showDateHeader = isMobile && material.date !== prevDate;
                return (
                  <React.Fragment key={material.id}>
                    {showDateHeader && (
                      <Typography variant="caption" fontWeight={700} sx={{ pt: idx > 0 ? 2 : 0.5, pb: 0.5, px: 1, color: "text.secondary", letterSpacing: 0.5 }}>
                        {material.date}
                      </Typography>
                    )}
                    <Box
                    key={material.id}
                    onClick={() => {
                      navigate(`/${lngSupported}/materials?highlight=${material.id}`);
                      setListOpen(false);
                    }}
                    sx={{
                      display: "flex",
                      alignItems: isMobile ? "flex-start" : "center",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? 1 : 2,
                      py: 2,
                      px: 1,
                      cursor: "pointer",
                      borderLeft: isHL ? "3px solid" : "3px solid transparent",
                      borderColor: isHL ? "primary.main" : "transparent",
                      transition: "background-color 0.2s",
                      "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" },
                    }}
                  >
                    {/* ロゴ */}
                    <Stack direction="row" spacing={1} alignItems="center" flexShrink={0}>
                      <Box
                        component="img"
                        src={logoUrl(material)}
                        alt={material.conference}
                        sx={{
                          width: 40,
                          height: 40,
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
                          sx={{
                            width: 64,
                            height: 44,
                            objectFit: "cover",
                            objectPosition: "top left",
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: "divider",
                          }}
                        />
                      )}
                    </Stack>

                    {/* 情報 */}
                    <Box flex={1} minWidth={0}>
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 0.3 }}>
                        <Typography variant="body2" fontWeight={600} sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: isMobile ? "normal" : "nowrap",
                        }}>
                          {material.title[lngSupported]}
                        </Typography>
                        {material.featured && (
                          <StarIcon sx={{ fontSize: 14, color: "#FFD700", flexShrink: 0 }} />
                        )}
                      </Stack>
                      <Typography variant="caption" color="text.secondary" sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}>
                        {material.description[lngSupported]}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.3 }}>
                        <Typography variant="caption" color="text.disabled">
                          {material.date}
                        </Typography>
                        <Chip label={material.type} size="small" variant="outlined" sx={{ height: 18, fontSize: "0.6rem" }} />
                      </Stack>
                    </Box>

                    {/* アクション */}
                    <Stack direction="row" spacing={0.5} flexShrink={0}>
                      <Tooltip title={lngSupported === "ja" ? "表示" : "View"}>
                        <IconButton
                          size="small"
                          onClick={() => {
                            navigate(`/${lngSupported}/materials?highlight=${material.id}`);
                            setListOpen(false);
                          }}
                        >
                          <PictureAsPdfIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={lngSupported === "ja" ? "ダウンロード" : "Download"}>
                        <IconButton size="small" href={pdfUrl(material)} download>
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={lngSupported === "ja" ? "新しいタブ" : "New tab"}>
                        <IconButton size="small" href={pdfUrl(material)} target="_blank" rel="noopener noreferrer">
                          <OpenInNewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                  </React.Fragment>
                );
              })}
            </Stack>
          </DialogContent>
        </Dialog>

        {/* フッターオーバーレイ */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            py: 0.5,
            fontSize: "0.7rem",
            color: "text.disabled",
            bgcolor: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 1,
          }}
        >
          © {new Date().getFullYear()} Tatsuya Ichinose
        </Box>
      </AppProvider>
    </ThemeProvider>
  );
}
