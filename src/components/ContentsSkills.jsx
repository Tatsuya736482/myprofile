import React from 'react';
import Box from '@mui/material/Box';

export default function ContentsSkills() {
    return(
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          sx={{ p: 2, "& h2, & p": { margin: 0 } }}
        >
          <h1>💪 Skills</h1>
          <h2>✔︎ Language Ability</h2>
          <Box>
            <ul style={{  padding: 0 }}>
              <li>
                <strong>English</strong>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>TOEIC 895 (Obtained on January 26, 2025)</li>
                </ul>
              </li>
              <li>
                <strong>Japanese</strong>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>Native</li>
                </ul>
              </li>
            </ul>

          </Box>  
          
        </Box>
    );
}
