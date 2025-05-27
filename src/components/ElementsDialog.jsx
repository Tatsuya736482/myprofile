import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useTheme,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export  function AppleGlassDialog({ open, onClose, title, detail }) {
  const theme = useTheme();
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    if (detail && detail.endsWith(".md")) {
      fetch(detail)
        .then((res) => res.text())
        .then((text) => setMarkdownContent(text))
        .catch((err) => setMarkdownContent("読み込みに失敗しました"));
    }
  }, [detail]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      BackdropProps={{ sx: { backgroundColor: 'transparent' } }}
      PaperProps={{
        sx: {
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.3)'
              : 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 4,
          boxShadow: 10,
        },
      }}
    >
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </DialogContent>
    </Dialog>
  );
}
