import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';

const BackgroundBox = styled(Box)(({ backgroundImage, overlayOpacity }) => ({
    position: 'relative',
    width: '100%',  
    minHeight: '100%',
    margin: '0 auto', // 中央寄せ
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',  // 中央寄せを確実にする
    justifyContent: 'center', // 水平方向の中央寄せ
    alignItems: 'center',     // 垂直方向の中央寄せ
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`, // オーバーレイを追加して暗くする
    },
    '& > *': {
      position: 'relative',
      zIndex: 1,
    },
}));

export default function TypeBackgroundBox({ children, backgroundImage }) {
    const theme = useTheme();
    const overlayOpacity = theme.palette.mode === 'dark' ? 0.6 : 0.4;

    return (
        <BackgroundBox backgroundImage={backgroundImage} overlayOpacity={overlayOpacity}>
            {children}
        </BackgroundBox>
    );
}