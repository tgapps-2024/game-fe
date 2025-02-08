import { AxiosError } from "axios";

import { useQuery } from "@tanstack/react-query";

import {
  getAllAppsHeroes,
  getAllHeroes,
  getHero,
} from "./fetcher";
import {
  GetAllAppsHeroesResponse,
  HeroId,
  IHeroInfo,
} from "./types";

export enum QueryKeys {
  GET_HERO = "GET_HERO",
  GET_ALL_HEROES = "GET_ALL_HEROES",
  GET_ALL_APPS_HEROES = "GET_ALL_APPS_HEROES",
}

export const useGetHero = (heroId?: HeroId) =>
  useQuery<IHeroInfo, AxiosError>({
    queryKey: [QueryKeys.GET_HERO, heroId],
    queryFn: () => getHero(heroId),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

export const useGetAllHeroes = (enabled: boolean) =>
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
