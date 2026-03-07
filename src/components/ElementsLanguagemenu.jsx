import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate, useLocation } from 'react-router-dom';

const options = [
  { label: 'English', lng: 'en' },
  { label: 'Japanese', lng: 'ja' },
];

const ITEM_HEIGHT = 48;

export default function LongMenu({ color = 'white' }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lng) => {
    setAnchorEl(null);
    if (lng) {
      // 現在のパスから言語部分を取り除き、新しい言語で再構成する
      // 例: /ja/materials -> /en/materials, /ja -> /en, / -> /en
      const currentPath = location.pathname;
      const stripped = currentPath.replace(/^\/(en|ja)/, '');
      const newPath = `/${lng}${stripped || ''}`;
      if (currentPath !== newPath) {
        navigate(newPath);
        window.location.reload();
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <LanguageIcon style={{color}}/>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ zIndex: 10000 }}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.label} onClick={() => handleClose(option.lng)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}