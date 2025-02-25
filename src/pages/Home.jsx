import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';

// material-ui
// https://mui.com/
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

// Scroll
//https://github.com/fisshy/react-scroll?tab=readme-ov-file
import { Element,scroller } from 'react-scroll';

// Defined by myself
import ContentsSelfIntroduction from '../components/ContentsSelfIntroduction';
import ContentsEducation from '../components/ContentsEducation';
import ContentsSkills from '../components/ContentsSkills';
import ContentsTimeline from '../components/ContentsTimeline';
import ElementsDarkmode from '../components/ElementsDarkmode';


export default function Home({lng="en"}) {
  const lngSupported = lng.startsWith("ja") ? "ja" : "en";

  return (
    <AppProvider>
      <Paper >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          textAlign="center"
          
        >
        <ContentsSelfIntroduction lng={lngSupported}/>
      </Box>     
        <Paper elevation={4} sx={{ p: 2 }}>
          <br />
          <Element name="Timeline" />
          <Box ustifyContent="center" width="100%" minHeight={600} >
            <ContentsTimeline lng={lngSupported}/>
          </Box>
          <br />
          <Divider />
          <Element name="Skills" />
          <ContentsSkills lng={lngSupported}/>
          <br />
        </Paper>
        <br />
        <footer style={{ textAlign: "center", padding: "10px", fontSize: "14px" }}>
          © {new Date().getFullYear()} Tatsuya Ichinose. All rights reserved.
        </footer>
      </Paper>
    </AppProvider>
  );
}