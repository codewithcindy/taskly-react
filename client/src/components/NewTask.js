import React, { useState, useContext } from "react";
import { TaskContext } from "./App";

export default function NewTask() {
  const { handleTaskAdd } = useContext(TaskContext);

  const [inputValue, setInputValue] = useState();

  function handleTaskSubmit(value) {
    handleTaskAdd(value);
    setInputValue("");
  }

  function handleChange(value) {
    setInputValue(value);
  }

  return (
    <div className="tasks__form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return handleTaskSubmit(e.target.task.value);
          // return handleTaskAdd(e.target.task.value, "planned");
        }}
      >
        <label htmlFor="task"></label>
        <input
          className="task__input"
          type="text"
          name="task"
          id="task"
          value={inputValue}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        ></input>
        <button className="button button__new">+</button>
      </form>
    </div>
  );
}
