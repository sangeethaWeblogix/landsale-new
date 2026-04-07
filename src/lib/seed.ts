export const getSessionSeed = () => {
  if (typeof window === "undefined") return null;

  let seed = sessionStorage.getItem("listing_seed");

  if (!seed) {
    seed = String(Math.floor(Math.random() * 999999));
    sessionStorage.setItem("listing_seed", seed);
  }

  return seed;
};
