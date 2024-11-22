import { Select, type SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useBattle } from "../contexts/BattleProvider";

const theme = createTheme({
  typography: {
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectChip({
  contentSelect,
  nameContent,
  name,
}: { contentSelect: string[]; nameContent: string; name: string }) {
  const { setGenerationName, generationName, setTypeName, typeName } =
    useBattle();
  const handleChangeGeneration = (
    event: SelectChangeEvent<typeof generationName>,
  ) => {
    const {
      target: { value },
    } = event;
    setGenerationName(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeType = (event: SelectChangeEvent<typeof typeName>) => {
    const {
      target: { value },
    } = event;
    setTypeName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <FormControl sx={{ m: 1, width: "95%" }}>
          <InputLabel id="demo-multiple-chip-label">{nameContent}</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={name === "generation" ? generationName : typeName}
            onChange={
              name === "generation" ? handleChangeGeneration : handleChangeType
            }
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {contentSelect.map((name: string) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
}
