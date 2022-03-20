import React, { useState, useContext } from "react";
import { TaskContext } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function EditPlannedTask({ task }) {
  const {
    handleTaskProgress,
    handlePlannedTaskDelete,
    handlePlannedTaskUpdate,
    selectedPlannedTask,
  } = useContext(TaskContext);

  const [currentTask, setCurrentTask] = useState(selectedPlannedTask);

  function handleChange(changes) {
    const updatedTask = { ...selectedPlannedTask, ...changes };
    setCurrentTask(updatedTask);
  }

  return (
    <li className="tasks__item tasks__item-planned">
      <form
        className="form__edit"
        onSubmit={(e) => {
          e.preventDefault();
          handlePlannedTaskUpdate(task._id, e.target[0].value);
          console.log("submit");
        }}
      >
        <label htmlFor="task"></label>
        <input
          type="text"
          id="task"
          value={currentTask.text}
          onChange={(e) => {
            handleChange({ text: e.target.value });
            console.log("changing");
          }}
        />
        <button className="button__submit-change">
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </form>
      <button
        className="button__delete"
        onClick={() => handlePlannedTaskDelete(task)}
      >
        <FontAwesomeIcon className="button__delete-icon" icon={faTrashCan} />
      </button>

      <form
        className="form__next"
        onSubmit={(e) => {
          e.preventDefault();
          return handleTaskProgress(task);
        }}
      >
        <button className="button button__next">&gt;</button>
      </form>
    </li>
  );
}
