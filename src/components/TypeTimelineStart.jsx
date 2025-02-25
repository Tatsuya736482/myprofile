import { useState } from 'react';
import { TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineConnector, TimelineContent } from '@mui/lab';
import { IconButton, Typography, Popover } from '@mui/material';

export default function TypeTimelineStart({ date, icon, title, subtitle,  detail ,lng="en"}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'timeline-start-popover' : undefined;

  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ m: 'auto 0', textAlign: 'center', fontSize: { xs: '0.5rem', sm: '0.75rem', md: '1rem' }}} variant="body2" color="text.secondary">
        {date}
      </TimelineOppositeContent>
      <TimelineSeparator>
        {detail ?
        <IconButton color="primary" aria-label={title[lng]} onClick={handleClick}>
        {icon}
        </IconButton>
        :
        <IconButton color="primary" aria-label={title[lng]}>
          {icon}
        </IconButton>
        }
        
        
        <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '12px', px: 2 }}>
        {detail ? 
        <Typography 
          variant="h6" 
          component="span" 
          sx={{ fontSize: { xs: '0.75rem', sm: '1rem', md: '1.25rem' }, cursor: 'pointer' }}
          onClick={handleClick}
        >
          <u>{title[lng]}</u>
        </Typography>
        :
        <Typography 
          variant="h6" 
          component="span" 
          sx={{ fontSize: { xs: '0.75rem', sm: '1rem', md: '1.25rem' }, cursor: 'pointer' }}
        >
          {title[lng]}
        </Typography>
        }

        {subtitle[lng] && <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.5rem', sm: '0.75rem', md: '1rem' }, cursor: 'pointer' }} >{subtitle[lng]}</Typography>}
      </TimelineContent>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>{detail}</Typography>
      </Popover>
    </TimelineItem>
  );
}
