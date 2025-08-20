import React, { useState } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Close } from "@mui/icons-material";
import { Center } from "@chakra-ui/react";

export default function Gallery() {
  const images = [
    "https://picsum.photos/id/1015/600/400",
    "https://picsum.photos/id/1025/600/400",
    "https://picsum.photos/id/1035/600/400",
    "https://picsum.photos/id/1015/600/400",
    "https://picsum.photos/id/1025/600/400",
    "https://picsum.photos/id/1035/600/400",
    "https://picsum.photos/id/1015/600/400",
    "https://picsum.photos/id/1025/600/400",
    "https://picsum.photos/id/1035/600/400",
    "https://picsum.photos/id/1015/600/400",
    "https://picsum.photos/id/1025/600/400",
    "https://picsum.photos/id/1035/600/400",
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <Center sx={{ p: 2 }}>
      {/* Image Grid */}
      <Grid container spacing={2}>
        {images.map((src, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Box
              component="img"
              src={src}
              alt={`Gallery ${index}`}
              sx={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: 2,
                cursor: "pointer",
              }}
              onClick={() => setSelectedIndex(index)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Full View Mode */}
      {selectedIndex !== null && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          {/* Close Button */}
          <IconButton
            sx={{ position: "absolute", top: 20, right: 20, color: "#fff" }}
            onClick={() => setSelectedIndex(null)}
          >
            <Close />
          </IconButton>

          {/* Prev Button */}
          <IconButton
            sx={{ position: "absolute", left: 20, color: "#fff" }}
            onClick={handlePrev}
          >
            <ArrowBackIos />
          </IconButton>

          {/* Image */}
          <Box
            component="img"
            src={images[selectedIndex]}
            alt="Full View"
            sx={{
              maxWidth: "90%",
              maxHeight: "80%",
              borderRadius: 2,
            }}
          />

          {/* Next Button */}
          <IconButton
            sx={{ position: "absolute", right: 20, color: "#fff" }}
            onClick={handleNext}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      )}
    </Center>
  );
}
