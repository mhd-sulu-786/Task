import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Axios/api";

// Fetch Tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await api.get("/api/tasks"); // Use the `api` instance
  return response.data;
});

// Create Task
export const createTask = createAsyncThunk("tasks/createTask", async (task) => {
  const response = await api.post("/api/createtasks", task); // Use the `api` instance
  return response.data;
});

// Update Task
export const updateTask = createAsyncThunk("tasks/updateTask", async (task) => {
  const response = await api.put(`/api/updatetasks/${task.id}`, task); // Use the `api` instance
  return response.data;
});

// Delete Task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await api.delete(`/api/deletetasks/${id}`); // Use the `api` instance
  return id;
});

// Redux Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: { list: [] },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t.id === action.payload.id);
        state.list[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
