import React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { keyframes } from '@mui/material/styles';
import { SiWantedly } from "react-icons/si";
import { SiQiita } from "react-icons/si";
import { SiZenn } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

// ...existing code...
const wave = keyframes`
  0% { transform: rotate(0.0deg) }
  10% { transform: rotate(14.0deg) }
  20% { transform: rotate(-8.0deg) }
  30% { transform: rotate(14.0deg) }
  40% { transform: rotate(-4.0deg) }
  50% { transform: rotate(10.0deg) }
  60% { transform: rotate(0.0deg) }
  100% { transform: rotate(0.0deg) }
`;

export default function CustomPageToolbar({ color = 'white' }) {
    const iconHoverStyle = {
      '&:hover svg': {
        animation: `${wave} 2.5s infinite`,
        transformOrigin: '70% 70%',
      },
    };

    return (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'white' }}>
          <a href="mailto:tatsuya.ichinose@nlp.comp.isct.ac.jp" style={{ color: 'black' }}>
            <IconButton aria-label="email" size="medium" sx={iconHoverStyle}>
              <EmailIcon fontSize="inherit"style={{ color }} />
            </IconButton>
          </a>
          <a href="https://x.com/tatsuya_ich" target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="zenn" size="medium" sx={iconHoverStyle}>
              <FaXTwitter style={{ color }}/>
            </IconButton>
          </a>
          <a href="https://github.com/Tatsuya736482" target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="github" size="medium" sx={iconHoverStyle}>
              <GitHubIcon fontSize="inherit" style={{ color }} />
            </IconButton>
          </a>
          <a href="https://www.linkedin.com/in/tatsuya-ichinose-265315342/" target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="linkedin" size="medium" sx={iconHoverStyle}>
              <LinkedInIcon fontSize="inherit" style={{ color }}/>
            </IconButton>
          </a>
          <a href="https://qiita.com/A12" target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="qiita" size="medium" sx={iconHoverStyle}>
              <SiQiita style={{ color }}/>
            </IconButton>
          </a>
          <a href="https://zenn.dev/yay1" target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="zenn" size="medium" sx={iconHoverStyle}>
              <SiZenn style={{ color }}/>
            </IconButton>
          </a>
        </Stack>
    );
  }
