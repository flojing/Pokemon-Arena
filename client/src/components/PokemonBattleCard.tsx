import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Info, X } from "lucide-react";
import "../styles/PokemonBattleCard.css";
import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import PokedexDetails from "../pages/PokedexDetails";
import { typeColor } from "../services/battleCardBackgroundColor";
import { getPokemonTypesTranslation } from "../services/getApi";
import type { Data, PokemonBattleCardProps, TypeColor } from "../types/type";

export default function PokemonBattleCard({
  id,
  name,
  img,
}: PokemonBattleCardProps) {
  const [type, setType] = useState<keyof TypeColor>("normal");
  const data = useRouteLoaderData("data") as Data[];
  const pokemon = data.find((element) => element.id === id);
  const pokemonType = pokemon?.type?.[0];

  useEffect(() => {
    const getType = async () => {
      const responseType = await getPokemonTypesTranslation(pokemonType, "en");
      setType(responseType.toLowerCase());
    };
    getType();
  }, [pokemonType]);

  return (
    <div className="pokemon-battle-card-container">
      <div className="pokemon-detail-card-container" style={typeColor[type]}>
        <div className="pokemon-battle-card-title">
          <p>{name}</p>
          <DialogPrimitive.Root>
            <DialogPrimitive.Trigger asChild>
              <button type="button" className="info-button">
                <Info className="pokemon-battle-card-logo-info" />
              </button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="modal-overlay" />
              <DialogPrimitive.Content className="modal-content">
                <DialogPrimitive.Close className="modal-close">
                  <X className="h-4 w-4" />
                </DialogPrimitive.Close>
                <PokedexDetails idBattle={id} isBattle={true} />
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
        <img src={img} className="pokemon-battle-card-img" alt="" />
      </div>
    </div>
  );
}
