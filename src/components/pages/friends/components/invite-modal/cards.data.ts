import { CardType } from "@/components/common";

export const CARDS = [
  { buttonText: "Купить", number: 5, badgeValue: 1450 },
  { buttonText: "Купить", number: 25, badgeValue: 1450 },
  { buttonText: "Купить", number: 100, badgeValue: 1450 },
  { buttonText: "Купить", number: 250, badgeValue: 1450 },
  {
    buttonText: "Скидка",
    number: 1000,
    badgeValue: 1450,
    type: CardType.INDIGO,
  },
  {
    buttonText: "Скидка",
    number: 5000,
    badgeValue: 1450,
    type: CardType.ORANGE,
  },
];
