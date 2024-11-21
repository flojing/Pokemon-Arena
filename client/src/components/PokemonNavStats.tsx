import type { PokemonNavStatsProps } from "../types/type";
import StatsBar from "./StatsBar";

export default function PokemonNavStats({ stats }: PokemonNavStatsProps) {
  if (!stats) return null;
  return (
    <div className="details-stats-container">
      {Object.entries(stats).map(([key, elem]) => (
        <StatsBar statCategory={elem} key={Number(key)} statKey={key} />
      ))}
    </div>
  );
}
