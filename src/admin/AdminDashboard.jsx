import React, { useState } from "react";
import { AppBar, Tabs, Tab, Paper, Box } from "@mui/material";
import CreateElection from "./CreateElection";
import DeleteVoters from "./DeleteVoters";
import OngoingElection from "./OngoingElection";

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Paper elevation={3} sx={{ maxWidth: 1000, margin: "auto", mt: 2 }}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          centered
        >
          <Tab label="Create Election" />
          <Tab label="Delete Voters" />
          <Tab label="Ongoing Election" />
        </Tabs>
      </AppBar>

      <TabPanel value={tabValue} index={0}>
        <CreateElection />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <DeleteVoters />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <OngoingElection />
      </TabPanel>
    </Paper>
  );
}
