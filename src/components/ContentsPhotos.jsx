import React from "react";
import photos from "../data/photos.json";
/**
 * 使い方
 * 1) public/images/travel/ に写真を置く
 * 2) src/data/travelPhotos.json を用意（下の例）
 * 3) <TravelGallery lng="ja" /> をページに配置
 */

const styles = {
  section: { padding: 24 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 16px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 16,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 6px 20px rgba(0,0,0,.12)",
    background: "#fff",
    cursor: "pointer",
    transform: "translateY(0)",
    transition: "transform .25s ease, box-shadow .25s ease",
  },
  mediaWrap: {
    position: "relative",
    aspectRatio: "4/3",
    overflow: "hidden",
    background: "#f3f4f6",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: "scale(1)",
    transition: "transform .5s ease",
    display: "block",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,.25), rgba(0,0,0,0) 35%, rgba(0,0,0,0) 60%, rgba(0,0,0,.35))",
  },
  mediaText: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    color: "#fff",
    textShadow: "0 2px 6px rgba(0,0,0,.4)",
    display: "grid",
    gap: 4,
    fontSize: 12,
  },
  body: { padding: "12px 14px 14px" },
  h3: { fontSize: 18, margin: "6px 0" },
  caption: { color: "#666", fontSize: 14, lineHeight: 1.5 },
  chips: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 },
  chip: {
    fontSize: 12,
    padding: "4px 8px",
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    background: "#fff",
  },
  linkChip: {
    fontSize: 12,
    padding: "4px 8px",
    borderRadius: 999,
    border: "1px solid #3b82f6",
    color: "#3b82f6",
    background: "transparent",
  },
  footer: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 },
  empty: { textAlign: "center", color: "#666", marginTop: 24 },
  // Lightbox
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.7)",
    display: "grid",
    placeItems: "center",
    zIndex: 40,
    padding: 16,
  },
  dialog: {
    width: "min(1100px, 100%)",
    maxHeight: "92vh",
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  dialogHeader: { display: "flex", justifyContent: "flex-end", padding: 8 },
  dialogImgWrap: { background: "#000" },
  dialogImg: { width: "100%", height: "auto", display: "block" },
  dialogBody: { padding: 16 },
  metaRow: { display: "flex", gap: 12, flexWrap: "wrap", margin: "6px 0 8px" },
  hint: { color: "#666", fontSize: 12, marginTop: 4 },
};

const TravelGallery = ({ lng = "ja" }) => {
  const [hoverKey, setHoverKey] = React.useState(null);
  const [lightbox, setLightbox] = React.useState({ open: false, index: 0 });

  // YYYY-MM[-DD] をキーから推定して新しい順に
  const getDateFromKey = (key) => {
    const m = key.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    const m2 = key.match(/^(\d{4})-(\d{2})/);
    if (m2) return new Date(+m2[1], +m2[2] - 1, 1);
    return new Date(0);
  };

  const entries = React.useMemo(
    () => Object.entries(photos).sort(([a], [b]) => getDateFromKey(b) - getDateFromKey(a)),
    []
  );

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return lng === "ja"
      ? `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
      : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  const openAt = (i) => setLightbox({ open: true, index: i });
  const close = () => setLightbox((s) => ({ ...s, open: false }));
  const next = () => setLightbox((s) => ({ ...s, index: (s.index + 1) % entries.length }));

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>{lng === "ja" ? "旅の写真 / Travel" : "Travel"}</h2>

      <div style={styles.grid}>
        {entries.map(([key, item], idx) => {
          const title = item.title?.[lng] || item.title?.en || "";
          const location = item.location?.[lng] || item.location?.en || "";
          const caption = item.caption?.[lng] || item.caption?.en || "";
          const src = item.image
            ? `${process.env.PUBLIC_URL || ""}/images/travel/${item.image}`
            : "/images/favicon.png";
          const hover = hoverKey === key;

          return (
            <article
              key={key}
              style={{
                ...styles.card,
                transform: hover ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hover ? "0 14px 30px rgba(0,0,0,.18)" : styles.card.boxShadow,
              }}
              onMouseEnter={() => setHoverKey(key)}
              onMouseLeave={() => setHoverKey(null)}
              onClick={() => openAt(idx)}
            >
              <div style={styles.mediaWrap}>
                <img
                  src={src}
                  alt={title || location || item.image}
                  loading="lazy"
                  style={{ ...styles.img, transform: hover ? "scale(1.05)" : "scale(1)" }}
                />
                <div style={styles.overlay} />
                <div style={styles.mediaText}>
                  {location && <div>📍 {location}</div>}
                  {item.date && <div>📅 {formatDate(item.date)}</div>}
                </div>
              </div>

              <div style={styles.body}>
                {(title || caption) && <h3 style={styles.h3}>{title || location}</h3>}
                {caption && <p style={styles.caption}>{caption}</p>}

                {Array.isArray(item.tags) && item.tags.length > 0 && (
                  <div style={styles.chips}>
                    {item.tags.map((t, i) => (
                      <span key={i} style={styles.chip}>
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div style={styles.footer}>
                  {item.links &&
                    item.links[lng] &&
                    Object.entries(item.links[lng]).map(([label, url], i) => (
                      <button
                        key={i}
                        style={styles.linkChip}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(url, "_blank");
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        🔗 {label}
                      </button>
                    ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {entries.length === 0 && (
        <p style={styles.empty}>{lng === "ja" ? "写真がまだありません。" : "No photos yet."}</p>
      )}

      {/* ライトボックス */}
      {lightbox.open && (
        <div style={styles.backdrop} onClick={close}>
          <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <div style={styles.dialogHeader}>
              <button onClick={close} aria-label="close" style={{ fontSize: 14, padding: "6px 10px" }}>
                ✕
              </button>
            </div>
            {entries[lightbox.index] && (() => {
              const [, item] = entries[lightbox.index];
              const src = item.image
                ? `${process.env.PUBLIC_URL || ""}/images/travel/${item.image}`
                : "/images/favicon.png";
              const title = item.title?.[lng] || item.title?.en || "";
              const location = item.location?.[lng] || item.location?.en || "";
              const caption = item.caption?.[lng] || item.caption?.en || "";
              return (
                <>
                  <div style={styles.dialogImgWrap} onClick={next}>
                    <img src={src} alt={title || location || item.image} style={styles.dialogImg} loading="lazy" />
                  </div>
                  <div style={styles.dialogBody}>
                    {(title || location) && <h3 style={{ ...styles.h3, marginTop: 0 }}>{title || location}</h3>}
                    <div style={styles.metaRow}>
                      {location && <span>📍 {location}</span>}
                      {item.date && <span>📅 {formatDate(item.date)}</span>}
                    </div>
                    {caption && <p style={styles.caption}>{caption}</p>}
                    {item.links && item.links[lng] && (
                      <div style={styles.footer}>
                        {Object.entries(item.links[lng]).map(([label, url], i) => (
                          <button
                            key={i}
                            style={styles.linkChip}
                            onClick={() => window.open(url, "_blank")}
                          >
                            🔗 {label}
                          </button>
                        ))}
                      </div>
                    )}
                    <div style={styles.hint}>{lng === "ja" ? "クリックで次の写真、Escで閉じる" : "Click to next, Esc to close"}</div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
};

export default TravelGallery;
