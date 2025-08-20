import React, { useState, useEffect } from "react";
import { Typography, Button, Box, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OngoingElection() {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  // Fetch all elections
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        const res = await axios.get("https://votingbackend-sitg.onrender.com/election", {
          headers: { Authorization: `${token}` },
        });
        setElections(res.data || []);
      } catch (error) {
        console.error("Error fetching elections:", error);
      }
    };

    fetchElections();
  }, []);

  // Stop election
  const handleStopElection = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `https://votingbackend-sitg.onrender.com/election/${id}/stop`,
        {},
        {
          headers: { Authorization: `${token}` },
        }
      );

      setElections((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: "completed" } : e))
      );
    } catch (error) {
      console.error("Error stopping election:", error);
    }
  };

  // Delete election
  const handleDeleteElection = async (id) => {
    if (!window.confirm("Are you sure you want to delete this election?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://votingbackend-sitg.onrender.com/election/${id}`, {
        headers: { Authorization: `${token}` },
      });

      setElections((prev) => prev.filter((e) => e._id !== id));
      alert("Election deleted successfully");
    } catch (error) {
      console.error("Error deleting election:", error);
    }
  };

  // View results (navigate to result page)
  const handleViewResult = (id) => {
    navigate(`/results/${id}`); // redirect to result page for that election
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        All Elections
      </Typography>

      {elections.length > 0 ? (
        elections.map((election) => (
          <Box
            key={election._id}
            sx={{
              p: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              mb: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {election.name}
            </Typography>
            <Typography>Status: {election.status}</Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              {election.status === "ongoing" && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleStopElection(election._id)}
                >
                  Stop Election
                </Button>
              )}
              {election.status === "completed" && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteElection(election._id)}
                >
                  Delete Election
                </Button>
              )}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleViewResult(election._id)}
              >
                View Result
              </Button>
            </Stack>
          </Box>
        ))
      ) : (
        <Typography color="error">No elections found.</Typography>
      )}
    </>
  );
}
