import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import { CharacterId, GetAllCharactersResponse, ICharacter } from "./types";

export const getCharacter = async (
  characterId?: CharacterId,
): Promise<ICharacter> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_CHARACTER, {
    params: { idCharacter: characterId ?? "null" },
  });

  return data;
};

export const getAllCharacters = async (): Promise<ICharacter[]> => {
  const { data } = await apiClient.get<GetAllCharactersResponse>(API_ENDPOINTS.GET.GET_ALL_CHARACTERS);

  return data.characters;
};
