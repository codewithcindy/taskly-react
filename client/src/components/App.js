import React, { useEffect, useState } from "react";
import PlannedList from "./PlannedList";
import ProgressList from "./ProgressList";
import CompletedList from "./CompletedList";
import NewTask from "./NewTask";
import "../css/app.css";

export const TaskContext = React.createContext();

function App() {
  // API
  const [state, setState] = useState([]);

  // Planned Tasks
  const [plannedTasks, setPlannedTasks] = useState([]);

  // Progress Tasks
  const [progressTasks, setProgressTasks] = useState([]);

  // Completed Tasks
  const [completedTasks, setCompletedTasks] = useState([]);

  // Clear All Tasks
  const [clearTasks, setClearTasks] = useState(false);

  // Selected Planned Task
  const [selectedPlannedTaskId, setSelectedPlannedTaskId] = useState([]);
  const selectedPlannedTask = plannedTasks.find((task) => {
    return task._id === selectedPlannedTaskId;
  });

  // Selected Progress} Task
  const [selectedProgressTaskId, setSelectedProgressTaskId] = useState([]);
  const selectedProgressTask = progressTasks.find((task) => {
    return task._id === selectedProgressTaskId;
  });

  const TaskContextValue = {
    handleTaskAdd,
    handleTaskProgress,
    handleTaskCompleted,
    handlePlannedTaskSelected,
    handlePlannedTaskUpdate,
    handlePlannedTaskDelete,
    handleProgressTaskSelected,
    handleProgressTaskUpdate,
    handleProgressTaskDelete,
    handleCompletedTaskDelete,
    selectedPlannedTask,
    selectedProgressTask,
  };

  // Connect to API
  useEffect(() => {
    callAPI();
  }, []);

  // Load all tasks
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Retrieve array of tasks
    async function getTasks() {
      fetch("/plannedTasks/index", signal)
        .then((res) => res.json())
        .then((data) => {
          setPlannedTasks([...data]);
        })
        .catch((e) => e);

      fetch("/progressTasks/index", signal)
        .then((res) => res.json())
        .then((data) => {
          setProgressTasks([...data]);
        })
        .catch((e) => e);

      fetch("/completedTasks/index", signal)
        .then((res) => res.json())
        .then((data) => {
          setCompletedTasks([...data]);
        })
        .catch((e) => e);
    }

    getTasks();

    return () => {
      setPlannedTasks([]);
      controller.abort();
    };
  }, [clearTasks]);

  // Connect to API
  async function callAPI() {
    fetch("/")
      .then((res) => console.log(res.text))
      .then((res) => {
        console.log("Successfully connected to API");
        setState({ apiResponse: "react connected to api" });
      })
      .catch((e) => console.log(e));
  }

  // Handle Planned task selection
  async function handlePlannedTaskSelected(task) {
    // Deselect any task from In Progress section
    setSelectedProgressTaskId([]);

    // Set selectedPlannedTask to be the task selected
    setSelectedPlannedTaskId(task._id);
  }

  // Handle Progress task selection
  async function handleProgressTaskSelected(task) {
    // Deselect any task from Planned section
    setSelectedPlannedTaskId([]);

    // Set selectedProgressTask to be the task selected
    setSelectedProgressTaskId(task._id);
  }

  // Add new Planned Task
  async function handleTaskAdd(task) {
    const newPlannedTask = {
      text: task,
    };

    // Save to DB
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlannedTask),
    };

    fetch("/plannedTasks/add", opts)
      .then((response) => response.json())
      .then((data) => {
        setPlannedTasks([...plannedTasks, data]);
        return data;
      })
      .catch((e) => console.log(e));

    // const data = await fetch("/plannedTasks/add", opts);

    // setPlannedTasks([...plannedTasks, data]);
  }

  // Add new Progress Task
  async function handleTaskProgress(task, section) {
    const newProgressTask = {
      text: task.text,
      section: section,
    };

    // Save to ProgressTasks DB
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProgressTask),
    };

    // Add new Progress task to progressTask sDB
    fetch("/progressTasks/add", opts)
      .then((response) => response.json())
      .then((data) => {
        setProgressTasks([...progressTasks, data]);
        return data;
      })
      .catch((e) => console.log(e));

    // Remove task from PlannedTasks DB
    fetch(`/plannedTasks/${task._id}`, {
      method: "DELETE",
    });

    // Remove task from planned
    const updatedPlannedTasks = plannedTasks.filter((plannedTask) => {
      return plannedTask._id !== task._id;
    });

    setPlannedTasks(updatedPlannedTasks);
  }

  async function handleTaskCompleted(task) {
    const newCompletedTask = {
      text: task.text,
    };

    const updatedProgressTasks = progressTasks.filter((progressTask) => {
      return progressTask._id !== task._id;
    });

    setProgressTasks(updatedProgressTasks);

    // Save to DB
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCompletedTask),
    };

    // Add task to completedTasks DB
    fetch("/completedTasks/add", opts)
      .then((response) => response.json())
      .then((data) => {
        setCompletedTasks([...completedTasks, data]);
        return data;
      })
      .catch((e) => console.log(e));

    // Remove task from progressTasks DB
    fetch(`/progressTasks/${task._id}`, {
      method: "DELETE",
    });
  }

  async function handlePlannedTaskUpdate(id, text) {
    console.log(text);
    const updateTask = {
      text,
    };

    const opts = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTask),
    };

    // Remove selected task
    setSelectedPlannedTaskId([]);

    await fetch(`plannedTasks/${id}`, opts);

    fetch("/plannedTasks/index", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPlannedTasks([...data]);
      })
      .catch((e) => e);
  }

  async function handleProgressTaskUpdate(id, text) {
    const updateTask = {
      text,
    };

    const opts = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTask),
    };

    // Remove selected task
    setSelectedProgressTaskId([]);

    await fetch(`/progressTasks/${id}`, opts);

    fetch("/progressTasks/index", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setProgressTasks([...data]);
      })
      .catch((e) => e);
  }

  // Delete planned task
  async function handlePlannedTaskDelete(task) {
    const updatedPlannedTasks = plannedTasks.filter((plannedTask) => {
      return plannedTask._id !== task._id;
    });

    setPlannedTasks([...updatedPlannedTasks]);

    await fetch(`/plannedTasks/${task._id}`, {
      method: "DELETE",
    });
  }

  // Delete progress task
  async function handleProgressTaskDelete(task) {
    const updatedProgressTasks = progressTasks.filter((progressTask) => {
      return progressTask._id !== task._id;
    });

    setProgressTasks([...updatedProgressTasks]);

    await fetch(`/progressTasks/${task._id}`, {
      method: "DELETE",
    });
  }

  // Delete progress task
  async function handleCompletedTaskDelete(task) {
    const updatedCompletedTasks = completedTasks.filter((completedTask) => {
      return completedTask._id !== task._id;
    });

    setCompletedTasks([...updatedCompletedTasks]);

    await fetch(`/completedTasks/${task._id}`, {
      method: "DELETE",
    });
  }

  async function handleClearAll() {
    fetch(`/tasks`, { method: "DELETE" })
      .then((res) => res.text())
      .then((data) => {
        return setClearTasks(true);
      })
      .catch((e) => console.log(e));
  }

  return (
    <TaskContext.Provider value={TaskContextValue}>
      {/* <p>hi {state.apiResponse}</p> */}
      <div className="container">
        <h1 className="title">Taskly</h1>
        <div className="description">
          <p>Click arrow to move task to next column.</p>
          <p>Click task to edit text.</p>
        </div>
        <div className="tasks__container">
          <PlannedList tasks={plannedTasks} />
          <ProgressList progressTasks={progressTasks} />
          <CompletedList completedTasks={completedTasks} />
        </div>
        <NewTask />
        <button
          className="button__clear"
          onClick={() => {
            handleClearAll();
          }}
        >
          Clear All
        </button>
      </div>
    </TaskContext.Provider>
  );
}

export default App;
