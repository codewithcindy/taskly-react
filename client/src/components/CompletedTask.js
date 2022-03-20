import React, { useContext } from "react";
import { TaskContext } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function CompletedTask({ task }) {
  const { handleCompletedTaskDelete } = useContext(TaskContext);
  return (
    <li className="tasks__item tasks__item-completed">
      {task.text}
      <button
        type="button"
        className="button__delete"
        onClick={() => handleCompletedTaskDelete(task)}
      >
        <FontAwesomeIcon className="button__delete-icon" icon={faTrashCan} />
      </button>
    </li>
  );
}
