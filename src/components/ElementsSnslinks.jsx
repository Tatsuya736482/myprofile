import React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { SiWantedly } from "react-icons/si";
import { SiQiita } from "react-icons/si";
import { SiZenn } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

export default function CustomPageToolbar({ color = 'white' }) {
    return (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'white' }}>
          <a href="mailto:tatsuya.ichinose@nlp.comp.isct.ac.jp" style={{ color: 'black' }}>
            <IconButton aria-label="email" size="small">
              <EmailIcon fontSize="inherit"style={{ color }} />
            </IconButton>
          </a>
          <a href="https://x.com/tatsuya_ich" target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="zenn" size="small">
              <FaXTwitter style={{ color }}/>
            </IconButton>
          </a>
          <a href="https://github.com/Tatsuya736482" target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="github" size="small">
              <GitHubIcon fontSize="inherit" style={{ color }} />
            </IconButton>
          </a>
          <a href="https://www.linkedin.com/in/tatsuya-ichinose-265315342/" target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="linkedin" size="small">
              <LinkedInIcon fontSize="inherit" style={{ color }}/>
            </IconButton>
          </a>
          <a href="https://qiita.com/A12" target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="qiita" size="small">
              <SiQiita style={{ color }}/>
            </IconButton>
          </a>
          <a href="https://zenn.dev/yay1" target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="zenn" size="small">
              <SiZenn style={{ color }}/>
            </IconButton>
          </a>
        </Stack>

    );
  }