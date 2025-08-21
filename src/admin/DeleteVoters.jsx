import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableContainer,
  Paper,
  Stack,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

export default function DeleteVoters() {
  const [voters, setVoters] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const res = await axios.get(
          "https://votingbackend-sitg.onrender.com/voter"
        );
        setVoters(res.data);
      } catch (error) {
        console.error("Error fetching voters:", error);
      }
    };
    fetchVoters();
  }, []);

  const handleDeleteVoter = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://votingbackend-sitg.onrender.com/voter/delete/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setVoters((prevVoters) => prevVoters.filter((voter) => voter._id !== id));
    } catch (error) {
      console.error("Error deleting voter:", error);
    }
  };

  const handleToggleRole = async (id, currentRole) => {
    try {
      const token = localStorage.getItem("token");
      const newRole = currentRole === "voter" ? "admin" : "voter";

      setVoters((prevVoters) =>
        prevVoters.map((voter) =>
          voter._id === id ? { ...voter, role: newRole } : voter
        )
      );

      await axios.patch(
        `https://votingbackend-sitg.onrender.com/voter/updateRole/${id}`,
        { role: newRole },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Delete Voters
      </Typography>

      {/* Desktop view: Table */}
      {!isMobile ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {voters.map((voter) => (
                <TableRow key={voter._id}>
                  <TableCell>{voter.name}</TableCell>
                  <TableCell>{voter.email}</TableCell>
                  <TableCell>{voter.role}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => handleToggleRole(voter._id, voter.role)}
                      >
                        {voter.role === "voter" ? "Make Admin" : "Make Voter"}
                      </Button>
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => handleDeleteVoter(voter._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        /* Mobile view: Cards stacked vertically */
        <Stack spacing={2}>
          {voters.map((voter) => (
            <Card key={voter._id} variant="outlined">
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">
                    <strong>Name:</strong> {voter.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {voter.email}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Role:</strong> {voter.role}
                  </Typography>
                  <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleToggleRole(voter._id, voter.role)}
                      fullWidth
                    >
                      {voter.role === "voter" ? "Make Admin" : "Make Voter"}
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => handleDeleteVoter(voter._id)}
                      fullWidth
                    >
                      Delete
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </>
  );
}
