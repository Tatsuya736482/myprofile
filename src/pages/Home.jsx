import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';

// material-ui
// https://mui.com/
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

// Defined by myself
import ContentsSelfIntroduction from '../components/ContentsSelfIntroduction';
import ContentsEducation from '../components/ContentsEducation';
import ContentsSkills from '../components/ContentsSkills';
import ContentsTimeline from '../components/ContentsTimeline';


export default function Home() {

  return (
    <AppProvider>
      <Paper sx={{backgroundColor: "#f5f5f5" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          textAlign="center"
          
        >
        <ContentsSelfIntroduction />
      </Box>
        <Paper elevation={4} sx={{ p: 2 }}>
          <br />
          <Box ustifyContent="center" width="100%" minHeight={600} >
            <ContentsTimeline />
          </Box>
          <Divider />
          <ContentsEducation />
          <br />
          <Divider />
          <ContentsSkills />
          <br />
        </Paper>
        <br />
        <footer style={{ textAlign: "center", padding: "10px", background: "#f8f8f8", fontSize: "14px" }}>
          © {new Date().getFullYear()} Tatsuya Ichinose. All rights reserved.
        </footer>
      </Paper>
    </AppProvider>
  );
}