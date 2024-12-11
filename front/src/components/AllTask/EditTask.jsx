// import React, { useEffect, useState } from "react";
// import { Modal, Box, Typography, TextField, Button, TextareaAutosize } from "@mui/material";
// import axios from 'axios';
// import { useParams } from "react-router-dom";

// const EditTaskModal = ({ open, closeModal, saveTaskEdit, taskToEdit }) => {
//   const [newTitle, setNewTitle] = useState('');
//   const [newDescription, setNewDescription] = useState('');
//   const token = localStorage.getItem("token");
// const id=useParams()
//   // useEffect(() => {
//   //   if (taskToEdit) {
//   //     setNewTitle(taskToEdit.title);
//   //     setNewDescription(taskToEdit.description);
//   //   }
//   // }, [taskToEdit]);

//   // useEffect(() => {
//   //   if (taskToEdit) {
//   //     setNewTitle(taskToEdit.title);
//   //     setNewDescription(taskToEdit.description);
//   //   }
//   // }, [taskToEdit]);
  
//   useEffect((id)=>{
// axios.get(`http://localhost:7000/api/tasksbyid/${id}`)
// .then((res)=>{
// setNewTitle(res.data.title)
// setNewDescription(res.data.description)
// })
// .catch((err)=>{
//   console.log(err);
// })
  
//   })

//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:7000/api/updatetasks/${taskToEdit.id}`, {
//         title: newTitle,
//         description: newDescription,
//       }, {
//         headers: { Authorization: `Bearer ${token}` }, // Correctly placed headers
//       });
//       saveTaskEdit(); // Call the function to refresh the task list or update the state
//       closeModal(); // Close the modal after saving
//     } catch (error) {
//       console.error("Error saving task:", error);
//     }
//   };

//   return (
//     <Modal open={open} onClose={closeModal}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 400,
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           padding: 4,
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h6">Edit Task</Typography>
//         <TextField
//           label="Title"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//           fullWidth
//           sx={{ marginBottom: 2 }}
//         />
//         <TextareaAutosize
//           minRows={3}
//           placeholder="Description"
//           value={newDescription}
//           onChange={(e) => setNewDescription(e.target.value)}
//           style={{ width: "100%", padding: 8 }}
//         />
//         <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
//           <Button onClick={closeModal} sx={{ marginRight: 2 }}>
//             Cancel
//           </Button>
//           <Button onClick={handleSave} variant="contained" color="primary">
//             Save
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default EditTaskModal;


import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  TextareaAutosize,
} from "@mui/material";
import axios from "axios";

const EditTask = ({ open, closeModal, saveTaskEdit, taskId }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (taskId) {
      axios
        .get(`http://localhost:7000/api/tasksbyid/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setNewTitle(res.data.title);
          setNewDescription(res.data.description);
        })
        .catch((err) => console.error(err));
    }
  }, [taskId, token]);

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:7000/api/updatetasks/${taskId}`,
        {
          title: newTitle,
          description: newDescription,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      saveTaskEdit();
      closeModal();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">Edit Task</Typography>
        <TextField
          label="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextareaAutosize
          minRows={3}
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button onClick={closeModal} sx={{ marginRight: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTask;
