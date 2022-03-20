import React, { useContext } from "react";
import { TaskContext } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function PlannedTask({ task }) {
  const {
    handleTaskProgress,
    handlePlannedTaskDelete,
    handlePlannedTaskSelected,
  } = useContext(TaskContext);

  return (
    <li className="tasks__item tasks__item-planned">
      <span onClick={() => handlePlannedTaskSelected(task)}>{task.text}</span>
      <button
        type="button"
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
        <button type="submit" className="button button__next">
          &gt;
        </button>
      </form>
    </li>
  );
}
