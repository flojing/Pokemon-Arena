let scrollPosition = 0;

export const disableScroll = (): void => {
  scrollPosition = window.scrollY; // Capture la position actuelle
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = "100%"; // Éviter tout décalage horizontal
};

export const enableScroll = (): void => {
  document.body.style.position = "";
  document.body.style.top = "";
  window.scrollTo(0, scrollPosition); // Restaurer la position initiale
};
