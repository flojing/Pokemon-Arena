import { Collapse, Switch, alpha } from "@mui/material";
import "../styles/SettingFilter.css";
import styled from "@emotion/styled";
import { useState } from "react";
import downImg from "/src/assets/images/down.svg";
import restartImg from "/src/assets/images/restart.svg";
import upImg from "/src/assets/images/up.svg";
import { useBattle } from "../contexts/BattleProvider";
import { generation, types } from "../services/arrays";
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

export default function SettingFilter({ filter }: { filter: string }) {
  const label = { inputProps: { "aria-label": "Color switch demo" } };
  const [isGeneration, setIsGeneration] = useState(false);
  const [isType, setIsType] = useState(false);
  const { isBaseForm, setIsBaseForm, isShinyBattle, setIsShinyBattle, reset } =
    useBattle();

  const handleClickReset = () => {
    reset();
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
            src={!isGeneration ? downImg : upImg}
            alt="up"
            style={{ fill: "#4d3a8c" }}
          />
        </p>
        <div
          className="setting-filter-reset-button"
          onClick={handleClickReset}
          onKeyDown={handleClickReset}
        >
          <img src={restartImg} alt="" style={{ width: "17px" }} />
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
          src={!isType ? downImg : upImg}
          alt="up"
          style={{ fill: "#4d3a8c" }}
        />
      </p>
      <Collapse in={isType}>
        <GenerationTypeFilter array={types} name="type" />
      </Collapse>
      {filter === "battle" && (
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
      )}
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
