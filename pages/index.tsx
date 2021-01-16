// Next.js and React.js stuff
import Head from 'next/head';
import { useEffect, useState } from 'react';

// Game stuff
import GameUtils from '../shared/gameHelpers/GameUtils';

// Components
import { InputSection } from '../components/home/InputSection';
import { OutputSection } from '../components/home/OutputSection';
import { AIStats } from '../components/home/widgets/AIStats';

// Constants
import { CONSTANTS } from '../shared/config/constants';

// Main functional component
export default function Home() {
  const [gameState, setGameState] = useState(GameUtils.startGame());
  const winner = GameUtils.winner(gameState);

  // If the AI is called to play, then play
  useEffect(() => {
    if (gameState.player === CONSTANTS.AI_PLAYER) {
      setGameState(() => GameUtils.playAIBestNextMove(gameState));
    }
  }, [gameState.player]);

  // Winner modal
  useEffect(() => {}, [winner]);

  return (
    <>
      <Head>
        <title>Web connect 4! WASM benchmarking</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-full min-h-screen bg-bg-color text-white">
        <div className="flex flex-grow flex-col justify-between p-12">
          <div>
            <h1 className="font-medium text-2xl">Connect 4</h1>

            {/* Connect 4 wrapper */}
            <div className="mt-12">
              <div className="grid gap-8 grid-cols-8 max-w-md m-auto">
                <InputSection
                  gameState={gameState}
                  setGameState={setGameState}
                />
                <OutputSection gameState={gameState} />
              </div>
            </div>
          </div>

          <footer className="flex-grow-0 text-secondary">
            Made w/ ❤️ in Milan. See the source code on Github
          </footer>
        </div>

        <div className="flex justify-start items-baseline bg-bg-color-light w-1/2 max-w-md p-12">
          <AIStats gameState={gameState} />
        </div>
      </div>
    </>
  );
}
