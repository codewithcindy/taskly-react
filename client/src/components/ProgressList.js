import React, { useContext } from "react";
import { TaskContext } from "./App";
import ProgressTask from "./ProgressTask";
import EditProgressTask from "./EditProgressTask";

export default function ProgressList({ progressTasks }) {
  const { selectedProgressTask } = useContext(TaskContext);

  return (
    <div className="tasks tasks__progress">
      <h2 className="tasks__title">In Progress</h2>
      <div>
        <ul className="tasks__list">
          {progressTasks.map((task) => {
            if (selectedProgressTask === task) {
              console.log(task);
              return <EditProgressTask key={task._id} task={task} />;
            } else {
              return <ProgressTask key={task._id} task={task} />;
            }
          })}
        </ul>
      </div>
    </div>
  );
}
