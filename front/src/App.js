


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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login'; 
import Register from './components/Auth/Register'; 
import ProtectedRoute from './components/ProtectedRoute';
import TaskCRUD from './components/Task/Task';
import TaskRanking from './components/Task/TaskRanking';
import Dashboard from './Pages/NavBar';

const App = () => {
  return (
 
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><TaskCRUD /></ProtectedRoute>} />
        <Route path="/ranking" element={<ProtectedRoute><TaskRanking /></ProtectedRoute>} />

        {/* Add fallback route if needed */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
   
  );
};

export default App;
