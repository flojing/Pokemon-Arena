import { useBattle } from "../contexts/BattleProvider";
import { typeTranslation } from "../services/arrays";
import { typeColor } from "../services/battleCardBackgroundColor";
import "../styles/GenerationTypeFilter.css";
import type { GenerationTypeFilterProps, TypeLanguage } from "../types/type";

export default function GenerationTypeFilter({
  array,
  name,
}: GenerationTypeFilterProps) {
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
                      typeTranslation.find(
                        (element: TypeLanguage) => element.fr === elem,
                      )?.en || ""
                    ].background,
                  border:
                    typeColor[
                      typeTranslation.find(
                        (element: TypeLanguage) => element.fr === elem,
                      )?.en || ""
                    ].border,
                  color:
                    typeColor[
                      typeTranslation.find(
                        (element: TypeLanguage) => element.fr === elem,
                      )?.en || ""
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
