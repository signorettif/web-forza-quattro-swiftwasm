// Utils
import { CONSTANTS } from "shared/config/constants";
import cn from "classnames";

// Game stuff
import GameState from "shared/gameHelpers/GameState";

// Styles
import styles from "styles/components/board.module.scss";

// Types
interface OutputSectionProps {
  gameState: GameState;
}

export const OutputSection = ({ gameState }: OutputSectionProps) => {
  return (
    <div className={styles.board}>
      <div className={styles.boardContent}>
        {gameState.board.map((row, index) => (
          <div className={styles.output} key={index}>
            {row.map((colValue, index) => (
              <div className={styles.cell} key={index}>
                <div className={styles.cellContent}>
                  <div className={styles.coin}>
                    <div
                      className={cn(styles.coinContent, {
                        [styles.playerColor]:
                          colValue === CONSTANTS.HUMAN_PLAYER,
                        [styles.aiColor]: colValue === CONSTANTS.AI_PLAYER,
                      })}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
