// Next.js and React
import { Dispatch, SetStateAction } from "react";

// Constants
import { SETTINGS_ALLOWED } from "shared/config/settingsAllowed";

// Types
interface SettingsWidgetProps {
  settings: SettingsInterface;
  setSettings: Dispatch<SetStateAction<SettingsInterface>>;
}

// Styles
import styles from "styles/components/navbar.module.scss";

export const ToggleEngine = ({
  settings,
  setSettings,
}: SettingsWidgetProps) => {
  // Event handler
  const handleChangeEngine = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings({
      ...settings,
      ENGINE: e.target.value as "javascript" | "wasm",
    });
  };

  return (
    <span className={styles.navbarComponent}>
      <select
        name="engine"
        onChange={handleChangeEngine}
        value={settings.ENGINE}
        className="w-full text-black mt-6"
      >
        {SETTINGS_ALLOWED.ENGINE.map((setting) => (
          <option value={setting} key={setting}>
            {setting}
          </option>
        ))}
      </select>
    </span>
  );
};
