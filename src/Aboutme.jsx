import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import {
  PageContainer,
  PageHeader,
  PageHeaderToolbar,
} from '@toolpad/core/PageContainer';

// material-ui
// https://mui.com/
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// icons
// https://mui.com/
//https://react-icons.github.io/react-icons/
import { SiWantedly } from "react-icons/si";
import { SiQiita } from "react-icons/si";
import { SiZenn } from "react-icons/si";
import { CiMail } from "react-icons/ci";
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import DashboardIcon from '@mui/icons-material/Dashboard';

// TypeIt 
// https://www.typeitjs.com/docs/react/
import TypeIt from "typeit-react";

// Defined by myself
import MoveTimeline from './MoveTimeline';
import Menu from './Menu';

const NAVIGATION = [
  { segment: 'inbox', title: 'Inbox' },
  {
    segment: 'home',
    title: 'about me',
    icon: <DashboardIcon />,
  },
];

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const SuperStrong = ({ children }) => {
  return <strong style={{ fontSize: 'calc(2rem + 1vw)' }}>{children}</strong>;
};

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

function CustomPageToolbar() {
  return (
    <PageHeaderToolbar>
      <Stack direction="row" spacing={1} alignItems="center">
        <a href="mailto:ichinose.t.2dcf@m.isct.ac.jp" style={{ color: 'black' }}>
          <IconButton aria-label="email" size="small">
            <EmailIcon fontSize="inherit" />
          </IconButton>
        </a>
        <a href="https://github.com/Tatsuya736482" target="_blank" rel="noopener noreferrer">
          <IconButton aria-label="github" size="small">
            <GitHubIcon fontSize="inherit" />
          </IconButton>
        </a>
        <a href="https://www.linkedin.com/in/tatsuya-ichinose-265315342/" target="_blank" rel="noopener noreferrer">
          <IconButton aria-label="linkedin" size="small">
            <LinkedInIcon fontSize="inherit" />
          </IconButton>
        </a>
        <a href="https://www.wantedly.com/id/tatsuya_ichinose_f" target="_blank" rel="noopener noreferrer">
          <IconButton aria-label="wantedly" size="small">
            <SiWantedly />
          </IconButton>
        </a>
        <a href="https://qiita.com/A12" target="_blank" rel="noopener noreferrer">
          <IconButton aria-label="qiita" size="small">
            <SiQiita />
          </IconButton>
        </a>
        <a href="https://zenn.dev/yay1" target="_blank" rel="noopener noreferrer">
          <IconButton aria-label="zenn" size="small">
            <SiZenn />
          </IconButton>
        </a>

        <Menu />
      </Stack>
    </PageHeaderToolbar>
  );
}

function CustomPageHeader() {
  return <PageHeader slots={{ toolbar: CustomPageToolbar }} />;
}

export default function PageContainerBasic(props) {
  const { window } = props;
  const router = useDemoRouter('/home');
  const theme = useTheme();
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={theme}
      window={demoWindow}
      branding={{
        title: 'Tatsuya Ichinose',
      }}
    >
      <Paper sx={{ p: 2, width: '100%', backgroundColor: "#f5f5f5" }}>
        <PageContainer
          slots={{
            header: CustomPageHeader,
          }}
        >
          <Box ustifyContent="center" width="100%">
            <Grid item xs={12}>
              <Card >
      
      
                <CardContent>
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
                    <Avatar alt="Tatsuya Ichinose" src="https://tatsuya736482.github.io/myprofile/images/me.jpg" sx={{ width: 150, height: 150 }} />
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
                  
                  

                  
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <br />
                    <Box ustifyContent="center" width="100%" minHeight={600} >
                        <MoveTimeline />
                    </Box>
                  </Paper>
                  <br />
                  <Paper elevation={3} >
                    <Box   
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                      sx={{ p: 2, "& h2, & p": { margin: 0 } }}
                    >
                      <h1>📚 Education</h1>
                      <h2>Institute of Science Tokyo</h2>
                      <p>Bachelor of Computer Science
                      <br />
                      April 2022 - Pressent
                      </p>
                    </Box>
                  </Paper>
                  <br />

                  <Paper elevation={3}>
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
                  </Paper>


                </CardContent>
              </Card>
            </Grid>
          </Box>
          <footer style={{ textAlign: "center", padding: "10px", background: "#f8f8f8", fontSize: "14px" }}>
            © {new Date().getFullYear()} Tatsuya Ichinose. All rights reserved.
          </footer>
          <CustomPageToolbar/>
        </PageContainer>
      </Paper>
    </AppProvider>
  );
}