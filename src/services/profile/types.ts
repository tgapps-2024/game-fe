export interface IProfile {
  coins: number;
  stars: number;
  reward_per_hour: number;
  reward_per_tap: number;
  character: {
    current: number;
    hat: number;
    glass: number;
    chain: number;
    watch: number;
    kit: number;
  };
  energy: number;
  max_energy: number;
  exp: number;
  level: number;
  background: number;
  auto: number;
  haveBattlePass: boolean;
}
