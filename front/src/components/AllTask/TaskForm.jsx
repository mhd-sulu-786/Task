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
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const navigate=useNavigate()
const token=localStorage.getItem('token')
  const addTask=(e)=>{
axios.post('http://localhost:7000/api/createtasks', {title,description},
{headers:{Authorization:`Bearer ${token}`}}
)
.then((res)=>{
  console.log(res);
  alert("cretaed")
  navigate('/view')
  
}
).catch(err=>console.log(err))
  }
  return (
    <Box sx={{ marginBottom: 4, display: "flex", gap: 2 }}>
      <TextField
        label="New Topic"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label="Subtasks (comma-separated)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      <Button onClick={addTask} variant="contained" sx={{ alignSelf: "center" }}>
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;