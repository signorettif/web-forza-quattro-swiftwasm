// Next.js and React
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";

// Constants
import { SETTINGS_ALLOWED } from "shared/config/settingsAllowed";

// Types
interface SettingsWidgetProps {
  settings: SettingsInterface;
  setSettings: Dispatch<SetStateAction<SettingsInterface>>;
}

// Styles
import styles from "styles/components/navbar.module.scss";
import cn from "classnames";

export const ToggleEngine = ({
  settings,
  setSettings,
}: SettingsWidgetProps) => {
  // Destructure currentEngine
  const { ENGINE: currentEngine } = settings;

  // Load audio
  const [onSound, setOnSound] = useState<HTMLAudioElement>();
  const [offSound, setOffSound] = useState<HTMLAudioElement>();

  // Only load on client-side beacuse Node.js has no Audio API (the browser does)
  useEffect(() => {
    setOnSound(new Audio("/media/switch-on.mp3"));
    setOffSound(new Audio("/media/switch-off.mp3"));
  }, []);

  // Event handler
  const handleChangeEngine = () => {
    // Play sound
    currentEngine === "javascript" ? onSound.play() : offSound.play();

    // Edit engine
    const newEngine = currentEngine === "javascript" ? "wasm" : "javascript";
    setSettings({
      ...settings,
      ENGINE: newEngine,
    });
  };

  return (
    <span
      onClick={handleChangeEngine}
      className={cn(styles.navbarComponent, styles.engineToggle)}
    >
      <Image
        src={`/images/engine-${currentEngine}.svg`}
        alt={`${currentEngine} logo icon`}
        height={14}
        width={14}
      />
    </span>
  );
};
