import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import ArticleIcon from '@mui/icons-material/Article';
import TimelineFilter from './TimelineFilter';
import AppsIcon from '@mui/icons-material/Apps';

export default function SimpleSlide() {
  const [selected, setSelected] = React.useState('All');

  const handleChange = (event, newSelected) => {
    if (newSelected !== null) {
      setSelected(newSelected);
    }
  };

  const renderContent = () => {
    switch (selected) {
      case 'All':
        return <TimelineFilter filterTag={null} />
      default:
        return <TimelineFilter filterTag={selected} />;
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
          
        }}
      >
        <h1>⏳Personal history</h1>
        <p>
          Click on the buttons to filter the timeline.
          <br />
          Click on the underlined items or icons to see the details of each.
        </p>
        <ToggleButtonGroup
          color="primary"
          value={selected}
          exclusive
          onChange={handleChange}
          aria-label="Timeline Selection"
          size='small'
          sx={{
            '& .MuiToggleButton-root': {
              fontSize: { xs: '0.5rem', sm: '0.75rem', md: '0.75rem' },
             
            },
          }}
        >
          <ToggleButton value="All"><AppsIcon />&nbsp;All</ToggleButton>
          <ToggleButton value="papers"><ArticleIcon />&nbsp;Papers</ToggleButton>
          <ToggleButton value="study"><SchoolIcon />&nbsp;Study</ToggleButton>
          <ToggleButton value="projects"><PhonelinkIcon />&nbsp;Projects</ToggleButton>
          <ToggleButton value="work"><WorkIcon />&nbsp;Work Experience</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Paper elevation={0} >
        {renderContent()}
      </Paper>
    </Box>
  );
}