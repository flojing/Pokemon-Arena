import Slider from "@mui/material/Slider";
import type { SliderValueLabelProps } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Composant personnalisé pour afficher la valeur dans un Tooltip
function ValueLabelComponent(props: SliderValueLabelProps) {
  const { children, value } = props;
  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

// Style personnalisé pour le slider
const SliderPoke = styled(Slider)(() => ({
  color: "",
  height: 5,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    backgroundColor: "#fff",
    boxShadow: "0 0 2px 0px rgba(0, 0, 0, 0.1)",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
      "@media (hover: none)": {
        boxShadow:
          "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)",
      },
    },
  },
  "& .MuiSlider-track": {
    border: "none",
    height: 3,
  },
  "& .MuiSlider-rail": {
    opacity: 0.8,
    backgroundColor: "#d0d0d0",
  },
  "& .MuiSlider-markLabel": {
    color: "#ffffff",
    fontFamily: '"Fredoka", sans-serif', // Définit la couleur des marques en blanc
  },
}));

// Définition des marques pour les valeurs spécifiques
const marks = [
  { value: 1, label: "8" },
  { value: 2, label: "16" },
  { value: 3, label: "32" },
  { value: 4, label: "64" },
];

const StyledTypography = styled(Typography)({
  fontSize: "18px", // Taille de la police
  fontWeight: "500", // Style de police
  fontFamily: '"Fredoka", sans-serif',
  marginBottom: "16px", // Marge inférieure
});

// Composant principal
export default function CustomizedSlider() {
  return (
    <Box sx={{ width: 278 }}>
      <StyledTypography gutterBottom>Nombre de Pokémon</StyledTypography>
      <SliderPoke
        aria-label="slider"
        defaultValue={0}
        min={1}
        max={4}
        step={null} // Pour restreindre aux valeurs de `marks`
        marks={marks}
        slots={{ valueLabel: ValueLabelComponent }}
      />
    </Box>
  );
}
