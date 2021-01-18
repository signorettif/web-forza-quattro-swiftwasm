// Next.js and React.js stuff
import Head from "next/head";
import { useEffect, useState } from "react";

// Game stuff
import GameUtils from "shared/gameHelpers/GameUtils";
import GameState from "shared/gameHelpers/GameState";

// Components
import { Difficulty } from "components/navbar/Difficulty";
import { ToggleEngine } from "components/navbar/ToggleEngine";
import { OutputSection } from "components/board/OutputSection";

// Constants
import { CONSTANTS } from "shared/config/constants";
import { loadWasmUtil } from "shared/utils/loadWASM";

// Styles
import styles from "styles/pages/quattro.module.scss";
import navbarStyles from "styles/components/navbar.module.scss";
import cn from "classnames";

// Main functional component
export default function Home() {
  const [gameState, setGameState] = useState(GameUtils.startGame());
  const [settings, setSettings] = useState<SettingsInterface>({
    ENGINE: "javascript",
    MAX_DEPTH: CONSTANTS.MAX_DEPTH,
  });
  const [modelLoaded, setModelLoaded] = useState(false);
  const [WASMFn, setWASMFn] = useState<
    (gameState: GameState, maxDepth: number) => number
  >(undefined);
  const winner = GameUtils.winner(gameState);

  // Loads wasm file if setting is changed in engine
  useEffect(() => {
    if (settings.ENGINE === 'wasm') {
      const fetchFn = async () => {
        const predictAIUsingSwift = await loadWasmUtil();
        setWASMFn(() => predictAIUsingSwift);
        console.log('[WASM] Loaded WASM model');
      };

      if (WASMFn === undefined) {
        fetchFn();
      }
    }
  }, [settings.ENGINE]);

  // If the AI is called to play, then play
  useEffect(() => {
    if (gameState.player === CONSTANTS.AI_PLAYER) {
      var colToPlay = 0;
      if (WASMFn && gameState && settings.ENGINE === 'wasm') {
        colToPlay = WASMFn(gameState, settings.MAX_DEPTH);
      } else {
        colToPlay = GameUtils.playAIBestNextMove(gameState, settings.MAX_DEPTH);
      }

      setGameState(() => GameUtils.playInColumn(gameState, colToPlay));
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
          <div className={styles.right}>
            <ToggleEngine settings={settings} setSettings={setSettings} />
            <span
              className={cn(navbarStyles.navbarComponent, navbarStyles.aiStats)}
            >
              <Difficulty settings={settings} setSettings={setSettings} />
              <span className={navbarStyles.divider}>|</span>
              🤖 {GameUtils.score(gameState)}
            </span>
          </div>
        </nav>

        <div className={styles.belowNavbar}>
          <main>
            <OutputSection gameState={gameState} setGameState={setGameState} />
          </main>

          <footer>
            <p>Made w/ ❤️ in Milan. Source code available on Github.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
