import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const BackgroundBox = styled(Box)(({ backgroundImage }) => ({
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // オーバーレイを追加して暗くする
    },
    '& > *': {
      position: 'relative',
      zIndex: 1,
    },
}));

export default function TypeBackgroundBox({ children, backgroundImage }) {
    return (
        <BackgroundBox backgroundImage={backgroundImage}>
            {children}
        </BackgroundBox>
    );
}



