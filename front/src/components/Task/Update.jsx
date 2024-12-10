import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { createTask, updateTask } from "../Redux/taskSlice";

const TaskDialog = ({ open, onClose, task }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // Added description state
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description); // Set description for existing tasks
    } else {
      setTitle("");
      setDescription(""); // Reset for new tasks
    }
  }, [task]);

  const handleSubmit = () => {
    if (task) {
      // Dispatch updateTask with title and description
      dispatch(updateTask({ ...task, title, description }));
    } else {
      // Dispatch createTask with title and description
      dispatch(createTask({ title, description }));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <TextField
          fullWidth
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {task ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
