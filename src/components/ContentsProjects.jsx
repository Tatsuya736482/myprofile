import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import posts from "../data/projects.json";

const ContentsProjects = ({ lng = "ja" }) => {
  // tagが"projects"のものだけをフィルタリングし、新しい順にソート
  const projectPosts = Object.entries(posts).sort(
    ([keyA, postA], [keyB, postB]) => {
      // keyから年月を抽出（例：2024-10C -> 2024-10）
      const getDateFromKey = (key) => {
        const match = key.match(/^(\d{4})-(\d{2})/);
        if (match) {
          return new Date(parseInt(match[1]), parseInt(match[2]) - 1);
        }
        return new Date(0); // フォールバック
      };

      const dateA = getDateFromKey(keyA);
      const dateB = getDateFromKey(keyB);

      // 新しい順（降順）
      return dateB - dateA;
    }
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {lng === "ja" ? "開発実績 / Work" : "Work"}
      </Typography>

      <Grid container spacing={3}>
        {projectPosts.map(([key, post]) => {
          const handleCardClick = () => {
            if (post.src) {
              // 外部リンクを新しいタブで開く
              window.open(post.src, "_blank");
            }
          };

          return (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease-in-out",
                  cursor: post.src ? "pointer" : "default",
                  "&:hover": post.src
                    ? {
                        transform: "translateY(-5px)",
                        boxShadow: 3,
                      }
                    : {},
                }}
                onClick={handleCardClick}
              >
                {/* プロジェクト画像 */}
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    post.image
                      ? `${process.env.PUBLIC_URL}/images/timeLineIcons/${post.image}`
                      : "/images/favicon.png"
                  }
                  alt={post.title[lng] || post.title.en}
                  sx={{ objectFit: "contain", backgroundColor: "#f5f5f5" }}
                />

                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  {/* 日付 */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {post.date}
                  </Typography>

                  {/* タイトル */}
                  <Typography variant="h6" component="h3" gutterBottom>
                    {post.title[lng] || post.title.en}
                  </Typography>

                  {/* サブタイトル/技術スタック */}
                  {post.subtitle && post.subtitle[lng] && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {post.subtitle[lng]}
                    </Typography>
                  )}

                  {/* リンク */}
                  <Box
                    sx={{
                      mt: "auto",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                    }}
                  >
                    {post.links &&
                      post.links[lng] &&
                      Object.entries(post.links[lng]).map(
                        ([linkName, url], index) => (
                          <Chip
                            key={index}
                            label={linkName}
                            size="small"
                            variant="outlined"
                            color="primary"
                            clickable
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(url, "_blank");
                            }}
                            sx={{
                              cursor: "pointer",
                              transition:
                                "background-color 0.2s, color 0.2s, border-color 0.2s",
                              "&:hover": {
                                bgcolor: "primary.main",
                                borderColor: "primary.main",
                                // ラベル文字色をコントラスト色に
                                "& .MuiChip-label": {
                                  color: "primary.contrastText",
                                },
                                // もしアイコン付きならアイコン色も
                                textEmphasisColor: "black"
                              },
                            }}
                          />
                        )
                      )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {projectPosts.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          {lng === "ja"
            ? "プロジェクトが見つかりませんでした。"
            : "No projects found."}
        </Typography>
      )}
    </Box>
  );
};

export default ContentsProjects;
