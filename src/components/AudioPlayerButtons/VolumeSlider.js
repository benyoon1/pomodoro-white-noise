import React from "react";
import { Slider, Box } from "@mui/material";
import "./VolumeSlider.css";

const VolumeSlider = ({ onVolumeChange, vol }) => {
  return (
    <Box
      sx={{
        "@media (max-width: 600px)": {
          width: 270,
          padding: "1rem",
        },
        "@media (min-width: 600px)": {
          padding: "2rem",
        },
        "@media (min-width: 960px)": {
          width: 250,
          padding: "2rem",
        },
        //marginRight: "11.7rem",
        animation: "spreadOut .15s ease-out forwards", // Apply the animation
        // Initial state before animation starts
        transform: "scaleX(0)",
        transformOrigin: "center", // Adjust this based on the side it should spread out from
      }}
    >
      <Slider
        sx={{
          color: "#197F21",
          "&:hover, &.Mui-focusVisible, &.Mui-active": {
            boxShadow: "none",
          },
        }}
        value={vol ? vol : 0}
        min={0}
        max={100}
        onChange={(e, volume) => onVolumeChange(volume)}
      />
    </Box>
  );
};

export default VolumeSlider;
