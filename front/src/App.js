


// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";

// import { AppBar, Toolbar, Button, Container } from "@mui/material";
// import TaskCRUD from "./components/Task/Task";
// import TaskRanking from "./components/Task/TaskRanking";


// export const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token'); // Check if token exists
//   return token ? children : <Navigate to="/login" />;
// };

// const App = () => {
//   return (
//     <div>
//       {/* Navigation Bar */}
//       <AppBar position="static">
//         <Toolbar>
//           <Button color="inherit" component={Link} to="/">
//             Task CRUD
//           </Button>
//           <Button color="inherit" component={Link} to="/ranking">
//             Task Ranking
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Page Content */}
//       <Container style={{ marginTop: "20px" }}>
//         <Routes>
//           <Route path="/" element={<TaskCRUD />} />
//           <Route path="/ranking" element={<TaskRanking />} />
//         </Routes>
//       </Container>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login'; 
import Register from './components/Auth/Register'; 
import ProtectedRoute from './components/ProtectedRoute';
// import TaskCRUD from './components/Task/Task';
// import TaskRanking from './components/Task/TaskRanking';
import Dashboard from './Pages/NavBar';
// import TaskList from './components/Task/TaskList';
// import Task from './components/Task/Task';
// import TaskBoard from './components/Task/TaskBoard';
import Board from './components/AllTask/Board';
import Profile from './Pages/Profile';
import TaskForm from './components/AllTask/TaskForm';
import TaskCard from './components/AllTask/TaskCard';
import EditTask from './components/AllTask/EditTask';

const App = () => {
  return (
 
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        
        <Route path="/board" element={<Board />} />
        {/* Protected Routes */}
        <Route path="/dashboard/:id" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/board" element={<ProtectedRoute><Board /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="/task" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} /> 
        {/* <Route path="/view" element={<ProtectedRoute><TaskCard /></ProtectedRoute>} />  */}
        <Route path="/edit/:taskId" element={<ProtectedRoute><EditTask /></ProtectedRoute>} /> 
        
      </Routes>
   
  );
};

export default App;
