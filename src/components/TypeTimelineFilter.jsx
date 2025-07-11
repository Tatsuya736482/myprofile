import React from "react";
import TypeTimeline from "./TypeTimeline";
import { Timeline , timelineOppositeContentClasses } from "@mui/lab";
import { Stack,Box } from "@mui/material";
import posts from "../data/posts.json"

export default function TimelineFilter({ filterTag = "study", lng = "en" }) {
  const filteredItems = filterTag
    ? Object.entries(posts).filter(([_, item]) => item.tag.includes(filterTag))
    : Object.entries(posts);

  // key: '2022-04A' の形式を解析して、年月＋英字で降順ソート
  const sortedItems = filteredItems.sort(([keyA], [keyB]) => {
    const [dateA, suffixA] = keyA.split(/(?=[A-Z])/) // '2022-04', 'A'
    const [dateB, suffixB] = keyB.split(/(?=[A-Z])/)

    if (dateA === dateB) {
      // アルファベットを降順（B > A）
      return suffixB.localeCompare(suffixA)
    }
    // 日付を降順（新しい順）
    return dateB.localeCompare(dateA)
  });

  return (
    <Stack direction={'column'} spacing={'10px'}>
      {sortedItems.map(([key, item]) => (
        <TypeTimeline key={key} {...item} lng={lng} />
      ))}
    </Stack>
  );
}
