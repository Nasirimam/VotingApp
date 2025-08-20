import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  Box,
  Divider,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkIcon from "@mui/icons-material/Work";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);

  // Fetch profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // change if you store it differently
        console.log(token);
        const res = await axios.get(
          "https://votingbackend-sitg.onrender.com/voter/profile",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(res.data);
        setUserData(res.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!userData) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" align="center">
          Loading profile...
        </Typography>
      </Container>
    );
  }

  const details = [
    {
      label: "Roll Number",
      value: userData.rollnumber,
      icon: <BadgeIcon color="primary" />,
    },
    {
      label: "Department",
      value: userData.department?.toUpperCase(),
      icon: <SchoolIcon color="primary" />,
    },
    {
      label: "Year",
      value: userData.year,
      icon: <CalendarTodayIcon color="primary" />,
    },
    {
      label: "Role",
      value: userData.role?.charAt(0).toUpperCase() + userData.role?.slice(1),
      icon: <WorkIcon color="primary" />,
    },
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper
        elevation={3}
        sx={{ borderRadius: 3, overflow: "hidden", bgcolor: "#ffffff" }}
      >
        {/* Header */}
        <Box
          sx={{
            height: 140,
            background: "linear-gradient(135deg, #0d47a1, #1976d2)",
          }}
        />

        {/* Avatar */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: -7 }}>
          <Avatar
            sx={{
              bgcolor: "#1565c0",
              width: 100,
              height: 100,
              border: "4px solid white",
              boxShadow: 3,
            }}
          >
            <PersonIcon fontSize="large" />
          </Avatar>
        </Box>

        {/* Name & Email */}
        <Box sx={{ textAlign: "center", p: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            {userData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userData.email}
          </Typography>
        </Box>

        <Divider />

        {/* Details */}
        <Box sx={{ px: 3, py: 1 }}>
          <Grid container spacing={5}>
            {details.map((item, index) => (
              <Grid key={index}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {item.icon}
                  <Box sx={{ ml: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {item.label}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider />

        {/* Actions */}
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Button variant="contained" sx={{ borderRadius: 2, px: 4 }}>
            Edit Profile
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
