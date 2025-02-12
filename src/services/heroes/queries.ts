import { AxiosError } from "axios";

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import {
  buyHero,
  getAllAppsHeroes,
  getAllHeroes,
  getClothHero,
  getHero,
  setHero,
} from "./fetcher";
import {
  GetAllAppsHeroesResponse,
  HeroId,
  IHeroInfo,
  IOwnHeroCloth,
} from "./types";

export enum QueryKeys {
  GET_HERO = "GET_HERO",
  GET_ALL_HEROES = "GET_ALL_HEROES",
  GET_ALL_APPS_HEROES = "GET_ALL_APPS_HEROES",
  SET_HERO = "SET_HERO",
  BUY_HERO = "BUY_HERO",
  GET_CLOTH_HERO = "GET_CLOTH_HERO",
}

export const useGetHero = (heroId?: HeroId) =>
  useQuery<IHeroInfo, AxiosError>({
    queryKey: [QueryKeys.GET_HERO, heroId],
    queryFn: () => getHero(heroId),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

export const useSetHero = (
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) =>
  useMutation({
    mutationKey: [QueryKeys.SET_HERO],
    mutationFn: setHero,
    onSuccess,
    onError,
  });

export const useGetAllHeroes = (enabled?: boolean) =>
  useQuery<HeroId[], AxiosError>({
    queryKey: [QueryKeys.GET_ALL_HEROES],
    queryFn: () => getAllHeroes(),
    retry: false,
    enabled,
    staleTime: 1000 * 60 * 5,
  });

export const useGetAllAppsHeroes = () =>
  useQuery<GetAllAppsHeroesResponse, AxiosError>({
    queryKey: [QueryKeys.GET_ALL_APPS_HEROES],
    queryFn: () => getAllAppsHeroes(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

export const useBuyHero = (
  onSuccess?: (heroId: HeroId) => void,
  onError?: (error: AxiosError) => void,
) =>
  useMutation<HeroId, AxiosError, HeroId>({
    mutationKey: [QueryKeys.BUY_HERO],
    mutationFn: buyHero,
    onSuccess,
    onError,
  });

export const updateGetAllHeroesQuery = (
  queryClient: QueryClient,
  heroId: HeroId,
) => {
  queryClient.setQueryData(
    [QueryKeys.GET_ALL_HEROES],
    (oldHeroes: HeroId[]) => [...oldHeroes, heroId],
  );
};

/* Heroes Cloth Shop */
export const useGetClothHeroQuery = (heroId?: HeroId) =>
  useQuery<IOwnHeroCloth, AxiosError>({
    queryKey: [QueryKeys.GET_CLOTH_HERO, heroId],
    queryFn: () => getClothHero(heroId!), // it's enabled only when heroId is defined
    retry: false,
    enabled: !!heroId,
    staleTime: 1000 * 60 * 5,
  });
