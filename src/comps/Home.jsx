import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Container,
} from "@mui/material";

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(to right, #004e92, #000428)",
          color: "#fff",
          py: 8,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Z.A Islamia College Of Technology & Management
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, maxWidth: 800, mx: "auto" }}>
          Welcome to Z.A. Islamia College of Technology & Management, a premier
          institution offering top-notch technical and management courses in
          Siwan.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="secondary" sx={{ mr: 2 }}>
            Apply Now
          </Button>
          <Button variant="outlined" color="inherit">
            See Info Video
          </Button>
        </Box>
      </Box>

      {/* Stats Section */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4} textAlign="center">
          {[
            { label: "Years Of Experience", value: "20" },
            { label: "Positive Reviews", value: "34k+" },
            { label: "Enrolled Students", value: "56k+" },
            { label: "Regular & Distance Courses", value: "20+" },
          ].map((stat, idx) => (
            <Grid item xs={6} md={3} key={idx}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {stat.value}
              </Typography>
              <Typography>{stat.label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Snippet */}
      <Box sx={{ background: "#f9f9f9", py: 6 }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            The Best Technical Graduation & Post Graduation College in Siwan,
            Bihar
          </Typography>
          <Typography sx={{ maxWidth: 900 }}>
            Situated in the vibrant city of Siwan, Bihar, Z.A. Islamia College
            of Technology & Management stands out as the leading institution for
            both undergraduate and postgraduate technical and management
            education.
          </Typography>
        </Container>
      </Box>

      {/* Featured Courses */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Featured Courses
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "BCA",
              fee: "₹22,500/Semester",
              desc: "Comprehensive education in computer science and applications.",
            },
            {
              title: "BBA",
              fee: "₹22,500/Semester",
              desc: "Comprehensive understanding of business principles and practices.",
            },
            {
              title: "BLIS",
              fee: "₹22,500/Semester",
              desc: "Training in managing information resources and library systems.",
            },
          ].map((course, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {course.title}
                  </Typography>
                  <Typography color="primary">{course.fee}</Typography>
                  <Typography sx={{ mt: 1 }}>{course.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials */}
      <Box sx={{ background: "#f4f6f8", py: 6 }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            What Our Students Say
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: "Ayesha Khan",
                course: "BCA Student",
                feedback:
                  "The faculty helped me gain the skills to succeed in the IT industry.",
              },
              {
                name: "Vikash Yadav",
                course: "BBA Student",
                feedback:
                  "Thanks to their guidance, I am now working at a top company.",
              },
            ].map((test, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Card>
                  <CardContent>
                    <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
                      {test.name[0]}
                    </Avatar>
                    <Typography variant="h6">{test.name}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {test.course}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>{test.feedback}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* News & Events */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          News & Events
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h6">AICTE DOCUMENT</Typography>
            <Typography variant="body2" color="text.secondary">
              September 7, 2024
            </Typography>
            <Typography sx={{ mt: 1 }}>
              LOA Report 2024-25 - Download to learn more.
            </Typography>
            <Button sx={{ mt: 2 }} variant="contained">
              Learn More
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
