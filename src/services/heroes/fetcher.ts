import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import {
  CharacterId,
  GetAllAppsCharactersResponse,
  GetAllCharactersResponse,
  ICharacterIdentity,
  ICharacterInfo,
} from "./types";

export const getCharacter = async (
  characterId?: CharacterId,
): Promise<ICharacterInfo> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_CHARACTER, {
    params: { idCharacter: characterId },
  });

  return data;
};

export const getAllCharacters = async (): Promise<ICharacterIdentity[]> => {
  const { data } = await apiClient.get<GetAllCharactersResponse>(
    API_ENDPOINTS.GET.GET_ALL_CHARACTERS,
  );

  return data.characters;
};

export const getAllAppsCharacters =
  async (): Promise<GetAllAppsCharactersResponse> => {
    const { data } = await apiClient.get<GetAllAppsCharactersResponse>(
      API_ENDPOINTS.GET.GET_ALL_APPS_CHARACTERS,
    );

    return data;
  };
