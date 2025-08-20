import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import axios from "axios";

export default function DeleteVoters() {
  const [voters, setVoters] = useState([]);

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

      console.log("Voter deleted successfully");
    } catch (error) {
      console.error("Error deleting voter:", error);
    }
  };

  const handleToggleRole = async (id, currentRole) => {
    try {
      const token = localStorage.getItem("token");
      const newRole = currentRole === "voter" ? "admin" : "voter";

      // Optimistically update role in frontend
      setVoters((prevVoters) =>
        prevVoters.map((voter) =>
          voter._id === id ? { ...voter, role: newRole } : voter
        )
      );

      // Send request to backend
      await axios.patch(
        `https://votingbackend-sitg.onrender.com/voter/updateRole/${id}`,
        { role: newRole },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log("Role updated successfully");
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Delete Voters
      </Typography>
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
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleToggleRole(voter._id, voter.role)}
                  sx={{ mr: 5 }}
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
