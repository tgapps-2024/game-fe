import { AxiosError } from "axios";

import { useQuery } from "@tanstack/react-query";

import { getAllCharacters, getCharacter } from "./fetcher";
import { CharacterId, ICharacter } from "./types";

export enum QueryKeys {
  GET_CHARACTER = "GET_CHARACTER",
  GET_ALL_CHARACTERS = "GET_ALL_CHARACTERS",
}

export const useGetCharacter = (characterId?: CharacterId) =>
  useQuery<ICharacter, AxiosError>({
    queryKey: [QueryKeys.GET_CHARACTER, characterId],
    queryFn: () => getCharacter(characterId),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

export const useGetAllCharacters = () =>
  useQuery<ICharacter[], AxiosError>({
    queryKey: [QueryKeys.GET_ALL_CHARACTERS],
    queryFn: () => getAllCharacters(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
