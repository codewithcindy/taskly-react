import React, { useState, useContext } from "react";
import { TaskContext } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function EditProgressTask({ task }) {
  const {
    handleTaskCompleted,
    handleProgressTaskDelete,
    handleProgressTaskUpdate,
    selectedProgressTask,
  } = useContext(TaskContext);

  const [currentTask, setCurrentTask] = useState(selectedProgressTask);

  function handleChange(changes) {
    const updatedTask = { ...selectedProgressTask, ...changes };
    setCurrentTask(updatedTask);
  }

  return (
    <li className="tasks__item tasks__item-progress">
      <form
        className="form__edit"
        onSubmit={(e) => {
          e.preventDefault();
          handleProgressTaskUpdate(task._id, e.target[0].value);
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
        onClick={() => handleProgressTaskDelete(task)}
      >
        <FontAwesomeIcon className="button__delete-icon" icon={faTrashCan} />
      </button>

      <form
        className="form__next"
        onSubmit={(e) => {
          e.preventDefault();
          return handleTaskCompleted(task);
        }}
      >
        <button className="button button__next">&gt;</button>
      </form>
    </li>
  );
}
