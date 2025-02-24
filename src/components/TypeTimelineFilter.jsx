import React from "react";
import TypeTimeline from "./TypeTimeline";
import TypeTimelineStart from "./TypeTimelineStart";
import { timelineItems } from "./PostsTimelineItems";
import { Timeline , timelineOppositeContentClasses } from "@mui/lab";

export default function TimelineFilter({ filterTag = "study" }) {
  const filteredItems = filterTag
    ? Object.entries(timelineItems).filter(([_, item]) => item.tag.includes(filterTag))
    : Object.entries(timelineItems); 

  return (
    <Timeline sx={{ [`& .${timelineOppositeContentClasses.root}`]: { flex: 0.2 } }}>
      {filteredItems.map(([key, item], index) => {
        const Component = index === 0 ? TypeTimelineStart : TypeTimeline;
        return <Component key={key} {...item} />;
      })}
    </Timeline>
  );
}

