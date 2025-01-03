/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  photo_url: WebApp;
}

export interface WebAppUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: true;
  added_to_attachment_menu?: true;
  allows_write_to_pm?: true;
  photo_url?: string;
}

interface ISettingsButton {
  isVisible: boolean;
  onClick(callback: () => void): SettingsButton;
  offClick(callback: () => void): SettingsButton;
  show(): SettingsButton;
  hide(): SettingsButton;
}

interface IWebAppInitData {
  query_id?: string;
  user?: WebAppUser;
  receiver?: WebAppUser;
  chat?: WebAppChat;
  chat_type?: "sender" | "private" | "group" | "supergroup" | "channel";
  chat_instance?: string;
  start_param?: string;
  can_send_after?: number;
  auth_date: number;
  hash: string;
}

interface IBackButton {
  isVisible: boolean;
  onClick(callback: () => void): BackButton;
  offClick(callback: () => void): BackButton;
  show(): void;
  hide(): void;
}

export enum NotificationEnum {
  ERROR = "error",
  SUCCESS = "success",
  WARNING = "warning",
}

export enum ImpactStyleEnum {
  LIGHT = "light",
  MEDIUM = "medium",
  HEAVY = "heavy",
  RIGID = "rigid",
  SOFT = "soft",
}

interface HapticFeedback {
  impactOccurred(style: ImpactStyleEnum): () => void;
  notificationOccurred(type: NotificationEnum): () => void;
  selectionChanged(): void;
}

export interface IWebApp {
  initData: string;
  initDataUnsafe: IWebAppInitData;
  version: string;
  platform: string;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;
  headerColor: string;
  backgroundColor: string;
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
  SettingsButton: ISettingsButton;
  HapticFeedback: HapticFeedback;
  lockOrientation: () => void;
  ready: () => void;
  requestFullscreen: () => void;
  BackButton: IBackButton;
}
