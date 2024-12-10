import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../Redux/taskSlice";

import { Button } from "@mui/material";
import TaskDialog from "./Update";
import TaskList from "./TaskList";
const TaskCRUD = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEdit = (task) => {
    setCurrentTask(task);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div>
      <h1>Task Management</h1>
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Create Task
      </Button>
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      <TaskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        task={currentTask}
      />
    </div>
  );
};

export default TaskCRUD;
