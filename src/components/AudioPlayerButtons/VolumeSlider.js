import React from "react";
import { Slider, Box } from "@mui/material";

function VolumeSlider({ onVolumeChange }) {
  return (
    <Box sx={{ width: 200, marginRight: "11.7rem", marginTop: "0.5rem" }}>
      <Slider
        sx={{
          color: "#fff",
          "&:hover, &.Mui-focusVisible, &.Mui-active": {
            boxShadow: "none",
          },
        }}
        defaultValue={50}
        min={0}
        max={100}
        onChange={(e, volume) => onVolumeChange(volume)}
      />
    </Box>
  );
}

export default VolumeSlider;
