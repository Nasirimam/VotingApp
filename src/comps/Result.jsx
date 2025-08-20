import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Result() {
  const [completedElections, setCompletedElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [candidatesData, setCandidatesData] = useState([]);

  useEffect(() => {
    const fetchCompletedElections = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "https://votingbackend-sitg.onrender.com/election",
          {
            headers: { Authorization: token },
          }
        );

        const completed = res.data.filter(
          (election) => election.status === "completed"
        );

        const withWinners = await Promise.all(
          completed.map(async (election) => {
            if (!election.candidates || election.candidates.length === 0) {
              return { ...election, winner: "No candidates" };
            }

            // Find highest vote count
            const maxVotes = Math.max(
              ...election.candidates.map((c) => c.votes)
            );
            const topCandidates = election.candidates.filter(
              (c) => c.votes === maxVotes
            );

            if (topCandidates.length > 1) {
              return { ...election, winner: "Tie" };
            }

            const topCandidate = topCandidates[0];

            if (!topCandidate?._id) {
              return { ...election, winner: "Unknown" };
            }

            try {
              const voterRes = await axios.get(
                `https://votingbackend-sitg.onrender.com/voter/${topCandidate._id}`,
                { headers: { Authorization: token } }
              );
              const winnerName = voterRes.data?.name || "Unknown";
              return { ...election, winner: winnerName };
            } catch (err) {
              console.error(`Error fetching voter ${topCandidate._id}`, err);
              return { ...election, winner: "Error fetching name" };
            }
          })
        );

        setCompletedElections(withWinners);
      } catch (error) {
        console.error("Error fetching completed elections:", error);
      }
    };

    fetchCompletedElections();
  }, []);

  const handleViewDetails = async (election) => {
    try {
      const token = localStorage.getItem("token");
      const candidatesWithNames = await Promise.all(
        election.candidates.map(async (candidate) => {
          try {
            const res = await axios.get(
              `https://votingbackend-sitg.onrender.com/voter/${candidate._id}`,
              { headers: { Authorization: token } }
            );
            return {
              name: res.data?.name || "Unknown",
              votes: candidate.votes,
            };
          } catch {
            return { name: "Error fetching name", votes: candidate.votes };
          }
        })
      );
      setCandidatesData(candidatesWithNames);
      setSelectedElection(election);
    } catch (err) {
      console.error("Error fetching candidate details:", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Completed Elections & Winners
      </Typography>

      {completedElections.length > 0 ? (
        <Stack spacing={2}>
          {completedElections.map((election) => (
            <Card key={election._id} sx={{ p: 2 }}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h6">{election.name}</Typography>
                    <Typography>Status: {election.status}</Typography>
                    <Typography>
                      Winner: <strong>{election.winner}</strong>
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewDetails(election)}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography color="error">No completed elections found.</Typography>
      )}

      <Dialog
        open={!!selectedElection}
        onClose={() => setSelectedElection(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{selectedElection?.name} - Candidates & Votes</DialogTitle>
        <DialogContent>
          {candidatesData.length > 0 ? (
            <>
              {candidatesData.map((c, index) => (
                <Typography key={index}>
                  {c.name}: {c.votes} votes
                </Typography>
              ))}
              <Bar
                data={{
                  labels: candidatesData.map((c) => c.name),
                  datasets: [
                    {
                      label: "Votes",
                      data: candidatesData.map((c) => c.votes),
                      backgroundColor: "rgba(75, 192, 192, 0.5)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "Election Results" },
                  },
                }}
              />
            </>
          ) : (
            <Typography>No candidates found.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}
// import React from "react";

// const Result = () => {
//   return (
//     <div>
//       <h1>This is Result</h1>
//     </div>
//   );
// };

// export default Result;
