import { LocaleSwitcher } from "@/components/common/language-switcher/LanguageSwitcher";
import { Checkbox } from "@/components/ui/checkbox";
import { LOCALES } from "@/constants/locale";
import { NS } from "@/constants/ns";
import { useSettings } from "@/context";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { FC } from "react";

export const Language: FC = () => {
  const t_settings = useTranslations(NS.PAGES.SETTINGS.ROOT);
  const { route, locale } = useRouter();
  const {
    settings: { vibrations },
  } = useSettings();

  const handleLanguageChange = () => {
    if (vibrations) {
      window.Telegram.WebApp.HapticFeedback.selectionChanged();
    }
  };

  return (
    <div className="w-full h-max flex flex-col gap-y-5">
      <h2 className="text-xl font-black text-shadowed bold-stroke">
        {t_settings(
          `${NS.PAGES.SETTINGS.LANGUAGE.ROOT}.${NS.PAGES.SETTINGS.LANGUAGE.TITLE}`
        )}
      </h2>
      <div className="w-full min-h-[70px] flex flex-col gap-y-[14px]">
        <LocaleSwitcher route={route} locale={LOCALES.RU}>
          <div
            className="w-full flex flex-row justify-between items-center cursor-pointer"
            onClick={() => handleLanguageChange()}
          >
            <p className="text-base font-medium text-white">Русский</p>
            <Checkbox className="size-6" checked={locale === LOCALES.RU} />
          </div>
        </LocaleSwitcher>
        <LocaleSwitcher route={route} locale={LOCALES.EN}>
          <div
            className="w-full flex flex-row justify-between items-center cursor-pointer"
            onClick={() => handleLanguageChange()}
          >
            <p className="text-base font-medium text-white">English</p>
            <Checkbox className="size-6" checked={locale === LOCALES.EN} />
          </div>
        </LocaleSwitcher>
      </div>
    </div>
  );
};
