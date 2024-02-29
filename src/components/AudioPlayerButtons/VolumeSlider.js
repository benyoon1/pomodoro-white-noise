import React from "react";
import { Slider, Box } from "@mui/material";
import "./VolumeSlider.css";

function VolumeSlider({ onVolumeChange, vol, onMouseEnter, onMouseLeave }) {
  return (
    <Box
      sx={{
        width: 200,
        marginRight: "11.7rem",
        padding: "1rem",
        animation: "spreadOut .15s ease-out forwards", // Apply the animation
        // Initial state before animation starts
        transform: "scaleX(0)",
        transformOrigin: "center", // Adjust this based on the side it should spread out from
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
}

export default VolumeSlider;
