import type { StatsBarProps } from "../types/type";

export default function StatsBar({ statCategory, statKey }: StatsBarProps) {
  const statPercentage = (stat: number | undefined) => {
    if (stat === undefined) return "0";
    return `${Math.round((stat / 255) * 100)}`;
  };
  const translate = (key: string | undefined) => {
    if (key === "hp") {
      return "PV";
    }
    if (key === "attack") {
      return "Attaque";
    }
    if (key === "defense") {
      return "Défense";
    }
    if (key === "specialAttack") {
      return "Attaque Spé";
    }
    if (key === "specialDefense") {
      return "Défence Spé";
    }
    if (key === "speed") {
      return "Vitesse";
    }
  };
  return (
    <div className="details-stats">
      <div className="details-stats-attributes-container">
        <p className="details-stats-text">{translate(statKey)}</p>
        <p className="stats-level-number">{statCategory}</p>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${statPercentage(statCategory)}%` }}
        >
          {" "}
        </div>
      </div>
    </div>
  );
}
