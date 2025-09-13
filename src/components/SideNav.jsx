import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";

export default function SideToc({ items, headerOffset = 72 }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeId, setActiveId] = useState(items?.[0]?.id);
  const [showSidebar, setShowSidebar] = useState(false);

  const ids = useMemo(() => {
    const flat = [];
    const walk = (arr) =>
      arr?.forEach(({ id, children }) => {
        flat.push(id);
        if (children) walk(children);
      });
    walk(items || []);
    return flat;
  }, [items]);

  // IntersectionObserverでセクション検知
  useEffect(() => {
    const target = document.getElementById("introduction"); // SelfIntroductionセクション
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSidebar(!entry.isIntersecting); // セクション見えなくなったら表示
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // アクティブ見出し検出
  useEffect(() => {
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: `-${headerOffset + 8}px 0px -60% 0px`, threshold: [0, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, headerOffset]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (isMobile) return null;

  return (
    <AnimatePresence>
      {showSidebar && (
        <motion.div
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          style={{ position: "fixed", top: 88, right: 16, zIndex: 1200 }}
        >
          <Box
            aria-label="Table of contents"
            sx={{
              width: 280,
              maxHeight: `calc(100vh - ${88}px)`,
              overflow: "auto",
              px: 2,
              py: 2,
              borderRadius: 2,
              bgcolor: "background.paper",
              boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
              border: "1px solid",
              borderColor: "divider",
              "&::before": {
                content: '""',
                position: "absolute",
                right: 28,
                top: 12,
                bottom: 12,
                width: 2,
                bgcolor: "action.hover",
                borderRadius: 1,
              },
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              目次
            </Typography>

            <Box component="nav" sx={{ display: "grid", gap: 1 }}>
              <TocList
                items={items}
                activeId={activeId}
                onClick={handleClick}
                depth={0}
              />
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TocList({ items, activeId, onClick, depth }) {
  return items?.map((item, idx) => (
    <TocItem
      key={item.id || idx}
      item={item}
      active={activeId === item.id}
      onClick={onClick}
      depth={depth}
    />
  ));
}

function TocItem({ item, active, onClick, depth }) {
  const dotSize = active ? 10 : 8;

  return (
    <Box sx={{ mr: depth === 0 ? 0 : 4 }}>
      <Box
        sx={{
          position: "relative",
          pr: 6,
          py: 0.5,
          textAlign: "right",
        }}
      >
        {/* ドット */}
        <Box
          sx={{
            position: "absolute",
            right: 22,
            top: "50%",
            transform: "translate(50%, -50%)",
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            bgcolor: active ? "primary.main" : "action.hover",
            border: active ? "2px solid" : "1px solid",
            borderColor: active ? "primary.main" : "divider",
            boxShadow: active ? "0 0 0 4px rgba(25,118,210,0.15)" : "none",
          }}
        />
        <Link
          href={`#${item.id}`}
          onClick={(e) => onClick(e, item.id)}
          underline="hover"
          color="text.primary"
          sx={{
            fontWeight: active ? 700 : 500,
            lineHeight: 1.6,
            display: "inline-block",
            "&:hover": { opacity: 0.9 },
          }}
        >
          {item.label}
        </Link>
      </Box>

      {item.children?.length ? (
        <TocList
          items={item.children}
          activeId={active ? item.id : undefined}
          onClick={onClick}
          depth={depth + 1}
        />
      ) : null}
    </Box>
  );
}
