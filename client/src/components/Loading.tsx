import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useData } from "../contexts/DataProvider";
import "../styles/Loading.css";

export default function Loading() {
  const { progress } = useData();
  return (
    <div className="loading-container">
      <h1>Chargement du Pokédex en cours...</h1>
      <Box sx={{ width: "25vw", minWidth: "300px" }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </div>
  );
}
