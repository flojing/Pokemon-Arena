import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Info, X } from "lucide-react";
import "../styles/PokemonBattleCard.css";
import PokedexDetails from "../pages/PokedexDetails";
import type { PokemonBattleCardProps } from "../types/type";

export default function PokemonBattleCard({
  id,
  name,
  img,
  type,
  description,
}: PokemonBattleCardProps) {
  return (
    <div className="pokemon-battle-card-container">
      <div className="pokemon-detail-card-container">
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
        <div className="pokemon-battle-card-description">
          <p>
            <b className="bold-text">Type</b> : {type?.join(" / ")}
          </p>
          <p>
            <b className="bold-text">Description</b> : {description}
          </p>
        </div>
      </div>
    </div>
  );
}
