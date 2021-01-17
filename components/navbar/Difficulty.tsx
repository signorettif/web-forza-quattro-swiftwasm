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

export const Difficulty = ({ settings, setSettings }: SettingsWidgetProps) => {
  // Event handler
  const handleChangeDepth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings({ ...settings, MAX_DEPTH: Number(e.target.value) });
  };

  return (
    <span className={styles.navbarComponent}>
      <select
        name="depth"
        onChange={handleChangeDepth}
        value={settings.MAX_DEPTH}
        className="w-full text-black mt-6"
      >
        {SETTINGS_ALLOWED.DEPTH.map((setting) => (
          <option value={setting} key={setting}>
            {setting}
          </option>
        ))}
      </select>
    </span>
  );
};
