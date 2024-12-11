import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { Draggable } from "react-beautiful-dnd";

const TaskColumn = ({ columnId, columnTitle, tasks, renderTask }) => (
  <Grid item xs={4}>
    <Box sx={{ padding: 2, backgroundColor: "#f4f5f7", borderRadius: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {columnTitle}
      </Typography>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{ minHeight: 400, padding: 2, backgroundColor: "#fff", borderRadius: 2 }}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {renderTask(task, index)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  </Grid>
);

export default TaskColumn;