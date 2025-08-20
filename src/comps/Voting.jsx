import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Alert,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";
import axios from "axios";

export default function Voting() {
  const { id: electionId } = useParams();
  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // 1. Get current user profile
        const userRes = await axios.get(
          "https://votingbackend-sitg.onrender.com/voter/profile",
          {
            headers: { Authorization: token },
          }
        );
        setCurrentUser(userRes.data);
        setIsAdmin(userRes.data.role === "admin");

        // 2. Get election data with candidates
        const electionRes = await axios.get(
          `https://votingbackend-sitg.onrender.com/election/${electionId}`,
          { headers: { Authorization: token } }
        );

        // 3. Check if user has already voted
        const userHasVoted = electionRes.data.voters.some(
          (voter) => voter._id.toString() === userRes.data._id
        );
        setHasVoted(userHasVoted);

        // 4. Get details for each candidate
        const candidatesWithDetails = await Promise.all(
          electionRes.data.candidates.map(async (candidate) => {
            const voterRes = await axios.get(
              `https://votingbackend-sitg.onrender.com/voter/${candidate._id}`,
              { headers: { Authorization: token } }
            );
            return {
              ...voterRes.data,
              votes: candidate.votes,
              electionCandidateId: candidate._id,
            };
          })
        );

        setElection(electionRes.data);
        setCandidates(candidatesWithDetails);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load election data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [electionId]);

  const handleVote = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!currentUser) {
        throw new Error("User information not available");
      }

      if (!selectedCandidateId) {
        throw new Error("No candidate selected");
      }

      // Cast vote using your route with URL parameters
      await axios.post(
        `https://votingbackend-sitg.onrender.com/election/${electionId}/vote/${selectedCandidateId}/${currentUser._id}`,
        {}, // Empty body since we're using URL params
        { headers: { Authorization: token } }
      );

      setHasVoted(true);
      alert("Vote submitted successfully!");

      // Refresh election data
      const electionRes = await axios.get(
        `https://votingbackend-sitg.onrender.com/election/${electionId}`,
        { headers: { Authorization: token } }
      );
      setElection(electionRes.data);
    } catch (err) {
      console.error("Error submitting vote:", err);
      alert(err.response?.data?.message || "Failed to submit vote");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading election data...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        {election?.name}
      </Typography>

      {hasVoted ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          Your vote has been recorded. Thank you for participating!
        </Alert>
      ) : (
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Select your candidate
        </Typography>
      )}

      <Divider sx={{ my: 3 }} />

      <Stack spacing={3}>
        {candidates.map((candidate) => (
          <Card
            key={candidate._id}
            onClick={() =>
              !hasVoted && setSelectedCandidateId(candidate.electionCandidateId)
            }
            sx={{
              cursor: hasVoted ? "default" : "pointer",
              border:
                selectedCandidateId === candidate.electionCandidateId
                  ? "2px solid #1976d2"
                  : "1px solid #e0e0e0",
              transition: "all 0.2s ease",
              opacity: hasVoted ? 0.9 : 1,
            }}
          >
            <CardContent sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Avatar
                src={candidate.image}
                sx={{
                  width: 80,
                  height: 80,
                  border: "2px solid #f5f5f5",
                }}
              />

              <div>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Name - {candidate.name}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mb: 0.5, textTransform: "uppercase" }}
                >
                  {candidate.department}
                  <Chip
                    label={`Year ${candidate.year}`}
                    size="small"
                    sx={{ ml: 1.5 }}
                  />
                </Typography>

                <Typography variant="body2" sx={{ fontStyle: "italic", mb: 1 }}>
                  {candidate.bio || "No bio provided"}
                </Typography>

                {isAdmin && (
                  <Typography sx={{ fontWeight: "medium" }}>
                    Current Votes: {candidate.votes}
                  </Typography>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {!hasVoted && (
        <Button
          variant="contained"
          size="large"
          onClick={handleVote}
          disabled={!selectedCandidateId}
          sx={{
            mt: 4,
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Submit Vote
        </Button>
      )}
    </Container>
  );
}
