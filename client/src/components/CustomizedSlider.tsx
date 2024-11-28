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
const SliderPoke = styled(Slider)(({ theme }) => ({
  color: "white",
  height: 5,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 30,
    width: 30,
    backgroundColor: "transparent",
    backgroundImage:
      "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif')", // Lien vers votre image
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    border: "none",
    outline: "none",
    borderRadius: "4px",
    boxShadow: "none",
    marginTop: -5,
    marginLeft: 5,
    "&:before, &:focus, &:hover, &.Mui-active": {
      outline: "none", // Supprime le contour de focus en mode actif
      boxShadow: "none", // Supprime l'ombre supplémentaire
    },
    [theme.breakpoints.up(850)]: {
      height: 40,
      width: 40,
    },
  },
  "& .MuiSlider-track": {
    border: "solid 1px white",
    height: 4,
    backgroundColor: "white",
    [theme.breakpoints.up(850)]: {
      height: 6,
    },
  },
  "& .MuiSlider-rail": {
    opacity: 0.6,
    backgroundColor: "white",
    "& .MuiSlider-rail": {
      opacity: 0.6,
      backgroundColor: "white",
      [theme.breakpoints.up(850)]: {
        height: 6,
      },
    },
  },
  "& .MuiSlider-markLabel": {
    color: "#ffffff",
    fontFamily: '"Fredoka", sans-serif',
    [theme.breakpoints.up(850)]: {
      fontSize: "16px",
    },
  },
}));

// Définition des marques pour les valeurs spécifiques
const marks = [
  { value: 0, label: "8" },
  { value: 1, label: "16" },
  { value: 2, label: "32" },
  { value: 3, label: "64" },
];

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "18px", // Taille de la police
  fontWeight: "500", // Style de police
  fontFamily: '"Fredoka", sans-serif',
  marginBottom: "16px", // Marge inférieure
  [theme.breakpoints.up(850)]: {
    fontSize: "24px", // Taille de la police augmentée pour les grands écrans
    marginBottom: "20px", // Ajuste la marge inférieure
  },
}));

// Composant principal
export default function CustomizedSlider() {
  const { sliderValue, setSliderValue } = useBattle();

  const handleChange = (_: Event, value: number | number[]) => {
    setSliderValue(Number(value));
  };
  return (
    <Box sx={{ width: 278 }}>
      <StyledTypography gutterBottom>Nombre de Pokémons :</StyledTypography>
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
