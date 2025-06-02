import { Typography } from "@mui/material";

export default function Title() {
  return (
    <div className="text-center mb-6 select-none">
      <Typography
        variant="h3"
        className="font-extrabold tracking-wide text-4xl md:text-5xl"
        style={{ color: "#D97706" }}
      >
        Recipe Finder App
      </Typography>
    </div>
  );
}

