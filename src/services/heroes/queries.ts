import { AxiosError } from "axios";

import { useQuery } from "@tanstack/react-query";

import {
  getAllAppsCharacters,
  getAllCharacters,
  getCharacter,
} from "./fetcher";
import {
  CharacterId,
  GetAllAppsCharactersResponse,
  ICharacterIdentity,
  ICharacterInfo,
} from "./types";

export enum QueryKeys {
  GET_CHARACTER = "GET_CHARACTER",
  GET_ALL_CHARACTERS = "GET_ALL_CHARACTERS",
  GET_ALL_APPS_CHARACTERS = "GET_ALL_APPS_CHARACTERS",
  GET_ALL_APPS_CHARACTERS_BY_RARITY = "GET_ALL_APPS_CHARACTERS_BY_RARITY",
}

export const useGetCharacter = (characterId?: CharacterId) =>
  useQuery<ICharacterInfo, AxiosError>({
    queryKey: [QueryKeys.GET_CHARACTER, characterId],
    queryFn: () => getCharacter(characterId),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

export const useGetAllCharacters = () =>
  useQuery<ICharacterIdentity[], AxiosError>({
    queryKey: [QueryKeys.GET_ALL_CHARACTERS],
    queryFn: () => getAllCharacters(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

export const useGetAllAppsCharacters = () =>
  useQuery<GetAllAppsCharactersResponse, AxiosError>({
    queryKey: [QueryKeys.GET_ALL_APPS_CHARACTERS],
    queryFn: () => getAllAppsCharacters(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
