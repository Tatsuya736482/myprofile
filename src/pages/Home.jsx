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
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

// icons
// https://mui.com/
//https://react-icons.github.io/react-icons/
import DashboardIcon from '@mui/icons-material/Dashboard';

// TypeIt 
// https://www.typeitjs.com/docs/react/
import TypeIt from "typeit-react";

// Defined by myself
import ContentsSelfIntroduction from '../components/ContentsSelfIntroduction';
import ContentsEducation from '../components/ContentsEducation';
import ContentsSkills from '../components/ContentsSkills';
import ContentsSnslinks from '../components/ContentsSnslinks';
import ContentsTimeline from '../components/ContentsTimeline';

const NAVIGATION = [
  { segment: 'inbox', title: 'Inbox' },
  {
    segment: 'home',
    title: 'Home',
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
        <PageHeader slots={{ toolbar: ContentsSnslinks }} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          textAlign="center"
          sx={{ p: 2 }}
        >
        <ContentsSelfIntroduction />
      </Box>
        <br />
        <Paper elevation={3} sx={{ p: 2 }}>
          <br />
          <Box ustifyContent="center" width="100%" minHeight={600} >
            <ContentsTimeline />
          </Box>
        </Paper>
        <br />
        <Paper elevation={3} sx={{ p: 3 }}>
          <ContentsEducation />
        </Paper>
        <br />
        <Paper elevation={3} sx={{ p: 3}}>
          <ContentsSkills />
        </Paper>
        <footer style={{ textAlign: "center", padding: "10px", background: "#f8f8f8", fontSize: "14px" }}>
          © {new Date().getFullYear()} Tatsuya Ichinose. All rights reserved.
        </footer>
      </Paper>
    </AppProvider>
  );
}