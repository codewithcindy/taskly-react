import React, { useContext } from "react";
import { TaskContext } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function ProgressTask({ task }) {
  const {
    handleTaskCompleted,
    handleProgressTaskDelete,
    handleProgressTaskSelected,
  } = useContext(TaskContext);

  return (
    <li className="tasks__item tasks__item-progress">
      <span onClick={() => handleProgressTaskSelected(task)}>{task.text}</span>
      <button
        type="button"
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
        <button type="submit" className="button button__next">
          &gt;
        </button>
      </form>
    </li>
  );
}
