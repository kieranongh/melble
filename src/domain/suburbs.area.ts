import { suburbs } from "./suburbs.position";

export const areas: Record<string, number> = suburbs.reduce(
  (acc, suburb) => ({ ...acc, [suburb.code]: 9999 }),
  {}
);
