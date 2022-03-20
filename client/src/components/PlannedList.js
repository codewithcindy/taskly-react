import React, { useContext } from "react";
import { TaskContext } from "./App";
import PlannedTask from "./PlannedTask";
import EditPlannedTask from "./EditPlannedTask";

export default function PlannedLists({ tasks }) {
  const { selectedPlannedTask } = useContext(TaskContext);
  return (
    <div className="tasks tasks__planned">
      <h2 className="tasks__title">Planned</h2>
      <div>
        <ul className="tasks__list">
          {tasks.map((task) => {
            if (selectedPlannedTask === task) {
              return <EditPlannedTask key={task._id} task={task} />;
            } else {
              return <PlannedTask key={task._id} task={task} />;
            }
          })}
        </ul>
      </div>
    </div>
  );
}
