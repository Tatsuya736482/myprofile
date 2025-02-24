import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import ArticleIcon from '@mui/icons-material/Article';
import TimelineFilter from './TypeTimelineFilter';
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
            width: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            flexWrap: 'wrap', // 折り返しを許可
          }}
        >
          <p>Filter by:</p>
          <ToggleButtonGroup
            color="primary"
            value={selected}
            exclusive
            onChange={handleChange}
            aria-label="Timeline Selection"
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                fontSize: { xs: '0.5rem', sm: '0.7rem', md: '0.75rem' }, // フォントサイズ縮小
                padding: { xs: '2px 6px', sm: '4px 8px' }, // 余白を小さく
                minWidth: { xs: '50px', sm: 'auto' }, // 最小幅を縮小
              },
              '& .MuiSvgIcon-root': {
                fontSize: { xs: '0.8rem', sm: '1rem' }, // アイコンサイズを小さく
              },
              display: 'flex',
              flexWrap: 'wrap', // 折り返しを許可
              justifyContent: 'center', // 中央寄せ
              gap: '4px', // ボタン間の間隔を調整
            }}
          >
            <ToggleButton value="All"><AppsIcon fontSize="inherit" />&nbsp;All</ToggleButton>
            <ToggleButton value="papers"><ArticleIcon fontSize="inherit" />&nbsp;Papers</ToggleButton>
            <ToggleButton value="study"><SchoolIcon fontSize="inherit" />&nbsp;Study</ToggleButton>
            <ToggleButton value="projects"><PhonelinkIcon fontSize="inherit" />&nbsp;Projects</ToggleButton>
            <ToggleButton value="work"><WorkIcon fontSize="inherit" />&nbsp;Work</ToggleButton>
          </ToggleButtonGroup>
        </Box>




      </Box>
      <Paper elevation={0} >
        {renderContent()}
      </Paper>
    </Box>
  );
}