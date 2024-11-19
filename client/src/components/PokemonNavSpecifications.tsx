import type React from "react";

interface PokemonNavSpecificationsProps {
  description?: string;
  height?: number;
  weight?: number;
  handleClickPlayCry: () => void;
  cryIcon: string;
}

const PokemonNavSpecifications: React.FC<PokemonNavSpecificationsProps> = ({
  description,
  height,
  weight,
  handleClickPlayCry,
  cryIcon,
}) => {
  return (
    <div className="details-components-container">
      <p className="details-description">
        <b className="bold-text">Description</b> : {description}
      </p>
      <div className="details-body-container">
        <div className="height-weight-container">
          <p className="details-height">
            <b className="bold-text">Taille</b> : {height} m
          </p>
          <p className="details-weight">
            <b className="bold-text">Poids</b> : {weight} Kg
          </p>
        </div>

        <img
          onKeyDown={handleClickPlayCry}
          onClick={handleClickPlayCry}
          className="cry-icon"
          src={cryIcon}
          alt=""
        />
      </div>
    </div>
  );
};

export default PokemonNavSpecifications;
