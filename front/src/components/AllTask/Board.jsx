// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   Checkbox,
//   Typography,
// } from "@mui/material";
// import TaskForm from "./TaskForm";
// import TaskColumn from "./TaskColumn";
// import EditTaskModal from "./EditTask";
// import axios from "axios";
// import { DragDropContext } from "react-beautiful-dnd";
// import TaskCard from "./TaskCard";

// const API_BASE_URL = "http://localhost:7000/api";

// export default function Board() {
//   const [tasks, setTasks] = useState({ todo: [], doing: [], done: [] });
//   const [newTopic, setNewTopic] = useState("");
//   const [newSubtasks, setNewSubtasks] = useState("");
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [taskToEdit, setTaskToEdit] = useState(null);
//   const [newTitle, setNewTitle] = useState("");
//   const [newDescription, setNewDescription] = useState("");
//   const token = localStorage.getItem("token");

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/tasks`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fetchedTasks = response.data;
//       const taskColumns = { todo: [], doing: [], done: [] };

//       fetchedTasks.forEach((task) => {
//         if (task.status === "todo") taskColumns.todo.push(task);
//         else if (task.status === "doing") taskColumns.doing.push(task);
//         else if (task.status === "done") taskColumns.done.push(task);
//       });

//       setTasks(taskColumns);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const addTask = async () => {
//     if (!newTopic || !newSubtasks) return;

//     const subtasksArray = newSubtasks
//       .split(",")
//       .map((task) => ({ content: task.trim(), completed: false }));

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/createtasks`,
//         {
//           title: newTopic,
//           description: JSON.stringify(subtasksArray),
//           status: "todo",
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setTasks((prev) => ({
//         ...prev,
//         todo: [...prev.todo, response.data],
//       }));

//       setNewTopic("");
//       setNewSubtasks("");
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   const openEditModal = (task) => {
//     setTaskToEdit(task);
//     setNewTitle(task.title);
//     setNewDescription(task.description);
//     setEditModalOpen(true);
//   };

//   const deleteTask = async (taskId) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/deletetasks/${taskId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchTasks();
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const handleSubtaskToggle = async (task, subtaskIndex) => {
//     const updatedSubtasks = [...JSON.parse(task.description)];
//     updatedSubtasks[subtaskIndex].completed = !updatedSubtasks[subtaskIndex].completed;

//     const allCompleted = updatedSubtasks.every((subtask) => subtask.completed);

//     if (allCompleted) {
//       await updateTaskStatus(task, "done");
//     }

//     try {
//       await axios.put(
//         `${API_BASE_URL}/updatetasks/${task.id}`,
//         {
//           description: JSON.stringify(updatedSubtasks),
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       fetchTasks();
//     } catch (error) {
//       console.error("Error updating subtask:", error);
//     }
//   };

//   const updateTaskStatus = async (task, status) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/updatetasks/${task .id}`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       fetchTasks();
//     } catch (error) {
//       console.error("Error updating task status:", error);
//     }
//   };

//   const onDragEnd = async (result) => {
//     const { source, destination } = result;

//     if (!destination) return;

//     const sourceList = [...tasks[source.droppableId]];
//     const destinationList = [...tasks[destination.droppableId]];
//     const [movedTask] = sourceList.splice(source.index, 1);

//     if (source.droppableId !== destination.droppableId) {
//       await updateTaskStatus(movedTask, destination.droppableId);
//     }

//     destinationList.splice(destination.index, 0, movedTask);

//     setTasks((prev) => ({
//       ...prev,
//       [source.droppableId]: sourceList,
//       [destination.droppableId]: destinationList,
//     }));
//   };

//   const saveTaskEdit = async () => {
//     if (!newTitle || !newDescription) return;

//     try {
//       const updatedTask = {
//         title: newTitle,
//         description: newDescription,
//       };

//       await axios.put(
//         `${API_BASE_URL}/updatetasks/${taskToEdit.id}`,
//         updatedTask,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       fetchTasks();
//       setEditModalOpen(false);
//       setTaskToEdit(null); // Clear the task to edit
//       setNewTitle(""); // Clear the title
//       setNewDescription(""); // Clear the description
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const renderTask = (task, index) => (
//     <TaskCard
//       key={task.id}
//       task={task}
//       renderSubtasks={renderSubtasks}
//       openEditModal={openEditModal}
//       deleteTask={deleteTask}
//     />
//   );

//   const renderSubtasks = (subtasks, task) =>
//     subtasks.map((subtask, index) => (
//       <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//         <Checkbox
//           checked={subtask.completed}
//           onChange={() => handleSubtaskToggle(task, index)}
//         />
//         <Typography
//           sx={{
//             textDecoration: subtask.completed ? "line-through" : "none",
//           }}
//         >
//           {subtask.content}
//         </Typography>
//       </Box>
//     ));

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <Box sx={{ padding: 4 }}>
//       <TaskForm
//         newTopic={newTopic}
//         setNewTopic={setNewTopic}
//         newSubtasks={newSubtasks}
//         setNewSubtasks={setNewSubtasks}
//         addTask={addTask}
//       />
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Grid container spacing={4}>
//           <TaskColumn columnId="todo" columnTitle="To Do" tasks={tasks.todo} renderTask={renderTask} />
//           <TaskColumn columnId="doing" columnTitle="Doing" tasks={tasks.doing} renderTask={renderTask} />
//           <TaskColumn columnId="done" columnTitle="Done" tasks={tasks.done} renderTask={renderTask} />
//         </Grid>
//       </DragDropContext>
//       <EditTaskModal
//         open={editModalOpen}
//         closeModal={() => setEditModalOpen(false)}
//         task={taskToEdit}
//         setNewTitle={setNewTitle}
//         setNewDescription={setNewDescription}
//         saveTaskEdit={saveTaskEdit}
//         newTitle={newTitle}
//         newDescription={newDescription}
//       />
//     </Box>
//   );
// }

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
  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const movedTask = tasks[source.index];
    const updatedTasks = [...tasks];
    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);
    setTasks(updatedTasks);
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
