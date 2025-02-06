import {
  AllAppsCharactersByRarity,
  CharacterId,
  GetAllAppsCharactersResponse,
} from "@/services/heroes/types";

export const groupAllAppsCharactersByRarity = (
  allAppsCharacters: GetAllAppsCharactersResponse,
) => {
  const initialGroups = {} as AllAppsCharactersByRarity;

  return (
    Object.keys(allAppsCharacters) as Array<CharacterId>
  ).reduce<AllAppsCharactersByRarity>((groups, characterId) => {
    const character = allAppsCharacters[characterId as CharacterId];
    const rarity = character.rarity;
    const group = groups[rarity];
    const characterWithId = { ...character, characterId };

    return {
      ...groups,
      [rarity]: group ? group.concat(characterWithId) : [characterWithId],
    };
  }, initialGroups);
};
