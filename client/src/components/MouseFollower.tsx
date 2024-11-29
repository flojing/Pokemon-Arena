import { useEffect, useState } from "react";

export default function MouseFollower({ id }: { id: number | undefined }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: { clientX: number; clientY: number }) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const smoothing = 0.1;
    const x = smoothPosition.x + (position.x - smoothPosition.x) * smoothing;
    const y = smoothPosition.y + (position.y - smoothPosition.y) * smoothing;

    const animationFrame = requestAnimationFrame(() => {
      setSmoothPosition({ x, y });
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [position, smoothPosition]);

  return (
    <div
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`}
        alt="Suiveur de souris"
        style={{
          width: "70%",
          height: "auto",
        }}
      />
    </div>
  );
}
