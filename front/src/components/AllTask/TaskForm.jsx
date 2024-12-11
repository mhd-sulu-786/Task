// import React from "react";
// import { TextField, Button, Box } from "@mui/material";

// const TaskForm = ({ newTopic, setNewTopic, newSubtasks, setNewSubtasks, addTask }) => {
//   return (
//     <Box sx={{ marginBottom: 4, display: "flex", gap: 2 }}>
//       <TextField
//         label="New Topic"
//         value={newTopic}
//         onChange={(e) => setNewTopic(e.target.value)}
//         fullWidth
//       />
//       <TextField
//         label="Subtasks (comma-separated)"
//         value={newSubtasks}
//         onChange={(e) => setNewSubtasks(e.target.value)}
//         fullWidth
//       />
//       <Button onClick={addTask} variant="contained" sx={{ alignSelf: "center" }}>
//         Add Task
//       </Button>
//     </Box>
//   );
// };

// export default TaskForm;

import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const addTask = (e) => {
    e.preventDefault();

    // Convert comma-separated subtasks into an array of objects
    const subtasks = description.split(",").map((subtask) => ({
      content: subtask.trim(), // Trim whitespace
      completed: false, // Default completion state
    }));

    axios
      .post(
        "http://localhost:7000/api/createtasks",
        { title, description: JSON.stringify(subtasks) }, // Send as JSON string
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res);
        alert("Task created successfully!");
        navigate("/board");
        window.location.reload()
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box
      component="form"
      sx={{ marginBottom: 4, display: "flex", gap: 2 }}
      onSubmit={addTask} // Form submission handling
    >
      <TextField
        label="New Topic"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Subtasks (comma-separated)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" sx={{ alignSelf: "center" }}>
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
