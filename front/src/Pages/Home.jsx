import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";

function Home() {
  return (
    <Box sx={{ backgroundColor: "#f4f6f9", minHeight: "100vh", padding: 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          textAlign: "center",
          marginBottom: 4,
          background: "linear-gradient(135deg, #002147, #0077b6)",
          color: "white",
          padding: 25,
          borderRadius: 2,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Ignite Your Startup’s Potential
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Progress instruments to boost your startup journey.
        </Typography>
      </Box>

      {/* Main Content Section */}
      <Grid container spacing={4}>
        {/* Monthly Statistics Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, color: "#0077b6" }}
              >
                Monthly Statistics
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography>📊 Growth: 120%</Typography>
                <Typography>💰 Revenue: $2.34M</Typography>
              </Box>
            </CardContent>
          </Card>
         </Grid>

        {/* Call-to-Action Section */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 3,
              padding: 3,
              background: "linear-gradient(135deg, #0077b6, #0096c7)",
              color: "white",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              In search of a promising startup’s future?
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "white",
                color: "#0077b6",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              Start Now
            </Button>
          </Card>
        </Grid>

        {/* Additional Cards */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, color: "#0077b6" }}
              >
                Variable Progressions
              </Typography>
              <Typography>
                Implement strategies across multiple fronts for acceleration.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, color: "#0077b6" }}
              >
                Active Startups
              </Typography>
              <Typography>
                Join a community of <strong>+430</strong> active startups.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, color: "#0077b6" }}
              >
                Quick Message
              </Typography>
              <Typography>Have questions? Send us a quick message.</Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#0077b6",
                  "&:hover": { backgroundColor: "#005f8a" },
                }}
              >
                Send Message
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;