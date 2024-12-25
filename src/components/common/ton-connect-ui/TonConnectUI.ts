import { TonConnectUI } from "@tonconnect/ui";

let tonConnectInstance: TonConnectUI | null = null;

export const getTonConnectUI = () => {
  if (!tonConnectInstance) {
    tonConnectInstance = new TonConnectUI({
      manifestUrl: "https://taiga-labs.github.io/gorelko.json",
    });
  }
  return tonConnectInstance;
};
