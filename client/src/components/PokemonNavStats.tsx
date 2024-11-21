import type { PokemonNavStatsProps } from "../types/type";

export default function PokemonNavStats({ stats }: PokemonNavStatsProps) {
  const statPercentage = (stat: number | undefined) => {
    if (stat === undefined) return "0";
    return `${Math.round((stat / 255) * 100)}`;
  };
  return (
    <div className="details-stats-container">
      <div className="details-stats">
        <div className="details-stats-attributes-container">
          <p className="details-stats-text">PV</p>
          <p className="stats-level-number">{stats?.hp}</p>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${statPercentage(stats?.hp)}%` }}
          >
            {" "}
          </div>
        </div>
      </div>
      <div className="details-stats">
        <div className="details-stats-attributes-container">
          <p className="details-stats-text">Attaque</p>
          <p className="stats-level-number">{stats?.attack}</p>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${statPercentage(stats?.attack)}%` }}
          >
            {" "}
          </div>
        </div>
      </div>
      <div className="details-stats">
        <div className="details-stats-attributes-container">
          <p className="details-stats-text">Défense</p>
          <p className="stats-level-number">{stats?.defense}</p>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${statPercentage(stats?.defense)}%` }}
          >
            {" "}
          </div>
        </div>
      </div>
      <div className="details-stats">
        <div className="details-stats-attributes-container">
          <p className="details-stats-text">Attaque spé</p>
          <p className="stats-level-number">{stats?.specialAttack}</p>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${statPercentage(stats?.specialAttack)}%` }}
          >
            {" "}
          </div>
        </div>
      </div>
      <div className="details-stats">
        <div className="details-stats-attributes-container">
          <p className="details-stats-text">Défense spé</p>
          <p className="stats-level-number">{stats?.specialDefense}</p>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${statPercentage(stats?.specialDefense)}%` }}
          >
            {" "}
          </div>
        </div>
      </div>
      <div className="details-stats">
        <div className="details-stats-attributes-container">
          <p className="details-stats-text">Vitesse</p>
          <p className="stats-level-number">{stats?.speed}</p>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${statPercentage(stats?.speed)}%` }}
          >
            {" "}
          </div>
        </div>
      </div>
    </div>
  );
}
