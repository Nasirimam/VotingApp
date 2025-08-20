import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import axios from "axios";

export default function CreateElection() {
  const [electionName, setElectionName] = useState("");

  const handleCreateElection = async () => {
    if (!electionName.trim()) return; // prevent empty submission

    try {
      const token = localStorage.getItem("token"); // get token
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const res = await axios.post(
        "https://votingbackend-sitg.onrender.com/election",
        { name: electionName },
        {
          headers: {
            Authorization: `${token}`, // include token in headers
          },
        }
      );

      console.log("Election added:", res.data);
      setElectionName("");
    } catch (error) {
      console.error("Error adding election:", error);
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Create a New Election
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Election Name"
          value={electionName}
          onChange={(e) => setElectionName(e.target.value)}
          fullWidth
        />
      </Box>
      <Button variant="contained" onClick={handleCreateElection}>
        Create Election
      </Button>
    </>
  );
}
