import { types } from "./arrays";

export const formatedType = (url: string) => {
  const numberOfType: number =
    Number(
      url
        .split("")
        .filter((_, index) => {
          if (url.length === 33) {
            return index === 31;
          }
          if (url.length === 34) {
            return index === 31 || index === 32;
          }
        })
        .join(""),
    ) - 1;
  return types[numberOfType];
};
