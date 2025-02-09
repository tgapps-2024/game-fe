import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import {
  GetAllAppsHeroesResponse,
  GetAllHeroesResponse,
  HeroId,
  IHeroInfo,
} from "./types";

export const getHero = async (heroId?: HeroId): Promise<IHeroInfo> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_HERO, {
    params: { idCharacter: heroId },
  });

  return data;
};

export const setHero = async (heroId?: HeroId): Promise<void> => {
  await apiClient.post(API_ENDPOINTS.POST.SET_HERO, {
    idCharacter: heroId,
  });
};

export const getAllHeroes = async (): Promise<HeroId[]> => {
  const { data } = await apiClient.get<GetAllHeroesResponse>(
    API_ENDPOINTS.GET.GET_ALL_HEROES,
  );

  return data.characters;
};

export const getAllAppsHeroes = async (): Promise<GetAllAppsHeroesResponse> => {
  const { data } = await apiClient.get<GetAllAppsHeroesResponse>(
    API_ENDPOINTS.GET.GET_ALL_APPS_HEROES,
  );

  return data;
};

export const buyHero = async (heroId?: HeroId): Promise<void> => {
  await apiClient.post(API_ENDPOINTS.POST.BUY_HERO, {
    idCharacter: heroId,
  });
};
