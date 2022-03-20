import React from "react";
import CompletedTask from "./CompletedTask";

export default function CompletedList({ completedTasks }) {
  return (
    <div className="tasks tasks__completed">
      <h2 className="tasks__title">Completed</h2>
      <div>
        <ul className="tasks__list">
          {completedTasks.map((task) => {
            return <CompletedTask key={task._id} task={task} />;
          })}
        </ul>
      </div>
    </div>
  );
}
