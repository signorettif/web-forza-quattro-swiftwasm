// Next.js and React.js stuff
import Head from "next/head";
import { useEffect, useState } from "react";

// Game stuff
import GameUtils from "../shared/gameHelpers/GameUtils";

// Components
import { Difficulty } from "components/navbar/Difficulty";
import { ToggleEngine } from "components/navbar/ToggleEngine";
import { AIStats } from "components/navbar/AIStats";
import { InputSection } from "../components/board/InputSection";
import { OutputSection } from "../components/board/OutputSection";

// Constants
import { CONSTANTS } from "../shared/config/constants";
import { loadWasmUtil } from "../shared/utils/loadWASM";

// Styles
import styles from "styles/pages/quattro.module.scss";

// Main functional component
export default function Home() {
  const [gameState, setGameState] = useState(GameUtils.startGame());
  const [settings, setSettings] = useState<SettingsInterface>({
    ENGINE: "javascript",
    MAX_DEPTH: CONSTANTS.MAX_DEPTH,
  });
  const [modelLoaded, setModelLoaded] = useState(false);
  const [WASMFn, setWASMFn] = useState<any>(undefined);
  const winner = GameUtils.winner(gameState);

  // Loads wasm file if setting is changed in engine
  useEffect(() => {
    if (settings.ENGINE === "wasm") {
      const fetchFn = async () => {
        const myFunc = await loadWasmUtil();

        const whatToLog = myFunc(gameState.board, gameState.player);

        console.log(whatToLog);
      };

      fetchFn();
      console.log("[WASM] Loaded WASM model");
    }
  }, [settings.ENGINE, gameState]);

  // If the AI is called to play, then play
  useEffect(() => {
    if (gameState.player === CONSTANTS.AI_PLAYER) {
      setGameState(() =>
        GameUtils.playAIBestNextMove(gameState, settings.MAX_DEPTH)
      );
    }

    // if (settings.ENGINE === 'wasm' && WASMFn) {
    //   console.log(WASMFn(gameState.board, gameState.player));
    // }
  }, [gameState.player]);

  // Winner modal
  useEffect(() => {}, [winner]);

  return (
    <>
      <Head>
        <title>Connect 4 | WASM benchmarking</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <nav>
          <h1>Connect 4</h1>
          <div>
            <AIStats gameState={gameState} />
            <Difficulty settings={settings} setSettings={setSettings} />
            <ToggleEngine settings={settings} setSettings={setSettings} />
          </div>
        </nav>

        <div className={styles.belowNavbar}>
          <main>
            <InputSection gameState={gameState} setGameState={setGameState} />
            <OutputSection gameState={gameState} />
          </main>

          <footer>
            <p>Made w/ ❤️ in Milan. Source code available on Github.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
