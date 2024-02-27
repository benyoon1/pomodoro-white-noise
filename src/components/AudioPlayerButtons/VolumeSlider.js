import React from "react";
import { Slider, Box } from "@mui/material";

function VolumeSlider({ onVolumeChange, vol }) {
  return (
    <Box sx={{ width: 200, marginRight: "11.7rem", marginTop: "0.5rem" }}>
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
