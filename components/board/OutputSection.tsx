import { Dispatch, SetStateAction } from "react";

// Utils
import { CONSTANTS } from "shared/config/constants";
import cn from "classnames";

// Game stuff
import GameState from "shared/gameHelpers/GameState";
import GameUtils from "shared/gameHelpers/GameUtils";

// Styles
import styles from "styles/components/board.module.scss";

// Types
interface OutputSectionProps {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
}

export const OutputSection = ({
  gameState,
  setGameState,
}: OutputSectionProps) => {
  const columns = [...Array(CONSTANTS.N_COLS).keys()];
  const allowedColumns = GameUtils.allowedColumns(gameState);

  const playColumn = (col: number) => {
    setGameState(() => GameUtils.playInColumn(gameState, col));
  };

  return (
    <div className={styles.board}>
      <div className={styles.boardContent}>
        {gameState.getColumns().map((column, i) => {
          console.log(column);
          return (
            <div
              onClick={() => playColumn(i)}
              className={styles.column}
              key={i}
            >
              {column.map((colValue, j) => (
                <div className={styles.cell} key={j}>
                  <div className={styles.cellContent}>
                    <div className={styles.coin}>
                      <div
                        className={cn(styles.coinContent, {
                          [styles.playerColor]:
                            colValue === CONSTANTS.HUMAN_PLAYER,
                          [styles.aiColor]: colValue === CONSTANTS.AI_PLAYER,
                          [styles.showHover]:
                            colValue === 0 &&
                            ((j + 1 < column.length && column[j + 1] !== 0) ||
                              j + 1 === column.length),
                        })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
