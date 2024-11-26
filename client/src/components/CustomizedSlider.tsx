import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import type { SliderValueLabelProps } from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useBattle } from "../contexts/BattleProvider";

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
  color: "white",
  height: 5,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 30, // Adapter la taille pour l'image
    width: 30,
    backgroundColor: "transparent", // Rendre le fond transparent si nécessaire
    backgroundImage:
      "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif')", // Lien vers votre image
    backgroundSize: "cover", // Ajuste l'image pour remplir le bouton
    backgroundRepeat: "no-repeat", // Empêche la répétition
    backgroundPosition: "center", // Centre l'image
    border: "none", // Supprime les bordures si nécessaire
    boxShadow: "none", // Supprime les ombres pour se concentrer sur l'image
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)", // Ajoutez un effet visuel si souhaité
    },
  },
  "& .MuiSlider-track": {
    border: "solid 1px white",
    height: 4,
    backgroundColor: "white",
  },
  "& .MuiSlider-rail": {
    opacity: 0.6,
    backgroundColor: "white",
  },
  "& .MuiSlider-markLabel": {
    color: "#ffffff",
    fontFamily: '"Fredoka", sans-serif',
  },
}));

// Définition des marques pour les valeurs spécifiques
const marks = [
  { value: 0, label: "8" },
  { value: 1, label: "16" },
  { value: 2, label: "32" },
  { value: 3, label: "64" },
];

const StyledTypography = styled(Typography)({
  fontSize: "18px", // Taille de la police
  fontWeight: "500", // Style de police
  fontFamily: '"Fredoka", sans-serif',
  marginBottom: "16px", // Marge inférieure
});

// Composant principal
export default function CustomizedSlider() {
  const { sliderValue, setSliderValue } = useBattle();

  const handleChange = (_: Event, value: number | number[]) => {
    setSliderValue(Number(value));
  };
  return (
    <Box sx={{ width: 278 }}>
      <StyledTypography gutterBottom>Nombre de Pokémon</StyledTypography>
      <SliderPoke
        aria-label="slider"
        onChange={handleChange}
        value={sliderValue}
        min={0}
        max={3}
        step={null} // Pour restreindre aux valeurs de `marks`
        marks={marks}
        slots={{ valueLabel: ValueLabelComponent }}
      />
    </Box>
  );
}
