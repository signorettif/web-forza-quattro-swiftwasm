// React stuff
import { Dispatch, SetStateAction } from "react";
import { CONSTANTS } from "shared/config/constants";

// Game stuff
import GameState from "shared/gameHelpers/GameState";
import GameUtils from "shared/gameHelpers/GameUtils";

// Styles
import styles from "styles/components/board.module.scss";

// Types
interface InputSectionProps {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
}

export const InputSection = ({
  gameState,
  setGameState,
}: InputSectionProps) => {
  const columns = [...Array(CONSTANTS.N_COLS).keys()];
  const allowedColumns = GameUtils.allowedColumns(gameState);

  const playColumn = (col: number) => {
    setGameState(() => GameUtils.playInColumn(gameState, col));
  };

  return (
    <div className={styles.inputs}>
      {columns.map((column) => (
        <div key={column} onClick={() => playColumn(column)}>
          {column}
        </div>
      ))}
    </div>
  );
};
