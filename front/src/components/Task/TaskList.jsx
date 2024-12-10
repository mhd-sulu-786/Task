import React from "react";
import { Button } from "@mui/material";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} style={{ display: "flex", margin: "10px 0" }}>
          <div style={{ flex: 1 }}>{task.title}</div>
          <Button onClick={() => onEdit(task)}>Edit</Button>
          <Button onClick={() => onDelete(task.id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
