import CoinSVG from "@/public/assets/svg/assignments/coin.svg";
import StarAssignmentSVG from "@/public/assets/svg/assignments/share.svg";
import TelegramSVG from "@/public/assets/svg/assignments/telegram.svg";
import ThunderSVG from "@/public/assets/svg/assignments/thunder.svg";
import ChestSVG from "@/public/assets/svg/chest-light.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { TaskRewardType, TaskType } from "@/services/tasks/types";

export const ASSIGNMENTS_ICONS = {
  [TaskType.TON_PROMOTE]: CoinSVG,
  [TaskType.STORIES_REPLY]: StarAssignmentSVG,
  [TaskType.ADD_TO_HOME]: ThunderSVG,
  [TaskType.SOCIAL_SUB]: TelegramSVG,
  [TaskType.EMOJI_SET]: ThunderSVG,
  [TaskType.DONATE]: CoinSVG,
  [TaskType.WALLET_CONNECT]: CoinSVG,
  [TaskType.BOOST_CHANNEL]: TelegramSVG,
};

export const REWARD_ICONS = {
  [TaskRewardType.COINS]: StarSVG,
  [TaskRewardType.CHEST]: ChestSVG,
};
