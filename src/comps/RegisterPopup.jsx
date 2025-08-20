import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";

export default function RegisterPopup({ open, onClose }) {
  const [formData, setFormData] = useState({
    picture: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        return;
      }

      // Example API call to register user
      const res = await axios.post(
        "https://votingbackend-sitg.onrender.com/register", // Your backend route
        formData,
        {
          headers: { Authorization: token },
        }
      );

      console.log("Registered successfully:", res.data);
      onClose();
      setFormData({ picture: "", bio: "" });
      alert("You have registered successfully!");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register to Participate</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Profile Picture URL"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
