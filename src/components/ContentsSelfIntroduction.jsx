
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TypeIt from 'typeit-react';
import { CiMail } from 'react-icons/ci';


export default function ContentsSelfIntroduction() {
    return(
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          textAlign="center"
          sx={{ p: 2 }}
        >
          <TypeIt options={{ speed: 35, waitUntilVisible: true, lifeLike: true, cursor: false }}>
            <h1>Hi👋 I'm Tatsuya Ichinose!</h1>
            <h2>Thank you for visiting my website! 🎉</h2>
          </TypeIt>
          <Avatar alt="Tatsuya Ichinose" src={`${process.env.PUBLIC_URL}/images/me.jpg`} sx={{ width: 150, height: 150 }} />
          <br />
          <Typography variant="body2">
            <CiMail />
            &nbsp;
            <a href="mailto:ichinose.t.2dcf@m.isct.ac.jp" style={{ color: 'black' }}>
              <strong>ichinose.t.2dcf@m.isct.ac.jp</strong>
            </a>
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary" component="p">
            I'm a undergraduate student at Institute of Science Tokyo majoring in Computer Science.
            <br />
            I'm interested in Natural Language Processing, especially about the generation of text.
            <br />
          </Typography>
        </Box>
    );
}