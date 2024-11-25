import { Collapse, Switch, alpha } from "@mui/material";
import "../styles/SettingFilter.css";
import styled from "@emotion/styled";
import { useState } from "react";
import { useBattle } from "../contexts/BattleProvider";
import GenerationTypeFilter from "./GenerationTypeFilter";

const CustomSwitch = styled(Switch)({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#4d3a8c",
    transform: "translateX(20px)",
    "&:hover": {
      backgroundColor: alpha("#4d3a8c", 0.05),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#4d3a8c",
  },
});

export default function SettingFilter() {
  const label = { inputProps: { "aria-label": "Color switch demo" } };
  const [isGeneration, setIsGeneration] = useState(false);
  const [isType, setIsType] = useState(false);
  const {
    isBaseForm,
    setIsBaseForm,
    isShinyBattle,
    setIsShinyBattle,
    setGenerationName,
    setTypeName,
  } = useBattle();

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

  const type = [
    "Plante",
    "Poison",
    "Feu",
    "Vol",
    "Eau",
    "Insecte",
    "Normal",
    "Électrik",
    "Sol",
    "Fée",
    "Combat",
    "Psy",
    "Roche",
    "Acier",
    "Glace",
    "Spectre",
    "Dragon",
    "Ténèbres",
  ];

  const handleClickReset = () => {
    setGenerationName([]);
    setTypeName([]);
    setIsBaseForm(false);
    setIsShinyBattle(false);
  };

  return (
    <div className="setting-filter-container">
      <div className="setting-filter-container-reset">
        <p
          className="setting-filter-button setting-filter-title"
          onClick={() => setIsGeneration(!isGeneration)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setIsGeneration(!isGeneration);
          }}
        >
          Génération{" "}
          <img
            className="setting-filter-img-button"
            src={
              !isGeneration
                ? "/src/assets/images/down.svg"
                : "/src/assets/images/up.svg"
            }
            alt="up"
            style={{ fill: "#4d3a8c" }}
          />
        </p>
        <div
          className="setting-filter-reset-button"
          onClick={handleClickReset}
          onKeyDown={handleClickReset}
        >
          <img
            src="/src/assets/images/restart.svg"
            alt=""
            style={{ width: "17px" }}
          />
          Reset
        </div>
      </div>
      <Collapse in={isGeneration}>
        <GenerationTypeFilter array={generation} name="generation" />
      </Collapse>

      <p
        className="setting-filter-button setting-filter-title"
        onClick={() => setIsType(!isType)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setIsType(!isType);
        }}
      >
        Type{" "}
        <img
          className="setting-filter-img-button"
          src={
            !isType
              ? "/src/assets/images/down.svg"
              : "/src/assets/images/up.svg"
          }
          alt="up"
          style={{ fill: "#4d3a8c" }}
        />
      </p>
      <Collapse in={isType}>
        <GenerationTypeFilter array={type} name="type" />
      </Collapse>
      <p className="setting-filter-title">
        Mode Shiny:{" "}
        {
          <CustomSwitch
            {...label}
            checked={isShinyBattle}
            onChange={(event) => {
              setIsShinyBattle(event.target.checked);
            }}
          />
        }
      </p>
      <p className="setting-filter-title">
        Forme de base:{" "}
        <CustomSwitch
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
