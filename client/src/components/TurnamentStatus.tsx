import { useBattle } from "../context/BattleProvider";

export default function TurnamentStatus({
  currentMatch,
}: { currentMatch: string | undefined }) {
  const { round, match } = useBattle();

  const checkRound = (currentRound: number) => {
    const roundArray = [
      "Finale",
      "Demi-finale",
      "Quart de finale",
      "8ème de finale",
      "16ème de finale",
      "32ème de finale",
    ];
    return roundArray[currentRound - 1];
  };

  return (
    <div id="battle-header">
      <h1>{checkRound(round)}</h1>
      <h2>
        Match {currentMatch} / {match}
      </h2>
    </div>
  );
}
