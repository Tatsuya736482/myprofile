import React from "react";
import TypeTimeline from "./TypeTimeline";
import { Timeline , timelineOppositeContentClasses } from "@mui/lab";
import { Stack,Box } from "@mui/material";
import posts from "../data/posts.json"

export default function TimelineFilter({ filterTag = "study" ,lng = "en"}) {
  const filteredItems = filterTag
    ? Object.entries(posts).filter(([_, item]) => item.tag.includes(filterTag))
    : Object.entries(posts); 

  return (
    <Stack direction={'column'} spacing={'10px'}>
      {filteredItems.map(([key, item]) => (
        <TypeTimeline key={key} {...item} lng={lng} />
      ))}
    </Stack> 
  );
}

