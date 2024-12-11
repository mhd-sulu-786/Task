// import React, { useEffect } from "react";
// import { Card, CardContent, Typography, Box, Button } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// const TaskCard = ({ task, renderSubtasks, openEditModal, deleteTask }) => {
//   const token = localStorage.getItem("token");
//   const navigate=useNavigate()
//   // const id= localStorage.getItem("id");
//   useEffect(() => {
//     axios
//       .get("http://localhost:7000/api/tasks", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);

//   const Edit=()=>{
//     navigate(`/edit/${task.id}`)
//     openEditModal(task.id)
//   }

//   return (
//     <Card sx={{ marginBottom: 2 }}>
//       <CardContent>
//         <Typography variant="h6">{task.title}</Typography>
//         {renderSubtasks(JSON.parse(task.description), task)}
//         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <Button
//             onClick={() => Edit} // Pass the entire task object here
//             sx={{ marginRight: 1 }}
//             color="primary"
//           >
//             Edit
//           </Button>
//           <Button onClick={() => deleteTask(task.id)} color="secondary">
//             Delete
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default TaskCard;



// import React from "react";
// import { Card, CardContent, Typography, Box, Button } from "@mui/material";

// const TaskCard = ({ task, renderSubtasks, openEditModal, deleteTask }) => {
//   return (
//     <Card sx={{ marginBottom: 2 }}>
//       <CardContent>
//         <Typography variant="h6">{task.title}</Typography>
//         {renderSubtasks(JSON.parse(task.description), task)}
//         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <Button
//             onClick={() => openEditModal(task)}
//             sx={{ marginRight: 1 }}
//             color="primary"
//           >
//             Edit
//           </Button>
//           <Button onClick={() => deleteTask(task.id)} color="secondary">
//             Delete
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default TaskCard;
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Button, Checkbox } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TaskCard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token=localStorage.getItem('token')
  useEffect(() => {
    axios
      .get('http://localhost:7000/api/tasks',{headers:{Authorization:`Bearer ${token}`}})
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error('Error fetching tasks:', err);
      });
  }, []);

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:7000/api/tasks/${taskId}`)
      .then(() => {
        setData((prevData) => prevData.filter((task) => task.id !== taskId));
      })
      .catch((err) => {
        console.error('Error deleting task:', err);
      });
  };

  const safeJSONParse = (string) => {
    try {
      return JSON.parse(string);
    } catch (e) {
      console.error('Invalid JSON string:', string, e);
      return []; // Return an empty array for invalid JSON
    }
  };

  const handleSubtaskToggle = (task, subtaskIndex) => {
    const updatedTask = { ...task };
    updatedTask.description[subtaskIndex].completed = !updatedTask.description[subtaskIndex].completed;

    axios
      .put(`http://localhost:7000/api/tasks/${task.id}`, updatedTask)
      .then(() => {
        setData((prevData) =>
          prevData.map((t) => (t.id === task.id ? updatedTask : t))
        );
      })
      .catch((err) => {
        console.error('Error updating subtask:', err);
      });
  };

  const renderSubtasks = (subtasks, task) => {
    if (!Array.isArray(subtasks)) return null;
    return subtasks.map((subtask, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Checkbox
          checked={subtask.completed}
          onChange={() => handleSubtaskToggle(task, index)}
        />
        <Typography
          sx={{
            textDecoration: subtask.completed ? 'line-through' : 'none',
          }}
        >
          {subtask.content}
        </Typography>
      </Box>
    ));
  };

  return (
    <div>
      {data.map((task) => (
        <Card key={task.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{task.title}</Typography>
            {renderSubtasks(
              task.description ? safeJSONParse(task.description) : [],
              task
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={() => navigate(`/edit/${task.id}`)}
                sx={{ marginRight: 1 }}
                color="primary"
              >
                Edit
              </Button>
              <Button onClick={() => deleteTask(task.id)} color="secondary">
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default TaskCard;
