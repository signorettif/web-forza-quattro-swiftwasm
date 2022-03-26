// Next.js and React
import { Dispatch, SetStateAction } from 'react';

// Constants
import { SETTINGS_ALLOWED } from 'shared/config/settingsAllowed';

// Types
interface SettingsWidgetProps {
  settings: SettingsInterface;
  setSettings: Dispatch<SetStateAction<SettingsInterface>>;
}

export const Difficulty = ({ settings, setSettings }: SettingsWidgetProps) => {
  // Destructure currentDepth
  const { MAX_DEPTH: currentDepth } = settings;

  // Event handler
  const handleChangeDepth = () => {
    const foundIndex =
      SETTINGS_ALLOWED.DEPTH.findIndex((depth) => depth === currentDepth) + 1;
    const newIndex =
      foundIndex < SETTINGS_ALLOWED.DEPTH.length ? foundIndex : 0;
    const newDepth = SETTINGS_ALLOWED.DEPTH[newIndex];
    setSettings({ ...settings, MAX_DEPTH: newDepth });
  };

  return (
    <span onClick={handleChangeDepth}>Nodes to explore: {currentDepth}</span>
  );
};
