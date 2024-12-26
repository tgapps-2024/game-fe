import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useModalVisibility } from "@/hooks/useModalVisibility";
import WalletIcon from "@/public/assets/svg/wallet.svg";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { FC, useEffect, useRef, useState } from "react";
import { LevelIndicator } from "./components/level-indicator/LevelIndicator";
import { ProfileBalance } from "./components/profile-balance/ProfileBalance";
import { ProfileHeader } from "./components/profile-header/ProfileHeader";
import { ProfileLink } from "./components/profile-link/ProfileLink";
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

  useEffect(() => {
    const loadData = async () => {
      if (webApp) {
        // Симуляция загрузки данных
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
    <div className="h-screen bg-settings-pattern overflow-y-auto overscroll-contain w-full">
      <div className="pt-10 flex flex-col items-center relative">
        <div className="h-34" />
        <div className="w-full">
          <div
            className={classNames(
              "bg-blue-800 rounded-t-[32px] transition-all duration-500 ease-in-out transform",
              isModalVisible ? "translate-y-0" : "translate-y-20"
            )}
          >
            <div className={classNames("p-4 pt-[78px] relative")}>
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
              <div
                className={classNames(
                  "w-full mb-6 h-14 pb-[3px] rounded-2xl bg-[#0655a4] overflow-hidden border border-black cursor-pointer group transition-all duration-300 ease-in-out",
                  "hover:scale-[0.98]",
                  { "bg-[rgb(27,48,68)]": address.length }
                )}
                onClick={() => (address ? handleDisconnect() : handleOpenTon())}
                ref={buttonRef}
              >
                <div
                  className={classNames(
                    "w-full h-full rounded-xl bg-[#0075ff] pb-1 shadow-inner-btn flex justify-center items-center p-[3px]",
                    {
                      "bg-[#1B3044] shadow-inner-btn": address.length,
                    }
                  )}
                >
                  <div
                    className={classNames(
                      "w-full h-full p-3 rounded-xl shadow-a flex items-center",
                      address.length
                        ? "justify-between bg-white/5"
                        : "justify-center bg-white/20"
                    )}
                  >
                    {address.length ? (
                      <>
                        <div className="w-full h-full flex flex-row text-sm leading-none gap-x-2 justify-start items-center">
                          <WalletIcon />
                          <p className="text-white leading-none tracking-wide flex items-center font-extrabold text-shadowed uppercase">
                            {t(
                              `${NS.PAGES.SETTINGS.WALLET.ROOT}.${NS.PAGES.SETTINGS.WALLET.TITLE}`
                            )}
                          </p>
                        </div>
                        <p className="text-white/30 text-nowrap font-black text-sm leading-none tracking-wide">
                          {`${address.slice(0, 5)}...${address.slice(-5)}`}
                        </p>
                      </>
                    ) : (
                      <p className="text-white text-lg text-nowrap leading-[19.8px] tracking-wide font-black text-stroke-half text-shadow uppercase">
                        {t(
                          `${NS.PAGES.SETTINGS.WALLET.ROOT}.${NS.PAGES.SETTINGS.WALLET.CONNECT_WALLET}`
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <ProfileBalance items={PROFILE_BALANCE_ITEMS} />
              <ProfileLink />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
