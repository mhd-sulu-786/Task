import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '',name:"" });
  const [message, setMessage] = useState('');
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/auth/register', formData);
      setMessage('Registration successful! You can now log in.');
      setFormData({ email: '', password: '' ,name:''});
      console.log(response.data);
      alert('Registration successful!');
navigate('/login')
      
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      console.log(error);
      alert('Registration failed!');
      
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="userNAme"
            name="name"
            // autoComplete="email"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
          {message && <Typography color="error">{message}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
