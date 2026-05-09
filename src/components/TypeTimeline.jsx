import React, { useState, useMemo } from "react";
import { Typography, Stack, Box, useTheme, useMediaQuery, Link, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, TextField, Tooltip } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SlideshowIcon from '@mui/icons-material/Slideshow';

const MONTH_INDEX = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseMonthYear(str) {
  const m = str.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!m) return null;
  const month = MONTH_INDEX[m[1]];
  return month !== undefined ? new Date(parseInt(m[2]), month, 1) : null;
}

function computeDuration(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split(/\s+[-–—]\s+/);
  if (parts.length !== 2) return null;

  const isPresent = /present/i.test(parts[1]);
  const end = isPresent ? new Date() : parseMonthYear(parts[1]);
  let start = parseMonthYear(parts[0]);

  if (!start && end) {
    const onlyMonth = parts[0].trim().match(/^([A-Za-z]+)$/);
    if (onlyMonth) {
      const month = MONTH_INDEX[onlyMonth[1]];
      if (month !== undefined) start = new Date(end.getFullYear(), month, 1);
    }
  }

  if (!start || !end) return null;

  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  if (totalMonths <= 0) return null;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts2 = [];
  if (years > 0) parts2.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (months > 0) parts2.push(`${months} ${months === 1 ? "month" : "months"}`);
  return parts2.join(" ");
}

export default function TypeTimeline({
  date,
  title,
  subtitle,
  detail,
  image,
  links,
  bibtex, // Add bibtex prop
  lng = "ja",
  topLine = true,
  bottomLine = true,
  logoSize = 100,   // デフォルトを少し小さめに
  minH = 120,       // デフォルト縦幅を小さめに
  id,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const duration = computeDuration(date);
  
  // Dialog state for BibTeX
  const [bibDialogOpen, setBibDialogOpen] = useState(false);

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

  const getLinkIcon = (title) => {
    if (!title) return null;
    const lower = title.toLowerCase();
    if (lower.includes("paper") || lower.includes("pdf") || lower.includes("論文")) {
      return <PictureAsPdfIcon sx={{ fontSize: "1rem" }} />;
    }
    if (lower.includes("poster") || lower.includes("slide") || lower.includes("presentation") || lower.includes("ポスター")) {
      return <SlideshowIcon sx={{ fontSize: "1rem" }} />;
    }
    return null;
  };

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(bibtex);
  };
  
  const handleDownloadBibtex = () => {
    const element = document.createElement("a");
    const file = new Blob([bibtex], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "citation.bib";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Stack
      id={id}
      direction="row"
      spacing={0}
      alignItems="stretch"
      sx={{ py: 1.5, position: "relative", minHeight: minH }}
    >
      {/* 左：日付列（デスクトップのみ） */}
      {!isMobile && (
        <Box
          sx={{
            width: 160,
            flexShrink: 0,
            textAlign: "right",
            pr: 2.5,
            pt: 1,
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: "0.78rem", lineHeight: 1.5, color: "text.primary" }}>
            {date}
          </Typography>
          {duration && (
            <Typography sx={{ fontSize: "0.68rem", opacity: 0.5, lineHeight: 1.4, display: "block" }}>
              {duration}
            </Typography>
          )}
        </Box>
      )}

      {/* 中央：縦線＋ドット */}
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

      {/* 右：本文エリア */}
      <Stack direction="column" spacing={0.5} sx={{ flex: 1, minWidth: 0, pl: 2 }}>
        {/* モバイル時のみ日付を上部に表示 */}
        {isMobile && (
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: "0.72rem", color: "text.secondary" }}>
              {date}
            </Typography>
            {duration && (
              <Typography sx={{ fontSize: "0.65rem", opacity: 0.55 }}>
                {duration}
              </Typography>
            )}
          </Box>
        )}

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
              <Box sx={{ mt: 0.5, display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
                {links[lng].map((link, index) => (
                  <Link
                    key={index}
                    component="button"
                    type="button"
                    onClick={() => window.open(link.url, "_blank")}
                    sx={{
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {getLinkIcon(link.title)}
                    {link.title}
                  </Link>
                ))}
                
                {bibtex && (
                  <>
                     <Typography variant="body2" color="text.secondary">|</Typography>
                     <Link
                        component="button"
                        type="button"
                        onClick={() => setBibDialogOpen(true)}
                        sx={{
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          "&:hover": { textDecoration: "underline" },
                        }}
                     >
                       <LibraryBooksIcon sx={{ fontSize: "1rem" }} />
                       BibTeX
                     </Link>

                     <Dialog open={bibDialogOpen} onClose={() => setBibDialogOpen(false)} maxWidth="sm" fullWidth>
                        <DialogTitle>BibTeX</DialogTitle>
                        <DialogContent>
                            <TextField
                                multiline
                                fullWidth
                                rows={6}
                                value={bibtex}
                                InputProps={{
                                    readOnly: true,
                                    sx: { fontFamily: 'monospace', fontSize: '0.875rem' }
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button startIcon={<ContentCopyIcon />} onClick={handleCopyBibtex}>
                                {lng === "ja" ? "コピー" : "Copy"}
                            </Button>
                            <Button startIcon={<FileDownloadIcon />} onClick={handleDownloadBibtex}>
                                {lng === "ja" ? "ダウンロード" : "Download"}
                            </Button>
                            <Button onClick={() => setBibDialogOpen(false)}>
                                {lng === "ja" ? "閉じる" : "Close"}
                            </Button>
                        </DialogActions>
                     </Dialog>
                  </>
                )}
              </Box>
            )}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
