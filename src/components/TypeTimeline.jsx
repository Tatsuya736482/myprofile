import React, { useState } from 'react';
import {
  Typography,
  Stack,
  Box,
  useTheme
} from '@mui/material';
import { AppleGlassDialog } from './ElementsDialog';

export default function TypeTimeline({ date, icon, title, subtitle, detail, image, lng = "en" }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  return (
    <>
     <Box
  sx={{
    width: '100%',
    px: 3,
    py: 2,
    borderRadius: 4,
    boxShadow: 3,
    overflow: 'hidden',
    position: 'relative',
    cursor: detail ? 'pointer' : 'default',
    border: detail ? '2px dashed #90caf9' : 'none', // ✅ 装飾例：水色の点線
  }}
  onClick={detail ? handleDialogOpen : undefined}
>
{detail && (
    <Box
      sx={{
        position: 'absolute',
        top: 1,
        right: 1,
        px: 1.2,
        py: 0.4,
        fontSize: '10px',
        fontWeight: 600,
        color: 'white',
        background: 'linear-gradient(90deg, #42a5f5, #f06292)',
        borderRadius: '12px',
        boxShadow: '0 0 4px rgba(0,0,0,0.2)',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {lng=="ja"?"クリックして詳細を確認":"Click to view details"}
    </Box>
  )}

        {/* すりガラスのオーバーレイ */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: 4,
          }}
        />

        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ position: 'relative', zIndex: 2 }}
        >
          <Stack
  direction={{ xs: 'column', sm: 'row' }} // 👈 スマホでは縦、タブレット以上では横
  alignItems="center"
  spacing={2}
  sx={{ position: 'relative', zIndex: 2 }}
>
  <Box sx={{ minWidth: 100, textAlign: 'center' }}>
    <Typography fontSize={12} color="text.secondary">
      {date}
    </Typography>
  </Box>

  <Box
    sx={{
      width: 70,
      height: 70,
      overflow: 'hidden',
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.background.paper,
    }}
  >
    <img
      src={`${process.env.PUBLIC_URL}/images/timeLineIcons/${image}`}
      alt="timeline"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
        borderRadius: '8px',
      }}
    />
  </Box>

  {/* 他の要素が続く場合はここに */}
</Stack>


          <Box sx={{ flex: 1 }}>
            <Stack spacing={0.5} mt={1}>
              <Typography fontSize={14} fontWeight={600} color="text.primary">
                {title[lng]}
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                {subtitle?.[lng]}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* ✅ モーダルで Markdown 表示 */}
      <AppleGlassDialog
  open={open}
  onClose={handleDialogClose}
  title={title[lng]}
  detail={`${process.env.PUBLIC_URL}/markdown/${lng}/${detail}`}
/>
    </>
  );
}
