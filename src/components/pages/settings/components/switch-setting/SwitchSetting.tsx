import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/context";
import { FC } from "react";

type SwitchSettingProps = {
  settingKey: "sound" | "vibrations";
};

export const SwitchSetting: FC<SwitchSettingProps> = ({ settingKey }) => {
  const { settings } = useSettings();

  return (
    <div className="h-fit flex flex-grow flex-row justify-end items-center">
      <Switch
        className="w-6.5 h-4"
        checked={settings[settingKey]}
        disabled={settingKey === "sound"}
      />
    </div>
  );
};
