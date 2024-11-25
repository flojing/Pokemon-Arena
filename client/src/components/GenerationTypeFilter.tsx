import { useBattle } from "../contexts/BattleProvider";
import { typeColor } from "../services/battleCardBackgroundColor";
import "../styles/GenerationTypeFilter.css";
import type { GenerationTypeFilterProps } from "../types/type";

export default function GenerationTypeFilter({
  array,
  name,
}: GenerationTypeFilterProps) {
  const typeTranslation = {
    Plante: "grass",
    Poison: "poison",
    Feu: "fire",
    Vol: "flying",
    Eau: "water",
    Insecte: "bug",
    Normal: "normal",
    Électrik: "electric",
    Sol: "ground",
    Fée: "fairy",
    Combat: "fighting",
    Psy: "psychic",
    Roche: "rock",
    Acier: "steel",
    Glace: "ice",
    Spectre: "ghost",
    Dragon: "dragon",
    Ténèbres: "dark",
  } as const;

  const { generationName, setGenerationName, typeName, setTypeName } =
    useBattle();

  const handleClickElement = (element: string) => {
    if (name === "generation") {
      if (!generationName.includes(element)) {
        setGenerationName((prev) => [...prev, element]);
      } else {
        setGenerationName((prev) => {
          const newArray = prev.filter((elem) => elem !== element);
          return newArray;
        });
      }
    } else if (name === "type") {
      if (!typeName.includes(element)) {
        setTypeName((prev) => [...prev, element]);
      } else {
        setTypeName((prev) => {
          const newArray = prev.filter((elem) => elem !== element);
          return newArray;
        });
      }
    }
  };
  return (
    <div className="generation-filter-container">
      {array.map((elem: string) => (
        <p
          key={elem}
          onClick={() => {
            handleClickElement(elem);
          }}
          onKeyDown={() => {
            handleClickElement(elem);
          }}
          className={
            generationName.includes(elem)
              ? "generation-type-filter-element-active"
              : "generation-type-filter-element"
          }
          style={
            typeName.includes(elem) && name === "type"
              ? {
                  background:
                    typeColor[
                      typeTranslation[elem as keyof typeof typeTranslation]
                    ].background,
                  border:
                    typeColor[
                      typeTranslation[elem as keyof typeof typeTranslation]
                    ].border,
                  color:
                    typeColor[
                      typeTranslation[elem as keyof typeof typeTranslation]
                    ].color,
                }
              : {}
          }
        >
          {elem}
        </p>
      ))}
    </div>
  );
}
