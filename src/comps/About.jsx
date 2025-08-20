import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";

export default function About() {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Introduction */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          The Best College To Enroll Education
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          maxWidth="800px"
          mx="auto"
        >
          Z.A. Islamia College of Technology & Management, located in Siwan,
          Bihar, is renowned for offering technical education alongside a
          comprehensive general curriculum. Our mission is to blend traditional
          technical teachings with modern educational practices, equipping
          students for diverse fields while grounding them in core values.
        </Typography>
      </Box>

      {/* Experience */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          mb: 6,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          20 Years Of Experience
        </Typography>
        <Typography variant="body1" mt={1}>
          By focusing on these strengths, we effectively differentiate ourselves
          from other institutions and highlight our unique value to prospective
          students and stakeholders.
        </Typography>
      </Box>

      {/* Sections */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {[
          {
            icon: <SchoolIcon fontSize="large" color="primary" />,
            title: "Programs Offered",
          },
          {
            icon: <BusinessIcon fontSize="large" color="primary" />,
            title: "Facilities",
          },
          {
            icon: <GroupsIcon fontSize="large" color="primary" />,
            title: "Faculty",
          },
          {
            icon: <WorkIcon fontSize="large" color="primary" />,
            title: "Internships, Workshops & Job Placements",
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: "center", p: 2, height: "100%" }}>
              <CardContent>
                {item.icon}
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Why We Are Best */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          How We Are Best Among Others?
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          maxWidth="800px"
          mx="auto"
        >
          We emphasize quality education, practical exposure, and a nurturing
          environment that prepares students to excel in their careers and life.
          Our strong network of alumni, industry connections, and committed
          faculty make us a top choice.
        </Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={4} textAlign="center">
        {[
          { number: "16K+", label: "Enrolled Students" },
          { number: "₹7,00,000", label: "Highest Placement" },
          { number: "6,000+", label: "Campus Placements" },
          { number: "—", label: "Campus Companies" },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ p: 3, height: "100%" }}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {stat.number}
              </Typography>
              <Typography variant="body1">{stat.label}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
