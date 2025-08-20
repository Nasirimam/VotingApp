import React from "react";
import { Box, Container, Grid, Typography, Link, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0a192f",
        color: "#fff",
        paddingY: 5,
        marginTop: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid>
            <Typography variant="h6" gutterBottom>
              About Z.A Islamia College Of Technology & Management
            </Typography>
            <Typography variant="body2" color="grey.400">
              Z.A. Islamia College of Technology & Management is a leading
              institution for technical and management education in Siwan,
              Bihar, offering modern courses with strong core values.
            </Typography>
          </Grid>

          {/* Useful Links */}
          <Grid>
            <Typography variant="h6" gutterBottom>
              Useful Links
            </Typography>
            {[
              "Home",
              "About Us",
              "Courses",
              "Blog",
              "Contact",
              "Privacy Policy",
            ].map((text, index) => (
              <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                <Link href="#" color="inherit" underline="hover">
                  {text}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Contact Info */}
          <Grid>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Address: Ahmad Ghani Nagar, ZA Islamia P.G College Campus, Siwan,
              Bihar 841226
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: admissions@zaictm.in
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: +91 9835078686
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Fax: +91 9262222121
            </Typography>
          </Grid>

          {/* Support Links */}
          <Grid>
            <Typography variant="h6" gutterBottom>
              Our Support
            </Typography>
            {["Help Center", "Contact Us", "FAQs", "Community"].map(
              (text, index) => (
                <Typography key={index} variant="body2">
                  <Link href="#" color="inherit" underline="hover">
                    {text}
                  </Link>
                </Typography>
              )
            )}
          </Grid>
        </Grid>

        <Divider sx={{ backgroundColor: "grey.800", my: 3 }} />

        {/* Footer Bottom */}
        <Typography variant="body2" align="center" sx={{ color: "grey.500" }}>
          Copyright © 2025 Z.A Islamia College Of Technology & Management Siwan
          - Graduation and Post Graduation Courses. Powered by WordPress
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
