import {
  AllAppsHeroesByRarity,
  GetAllAppsHeroesResponse,
  HeroId,
} from "@/services/heroes/types";

export const groupAllAppsHeroesByRarity = (
  allAppsHeroes: GetAllAppsHeroesResponse,
) => {
  const initialGroups = {} as AllAppsHeroesByRarity;

  return (
    Object.keys(allAppsHeroes) as Array<HeroId>
  ).reduce<AllAppsHeroesByRarity>((groups, heroId) => {
    const hero = allAppsHeroes[heroId as HeroId];
    const rarity = hero.rarity;
    const group = groups[rarity];
    const heroWithId = { ...hero, characterId: heroId };

    return {
      ...groups,
      [rarity]: group ? group.concat(heroWithId) : [heroWithId],
    };
  }, initialGroups);
};
