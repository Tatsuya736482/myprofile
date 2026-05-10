import React, { useEffect, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { SiQiita, SiZenn } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { motion, useAnimation } from "framer-motion";

const MotionIconButton = motion(IconButton);

const ICONS = [
  { key: "x",        href: "https://x.com/tatsuya_ich",                     label: "x",        El: FaXTwitter,  isMui: false },
  { key: "github",   href: "https://github.com/Tatsuya736482",               label: "github",   El: GitHubIcon,  isMui: true  },
  { key: "linkedin", href: "https://www.linkedin.com/in/tatsuya-ich",        label: "linkedin", El: LinkedInIcon,isMui: true  },
  { key: "qiita",    href: "https://qiita.com/A12",                          label: "qiita",    El: SiQiita,     isMui: false },
  { key: "zenn",     href: "https://zenn.dev/yay1",                          label: "zenn",     El: SiZenn,      isMui: false },
];

function buildAnimation(amp) {
  return {
    rotate: [0, -amp, amp, -(amp * 0.65), amp * 0.65, -(amp * 0.3), amp * 0.3, 0],
    transition: {
      duration: Math.max(0.35, 0.65 - amp * 0.005),
      ease: "easeInOut",
    },
  };
}

export default function CustomPageToolbar({ color = 'white' }) {
  const c0 = useAnimation();
  const c1 = useAnimation();
  const c2 = useAnimation();
  const c3 = useAnimation();
  const c4 = useAnimation();
  const controls = [c0, c1, c2, c3, c4];
  const isAnimating = useRef(false);
  const lastScrollY = useRef(window.scrollY);
  const lastScrollT = useRef(performance.now());

  useEffect(() => {
    const handleScroll = async () => {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastScrollY.current);
      const dt = now - lastScrollT.current;
      lastScrollY.current = window.scrollY;
      lastScrollT.current = now;

      if (isAnimating.current) return;
      isAnimating.current = true;

      // px/ms → 0〜3 あたりを想定、振れ幅 8〜38 deg に写像
      const velocity = dt > 0 ? dy / dt : 0;
      const amp = Math.min(38, 8 + velocity * 22);
      const stagger = Math.max(40, 110 - velocity * 40); // ms

      const animation = buildAnimation(amp);

      // アイコンを順番に揺らす
      for (let i = 0; i < controls.length; i++) {
        setTimeout(() => controls[i].start(animation), i * stagger);
      }

      // 最後のアイコンが終わるまで待ってからフラグを解除
      const totalDuration = (controls.length - 1) * stagger + (animation.transition.duration * 1000) + 100;
      setTimeout(() => {
        isAnimating.current = false;
      }, totalDuration);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {ICONS.map(({ key, href, label, El, isMui }, i) => (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer">
          <MotionIconButton
            animate={controls[i]}
            aria-label={label}
            size="medium"
            onMouseEnter={() => controls[i].start(buildAnimation(15))}
          >
            {isMui
              ? <El fontSize="inherit" style={{ color }} />
              : <El style={{ color }} />
            }
          </MotionIconButton>
        </a>
      ))}
    </Stack>
  );
}
