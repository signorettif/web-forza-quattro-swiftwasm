// Utils
import { CONSTANTS } from "shared/config/constants";
import cn from "classnames";

// Game stuff
import GameState from "shared/gameHelpers/GameState";

import styles from "styles/components/board.module.scss";

// Types
interface OutputSectionProps {
  gameState: GameState;
}

export const OutputSection = ({ gameState }: OutputSectionProps) => {
  return (
    <>
      {gameState.board.map((row, index) => (
        <div className={styles.output} key={index}>
          <p>{index + 1}</p>
          {row.map((colValue, index) => (
            <div
              className={cn(styles.cell, {
                [styles.playerColor]: colValue === CONSTANTS.HUMAN_PLAYER,
                [styles.aiColor]: colValue === CONSTANTS.AI_PLAYER,
              })}
              key={index}
            >
              {/* nothing to see here */}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
