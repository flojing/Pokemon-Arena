import { Switch } from "@mui/material";
import "../styles/SettingFilter.css";
import { useBattle } from "../contexts/BattleProvider";
import MultipleSelectChip from "./MultipleSelectChip";

export default function SettingFilter() {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const { isBaseForm, setIsBaseForm, isShinyBattle, setIsShinyBattle } =
    useBattle();

  const generation = [
    "Génération 1",
    "Génération 2",
    "Génération 3",
    "Génération 4",
    "Génération 5",
    "Génération 6",
    "Génération 7",
    "Génération 8",
  ];

  const type = ["Feu", "Eau"];

  return (
    <div className="setting-filter-container">
      <MultipleSelectChip contentSelect={generation} nameContent="Génération" />
      <MultipleSelectChip contentSelect={type} nameContent="Type" />
      <p>
        Shiny:{" "}
        {
          <Switch
            {...label}
            checked={isShinyBattle}
            onChange={(event) => {
              setIsShinyBattle(event.target.checked);
            }}
          />
        }
      </p>
      <p>
        Forme de base:{" "}
        <Switch
          {...label}
          checked={isBaseForm}
          onChange={(event) => {
            setIsBaseForm(event.target.checked);
          }}
        />
      </p>
    </div>
  );
}
