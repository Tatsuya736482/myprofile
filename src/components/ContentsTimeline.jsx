import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import ArticleIcon from '@mui/icons-material/Article';
import TimelineFilter from './TypeTimelineFilter';
import AppsIcon from '@mui/icons-material/Apps';
import { Box, useTheme } from '@mui/material';

export default function SimpleSlide({lng = "en"}) {
  const [selected, setSelected] = React.useState('All');
  const theme = useTheme();

  const isDark = theme.palette.mode === 'dark';

  const handleChange = (event, newSelected) => {
    if (newSelected !== null) {
      setSelected(newSelected);
    }
  };

  const renderContent = () => {
    switch (selected) {
      case 'All':
        return <TimelineFilter filterTag={null} lng={lng}/>
      default:
        return <TimelineFilter filterTag={selected} lng={lng}/>;
    }
  };

  const title = lng === "ja" ? "⏳経歴" : "⏳Personal history";
  const filterInstruction = lng === "ja" 
    ? "・ボタンを選択すると、経歴をフィルタリングできます。"
    : "✔︎Click on the buttons to filter the timeline.";
  const filterBy = lng === "ja" ? "フィルター：" : "Filter by:";


  return (
    <Box
      sx={{
        width: '100%',
        px: 3,
        py: 2,
        borderRadius: 4,
        boxShadow: 3,
        minHeight: '300px',
        overflow: 'hidden',
        position: 'relative',
        background: isDark
          ? 'linear-gradient(to bottom, #2e3b32, #4b2c3f)' // 🌙 ダーク用 (green→pinkの暗色)
          : 'linear-gradient(to bottom, #a8e6cf, #ffb6c1)' // ☀️ ライト用 (green→pinkの明色)
      }}
    >
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
        <h1>{title}</h1>
        
        
        <p>
          {filterInstruction}
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
          <p>{filterBy}</p>
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
            <ToggleButton value="education"><SchoolIcon fontSize="inherit" />&nbsp;Education</ToggleButton>
            <ToggleButton value="papers"><ArticleIcon fontSize="inherit" />&nbsp;Papers</ToggleButton>
            <ToggleButton value="projects"><PhonelinkIcon fontSize="inherit" />&nbsp;Projects</ToggleButton>
            <ToggleButton value="work"><WorkIcon fontSize="inherit" />&nbsp;Work</ToggleButton>
          </ToggleButtonGroup>
        </Box>




      </Box>
        {renderContent()}

    </Box>
  );
}