// Next.js and React
import { Dispatch, SetStateAction } from 'react';

// Components
import { WidgetFrame } from './WidgetFrame';

// Constants
import { SETTINGS_ALLOWED } from '../../../shared/config/settingsAllowed';

// Types
interface SettingsWidgetProps {
  settings: SettingsInterface;
  setSettings: Dispatch<SetStateAction<SettingsInterface>>;
}

export const SettingsWidget = ({
  settings,
  setSettings,
}: SettingsWidgetProps) => {
  // Event handlers
  const handleChangeDepth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings({ ...settings, MAX_DEPTH: Number(e.target.value) });
  };

  // Event handlers
  const handleChangeEngine = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings({
      ...settings,
      ENGINE: e.target.value as 'javascript' | 'wasm',
    });
  };

  return (
    <WidgetFrame title="⚙️ Settings" className="mt-6">
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
    </WidgetFrame>
  );
};
