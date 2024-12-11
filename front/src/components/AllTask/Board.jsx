

// import React, { useState, useEffect } from "react";
// import { Grid, Box } from "@mui/material";
// import { DragDropContext } from "react-beautiful-dnd";
// import TaskColumn from "./TaskColumn"; // Your existing column component
// import axios from "axios";
// import TaskCard from "./TaskCard";
// import TaskForm from "./TaskForm";

// const TaskBoard = () => {
//   const [tasks, setTasks] = useState([]);
//   const token = localStorage.getItem("token");

//   // Fetch tasks initially
//   useEffect(() => {
//     axios
//       .get("http://localhost:7000/api/tasks", { headers: { Authorization: `Bearer ${token}` } })
//       .then((res) => setTasks(res.data))
//       .catch((err) => console.error("Error fetching tasks:", err));
//   }, []);

//   // Safely parse the task description
//   const safeJSONParse = (string) => {
//     try {
//       return JSON.parse(string);
//     } catch (e) {
//       console.error("Invalid JSON string:", string, e);
//       return []; // Return an empty array for invalid JSON
//     }
//   };

//   // Sort tasks into columns based on their completion state
//   const sortedTasks = {
//     todo: tasks.filter((task) => {
//       const subtasks = safeJSONParse(task.description);
//       return !subtasks.some((subtask) => subtask.completed);
//     }),
//     inProgress: tasks.filter((task) => {
//       const subtasks = safeJSONParse(task.description);
//       return subtasks.some((subtask) => !subtask.completed);
//     }),
//     done: tasks.filter((task) => {
//       const subtasks = safeJSONParse(task.description);
//       return subtasks.every((subtask) => subtask.completed);
//     }),
//   };

//   // Handle drag end
//   const handleDragEnd = (result) => {
//     const { destination, source } = result;
//     if (!destination) return;

//     const movedTask = tasks[source.index];
//     const updatedTasks = [...tasks];
//     updatedTasks.splice(source.index, 1);
//     updatedTasks.splice(destination.index, 0, movedTask);
//     setTasks(updatedTasks);
//   };

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//           <TaskForm
//         // newTopic={newTopic}
//         // setNewTopic={setNewTopic}
//         // newSubtasks={newSubtasks}
//         // setNewSubtasks={setNewSubtasks}
//         // addTask={addTask}
//       />
//       <Grid container spacing={3}>
//         <TaskColumn
//           columnId="todo"
//           columnTitle="To Do"
//           tasks={sortedTasks.todo}
//           renderTask={(task) => <TaskCard task={task} />}
//         />
//         <TaskColumn
//           columnId="inProgress"
//           columnTitle="In Progress"
//           tasks={sortedTasks.inProgress}
//           renderTask={(task) => <TaskCard task={task} />}
//         />
//         <TaskColumn
//           columnId="done"
//           columnTitle="Done"
//           tasks={sortedTasks.done}
//           renderTask={(task) => <TaskCard task={task} />}
//         />
//       </Grid>
//     </DragDropContext>
//   );
// };

// export default TaskBoard;





import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn"; // Your existing column component
import axios from "axios";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch tasks initially
  useEffect(() => {
    axios
      .get("http://localhost:7000/api/tasks", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Safely parse the task description
  const safeJSONParse = (string) => {
    try {
      return JSON.parse(string);
    } catch (e) {
      console.error("Invalid JSON string:", string, e);
      return []; // Return an empty array for invalid JSON
    }
  };

  // Sort tasks into columns based on their completion state
  const sortedTasks = {
    todo: tasks.filter((task) => {
      const subtasks = safeJSONParse(task.description);
      return !subtasks.some((subtask) => subtask.completed);
    }),
    inProgress: tasks.filter((task) => {
      const subtasks = safeJSONParse(task.description);
      return subtasks.some((subtask) => !subtask.completed);
    }),
    done: tasks.filter((task) => {
      const subtasks = safeJSONParse(task.description);
      return subtasks.every((subtask) => subtask.completed);
    }),
  };

  // Handle drag end
  const handleDragEnd = async (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const movedTask = tasks[source.index];
    const updatedTasks = [...tasks];
    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);
    setTasks(updatedTasks);

    // Determine the new status based on the destination column
    let newStatus;
    if (destination.droppableId === "todo") {
        newStatus = "todo";
    } else if (destination.droppableId === "inProgress") {
        newStatus = "inProgress";
    } else if (destination.droppableId === "done") {
        newStatus = "done";
        
        // Call the new API to move the task to done
        try {
            await axios.put(`http://localhost:7000/api/tasks/${movedTask.id}/moveToDone`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error("Error moving task to done:", error);
        }
    }

    // Update the task status in the backend for other columns
    if (newStatus && newStatus !== "done") {
        try {
            await axios.put(`http://localhost:7000/api/updatetasks/${movedTask.id}`, {
                title: movedTask.title,
                description: movedTask.description,
                status: newStatus,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    }
};

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
          <TaskForm
        // newTopic={newTopic}
        // setNewTopic={setNewTopic}
        // newSubtasks={newSubtasks}
        // setNewSubtasks={setNewSubtasks}
        // addTask={addTask}
      />
      <Grid container spacing={3}>
        <TaskColumn
          columnId="todo"
          columnTitle="To Do"
          tasks={sortedTasks.todo}
          renderTask={(task) => <TaskCard task={task} />}
        />
        <TaskColumn
          columnId="inProgress"
          columnTitle="In Progress"
          tasks={sortedTasks.inProgress}
          renderTask={(task) => <TaskCard task={task} />}
        />
        <TaskColumn
          columnId="done"
          columnTitle="Done"
          tasks={sortedTasks.done}
          renderTask={(task) => <TaskCard task={task} />}
        />
      </Grid>
    </DragDropContext>
  );
};

export default TaskBoard;
