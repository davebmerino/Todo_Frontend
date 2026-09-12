import { useEffect, useState } from "react";

import TaskCard from "./TaskCard.jsx";

function TaskList({ data }) {
  return (
    <section aria-label="Task list" className="space-y-4">
      {/* {!data &&
        [...Array(limit)].map((_entry, index) => (
          <SkeletonCard key={`${index}skel`} />
        ))} */}
      {data && data.map((task) => <TaskCard key={task._id} task={task} />)}
    </section>
  );
}

export default TaskList;
