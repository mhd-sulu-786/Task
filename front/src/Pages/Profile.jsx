import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id"); // Make sure `id` is properly stored in local storage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:7000/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setUser(data);
        } else {
          const text = await response.text();
          console.error('Unexpected response text:', text);
          throw new Error('Expected JSON response but got a different type.');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, token]);

  if (loading) return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography color="error">{error}</Typography>
    </Box>
  );

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: 5 }}
      >
        <Grid item xs={12}>
          <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                alt={user ? user.name : 'User'}
                src="/path-to-avatar.jpg" // Replace with a dynamic avatar source if available
                sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }}
              />
              <Typography gutterBottom variant="h6" color="text.secondary">
                User Profile
              </Typography>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                {user ? user.name : 'User Name'}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                {user ? user.email : 'User Email'}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {user ? `Welcome, ${user.name}` : 'Fetching user data...'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="primary" sx={{ width: '100%' }}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
