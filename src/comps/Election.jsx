import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Stack,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

export default function VotePage() {
  const navigate = useNavigate();
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "https://votingbackend-sitg.onrender.com/election",
          {
            headers: { Authorization: token },
          }
        );

        setElections(res.data || []);
      } catch (error) {
        console.error("Error fetching elections:", error);
        showNotification("Failed to fetch elections", "error");
      }
    };

    fetchElections();
  }, []);

  const showNotification = (message, severity = "success") => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleNominate = async (electionId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userId = getUserIdFromToken(token);

      const response = await axios.post(
        `https://votingbackend-sitg.onrender.com/election/${electionId}/candidate`,
        { candidateId: userId },
        { headers: { Authorization: token } }
      );
      console.log(response);
      const electionsRes = await axios.get(
        "https://votingbackend-sitg.onrender.com/election",
        {
          headers: { Authorization: token },
        }
      );
      setElections(electionsRes.data || []);

      showNotification("You've been successfully nominated!");
    } catch (error) {
      console.error("Error nominating:", error);
      showNotification(
        error.response?.data?.message || "Failed to nominate yourself",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch (e) {
      console.error("Error decoding token:", e);
      return null;
    }
  };

  // Updated handleVote to navigate to voting route
  const handleVote = (Id) => {
    navigate(`/voteing/${Id}`); // Navigate to voting page
  };

  const handleViewResult = (electionId) => {
    navigate(`/results/${electionId}`); // Optional: navigate to results page
  };

  const isUserCandidate = (election) => {
    const userId = getUserIdFromToken(localStorage.getItem("token"));
    return election.candidates?.some((c) => c._id === userId);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Available Elections
      </Typography>

      {elections.length > 0 ? (
        <Stack spacing={2}>
          {elections.map((election) => (
            <Card key={election._id} sx={{ display: "flex", p: 2 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{election.name}</Typography>
                <Typography>Status: {election.status}</Typography>
                <Typography>
                  Candidates: {election.candidates?.length || 0}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {election.status === "ongoing" && (
                  <>
                    {!isUserCandidate(election) && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleNominate(election._id)}
                        disabled={loading}
                      >
                        {loading ? "Nominating..." : "Nominate Yourself"}
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleVote(election._id)}
                    >
                      Vote
                    </Button>
                  </>
                )}

                {election.status === "completed" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewResult(election._id)}
                  >
                    View Result
                  </Button>
                )}
              </Box>
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography color="error">No elections available.</Typography>
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
