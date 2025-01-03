import { FC, useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useModalVisibility } from "@/hooks/useModalVisibility";
import WalletIcon from "@/public/assets/svg/wallet.svg";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";

import { LevelIndicator } from "./components/level-indicator/LevelIndicator";
import { ProfileBalance } from "./components/profile-balance/ProfileBalance";
import { ProfileHeader } from "./components/profile-header/ProfileHeader";
import { ProfileLink } from "./components/profile-link/ProfileLink";
import { TonDisconnectModal } from "./components/ton-disconnect-modal/TonDisconnectModal";
import { PROFILE_BALANCE_ITEMS } from "./constants";

const MOCK_DATA = {
  currentLevel: 32,
  progress: 43,
};

export const Settings: FC = () => {
  const t = useTranslations(NS.PAGES.SETTINGS.ROOT);
  const buttonRef = useRef(null);
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  const { isModalVisible } = useModalVisibility();
  const { webApp } = useTelegram();
  const [isLoading, setIsLoading] = useState(true);
  const [isTonDisconnectModalVisible, setTonDisconnectModalVisible] =
    useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (webApp) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
      } else {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
      }
    };

    loadData();
  }, [webApp]);

  if (!webApp || !webApp.initDataUnsafe?.user) {
    return null;
  }

  const handleOpenTon = () => {
    tonConnectUI?.openModal();
  };

  const handleDisconnect = () => {
    tonConnectUI?.disconnect();
  };

  const { first_name, photo_url } = webApp.initDataUnsafe.user;

  return (
    <div className="h-screen w-full overflow-y-auto overscroll-contain bg-settings-pattern">
      <div className="relative flex flex-col items-center pt-10">
        <div className="h-34" />
        <div className="w-full">
          <div
            className={classNames(
              "transform rounded-t-[32px] bg-blue-800 transition-all duration-500 ease-in-out",
              isModalVisible ? "translate-y-0" : "translate-y-20",
            )}
          >
            <div className={classNames("relative p-4 pt-[78px]")}>
              <ProfileHeader
                first_name={first_name}
                photo_url={photo_url || ""}
                isLoading={isLoading}
              />
              <LevelIndicator
                currentLevel={MOCK_DATA.currentLevel}
                progress={MOCK_DATA.progress}
                isLoading={isLoading}
              />
              <motion.div
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={classNames(
                  "group mb-6 h-14 w-full cursor-pointer overflow-hidden rounded-2xl border border-black bg-[#0655a4] pb-[3px]",
                  { "bg-[rgb(27,48,68)]": address.length },
                )}
                onClick={() =>
                  address ? setTonDisconnectModalVisible(true) : handleOpenTon()
                }
                ref={buttonRef}
              >
                <div
                  className={classNames(
                    "shadow-inner-btn flex h-full w-full items-center justify-center rounded-xl bg-[#0075ff] p-[3px] pb-1",
                    {
                      "shadow-inner-btn bg-[#1B3044]": address.length,
                    },
                  )}
                >
                  <div
                    className={classNames(
                      "shadow-a flex h-full w-full items-center rounded-xl p-3",
                      address.length
                        ? "justify-between bg-white/5"
                        : "justify-center bg-white/20",
                    )}
                  >
                    {address.length ? (
                      <>
                        <div className="flex h-full w-full flex-row items-center justify-start gap-x-2 text-sm leading-none">
                          <WalletIcon />
                          <p className="text-shadowed flex items-center font-extrabold uppercase leading-none tracking-wide text-white">
                            {t(
                              `${NS.PAGES.SETTINGS.WALLET.ROOT}.${NS.PAGES.SETTINGS.WALLET.TITLE}`,
                            )}
                          </p>
                        </div>
                        <p className="text-nowrap text-sm font-black leading-none tracking-wide text-white/30">
                          {`${address.slice(0, 5)}...${address.slice(-5)}`}
                        </p>
                      </>
                    ) : (
                      <p className="text-stroke-half text-nowrap text-lg font-black uppercase leading-[19.8px] tracking-wide text-white text-shadow">
                        {t(
                          `${NS.PAGES.SETTINGS.WALLET.ROOT}.${NS.PAGES.SETTINGS.WALLET.CONNECT_WALLET}`,
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
              <ProfileBalance items={PROFILE_BALANCE_ITEMS} />
              <ProfileLink />
            </div>
          </div>
        </div>
      </div>
      <TonDisconnectModal
        isOpen={isTonDisconnectModalVisible}
        onClose={() => setTonDisconnectModalVisible(false)}
        onDisconnect={handleDisconnect}
      />
    </div>
  );
};
