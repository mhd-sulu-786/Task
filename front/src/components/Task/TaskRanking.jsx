import React, { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask } from "../Redux/taskSlice";

const TaskRanking = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const unranked = tasks.filter((task) => !task.rank);
  const ranked = tasks.filter((task) => task.rank);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const task = tasks.find((t) => t.id === result.draggableId);
    dispatch(updateTask({ ...task, rank: result.destination.index + 1 }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: "20px" }}>
        <Droppable droppableId="unranked">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <h2>Unranked Tasks</h2>
              {unranked.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ padding: "8px", margin: "4px", background: "#f4f4f4" }}
                    >
                      {task.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="ranked">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <h2>Ranked Tasks</h2>
              {ranked.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ padding: "8px", margin: "4px", background: "#e3f2fd" }}
                    >
                      {task.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default TaskRanking;
